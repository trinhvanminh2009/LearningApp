// @flow
import {
  AccountRedux,
  CallRedux,
  ContactRedux,
  ConversationRedux,
  LoginRedux,
  NavigationRedux,
  PhoneNumberRedux,
  UserRedux,
} from '../reducers'
import { all, call, cancelled, fork, put, putResolve, select, take, takeLatest, } from 'redux-saga/effects'
import { LoginPayload, LoginResponsePayload, } from './types'
import { apiCall, } from '../App/APISagas'
import { apiService, } from '@src/services'
import { eventChannel, } from 'redux-saga'
import { NavigationActions, } from 'react-navigation'
import { Platform, } from 'react-native'
import { PUSH_CONFIG, } from '@src/constants'
import { PushService, } from '@src/services/pushNotification'
import R from 'ramda'
import TwilioVoice from 'react-native-twilio-voice-sdk'

let watchNotificationTask

const login = function * ({ payload, meta, }: { payload: LoginPayload, }) {
  const { email, password, isRememberMe, } = payload
  try {
    if (!email || !password) {
      yield put(LoginRedux.Creators.requestFailure(new Error('Please fill in all fields.')))
    } else {
      const response = yield apiCall(apiService.userAuthPost, { email, password, })

      const responsePayload: LoginResponsePayload = response.data
      responsePayload.dateExpired = new Date(responsePayload.dateExpired)

      yield apiService.setHeaders({ Authorization: `Bearer ${responsePayload.token}`, })
      if (responsePayload.twilioAccessToken && responsePayload.account.id) {
        TwilioVoice.setIdentity(responsePayload.account.id)
        TwilioVoice.setToken(responsePayload.twilioAccessToken)
        TwilioVoice.initWithAccessToken(responsePayload.twilioAccessToken)
      }

      yield put(UserRedux.Creators.loginSessionSuccess(responsePayload))

      yield put(PhoneNumberRedux.Creators.fetch())

      yield put(LoginRedux.Creators.loginSuccess(email, isRememberMe, meta))

      // start watch notification
      yield all([
        put(UserRedux.Creators.startWatchNotification()),
        put(UserRedux.Creators.setNotificationBadge()),
        put(ConversationRedux.Creators.startWatchOnUpdateConversation()),
      ])

      // register push token
      const pushToken = yield call(PushService.getToken)
      yield put(UserRedux.Creators.registerUserPushToken(pushToken))
    }
  } catch (e) {
    yield put(LoginRedux.Creators.requestFailure(e, meta))
  }
}

const startWatchNotification = function * () {
  try {
    // listen for push token refresh and register new push token
    watchNotificationTask = yield fork(watchPushTokenRefresh)
  } catch (e) {
    yield put(LoginRedux.Creators.requestFailure(e))
  }
}

const watchPushTokenRefresh = function * () {
  const channel = eventChannel(emitter => {
    PushService.setTokenRefreshListener((token: string) => {
      emitter({ token, })
    })

    PushService.setNotificationListener((notification) => {
      emitter({ notification, })
    })

    PushService.setNotificationOpenedListener((notificationOpen) => {
      emitter({ notificationOpen, })
    })

    PushService.getInitialNotification().then((initialNotificationOpen) => {
      emitter({ notificationOpen: initialNotificationOpen, })
    })

    // Return an unsubscribe method
    return () => {
      // Perform any cleanup you need here
      PushService.setTokenRefreshListener()
      PushService.setNotificationListener()
      PushService.setNotificationOpenedListener()
    }
  })

  // Process events until operation completes
  while (true) {
    const {
      token,
      notification,
      notificationOpen,
    } = yield take(channel)

    // token
    if (token) {
      yield put(UserRedux.Creators.registerUserPushToken(token))
    }

    // notification
    if (notification) {
      // handle notification data
      const notificationData = R.path([ 'data', ], notification)
      const path = R.path([ 'path', ], notificationData)

      if (notificationData) {
        const accountId = R.path([ 'accountId', ], notificationData)
        const badgeCount = Number(R.path([ 'badgeCount', ], notificationData))
        if (!isNaN(badgeCount)) {
          yield put(UserRedux.Creators.setNotificationBadge(badgeCount))
        }

        const account = yield select(R.pipe(UserRedux.getReducerState, UserRedux.selectors.getAccount))
        const { id: currentAccountId, } = account
        if (accountId != null && currentAccountId !== accountId) {
          // do nothing
        } else {
          // update
          switch (path) {
            case PUSH_CONFIG.PATHS.Conversation: {
              const conversationId = R.path([ 'conversationId', ], notificationData)

              yield all([
                put(ConversationRedux.Creators.getNewMessages(conversationId)),
                put(ConversationRedux.Creators.getListConversations()),
              ])

              break
            }

            case PUSH_CONFIG.PATHS.NewContact: {
              yield put(ContactRedux.Creators.fetchForce())

              break
            }

            case PUSH_CONFIG.PATHS.ImportedContact: {
              yield put(ContactRedux.Creators.fetchForce())

              break
            }

            case PUSH_CONFIG.PATHS.Reminder: {
              const id = R.path([ 'reminder', 'contact', 'id', ], notificationData)
              yield put(ContactRedux.Creators.getItem(id))

              break
            }

            default:
              break
          }
        }
      }
    }

    // notificationOpen
    if (notificationOpen) {
      try {
        // handle notification data
        const notificationData = R.path([ 'notification', 'data', ], notificationOpen)
        const path = R.path([ 'path', ], notificationData)

        if (notificationData) {
          const accountId = R.path([ 'accountId', ], notificationData)
          const badgeCount = Number(R.path([ 'badgeCount', ], notificationData))
          if (!isNaN(badgeCount)) {
            yield put(UserRedux.Creators.setNotificationBadge(badgeCount))
          }

          const account = yield select(R.pipe(UserRedux.getReducerState, UserRedux.selectors.getAccount))
          const { id: currentAccountId, } = account
          if (accountId != null && currentAccountId !== accountId) {
            yield putResolve(AccountRedux.Creators.switchAccount(accountId, { thunk: true, }))
          }

          switch (path) {
            case PUSH_CONFIG.PATHS.Conversation: {
              const conversationContact = JSON.parse(R.path([ 'conversationContact', ], notificationData))
              const conversationId = R.path([ 'conversationId', ], notificationData)

              yield put(NavigationRedux.Creators.dispatchNavigationAction(NavigationActions.navigate({
                routeName: 'ConversationDetail',
                params: {
                  conversationContact,
                  conversationId,
                },
              })))

              yield all([
                put(ConversationRedux.Creators.getNewMessages(conversationId)),
                put(ConversationRedux.Creators.getListConversations()),
              ])

              break
            }

            case PUSH_CONFIG.PATHS.NewContact: {
              const contactId = R.path([ 'contactId', ], notificationData)

              yield put(NavigationRedux.Creators.dispatchNavigationAction(NavigationActions.navigate({
                routeName: 'ContactDetail',
                params: {
                  id: contactId,
                },
              })))

              yield put(ContactRedux.Creators.getItem(contactId))
              yield put(ContactRedux.Creators.fetchForce())

              break
            }

            case PUSH_CONFIG.PATHS.ImportedContact: {
              yield put(NavigationRedux.Creators.dispatchNavigationAction(NavigationActions.navigate({
                routeName: 'ContactList',
              })))

              yield put(ContactRedux.Creators.fetchForce())

              break
            }

            case PUSH_CONFIG.PATHS.Reminder: {
              const detail = JSON.parse(R.path([ 'reminder', ], notificationData))
              const contactId = R.path([ 'contact', 'id', ], detail)
              yield put(NavigationRedux.Creators.dispatchNavigationAction(NavigationActions.navigate({
                routeName: 'ContactDetail',
                params: {
                  id: contactId,
                },
              })))

              yield put(ContactRedux.Creators.fetchForce())

              yield put(NavigationRedux.Creators.dispatchNavigationAction(NavigationActions.navigate({
                routeName: 'ContactRemindersDetail',
                params: {
                  contactId,
                  detail,
                },
              })))

              yield put(ContactRedux.Creators.getItem(contactId))

              break
            }

            default:
              break
          }
        }
      } catch (e) {
        yield put(LoginRedux.Creators.requestFailure(e))
      }
    }
  }
}

const registerUserPushToken = function * ({ pushToken, }) {
  const { id: userId, } = yield select(R.pipe(UserRedux.getReducerState, UserRedux.selectors.getUser))

  const params = {
    deviceToken: pushToken,
    userId,
    platform: Platform.OS,
  }

  yield apiCall(apiService.userRegisterPushToken, params)
}

const logout = function * ({ meta, }) {
  try {
    yield put(CallRedux.Creators.disconnectCall())

    // call logout to stop receiving push
    const pushToken = yield select(R.pipe(UserRedux.getReducerState, UserRedux.selectors.getPushToken))
    if (pushToken) {
      yield apiCall(apiService.accountLogoutPost, { pushToken, })
    }

    // clear auth header
    apiService.setHeaders({ Authorization: null, })

    // clear all listeners in push service
    PushService.clearAllListeners()

    // cancel watch notification forked task on log out
    watchNotificationTask && watchNotificationTask.cancel()

    // clear badge
    yield put(UserRedux.Creators.setNotificationBadge(0))
  } catch (e) {
    yield put(LoginRedux.Creators.requestFailure(e, meta))
  } finally {
    if (yield cancelled()) {
      yield put(LoginRedux.Creators.requestFailure(undefined, meta))
    } else {
      yield put(LoginRedux.Creators.logoutSuccess(meta))
      yield put(UserRedux.Creators.logoutSessionSuccess())
    }
  }
}

const changeAvatar = function * ({ uri, }) {
  try {
    const response = yield apiCall(apiService.userAvatarPost, { uri, })
    const newUserAvatar = response.data

    yield put(UserRedux.Creators.changeAvatarSuccess(newUserAvatar))
  } catch (e) {
    yield put(UserRedux.Creators.requestFailure(e))
  }
}

const setNotificationBadge = function * ({ forceCount, }) {
  try {
    let badgeCount
    if (forceCount != null) {
      badgeCount = Number(forceCount)
    } else {
      const { id: userId, } = yield select(R.pipe(UserRedux.getReducerState, UserRedux.selectors.getUser))
      const response = yield apiCall(apiService.userBadgeCountGet, { userId, })
      badgeCount = Number(response.data || 0)
    }

    if (!isNaN(badgeCount)) {
      PushService.setBadge(badgeCount)
    }
  } catch (e) {
    yield put(UserRedux.Creators.requestFailure(e))
  }
}

const getNotificationConfig = function * ({ meta, }) {
  try {
    const response = yield apiCall(apiService.userNotificationConfigGet)
    const config = response.data

    yield put(UserRedux.Creators.getNotificationConfigSuccess(config, meta))
  } catch (e) {
    yield put(UserRedux.Creators.requestFailure(e))
  }
}

const setNotificationConfig = function * ({ config, meta, }) {
  try {
    yield apiCall(apiService.userNotificationConfigPut, config)

    yield put(UserRedux.Creators.setNotificationConfigSuccess(meta))

    yield put(UserRedux.Creators.getNotificationConfig({ thunk: true, }))
  } catch (e) {
    yield put(UserRedux.Creators.requestFailure(e, meta))
  }
}

const contactMarkedAsRead = function * () {
  yield put(UserRedux.Creators.setNotificationBadge())
}

const conversationMarkedAsRead = function * () {
  yield put(UserRedux.Creators.setNotificationBadge())
}

export default [
  takeLatest(LoginRedux.Types.LOGIN, login),
  takeLatest(LoginRedux.Types.LOGOUT, logout),
  takeLatest(UserRedux.Types.CHANGE_AVATAR, changeAvatar),
  takeLatest(UserRedux.Types.REGISTER_USER_PUSH_TOKEN, registerUserPushToken),
  takeLatest(UserRedux.Types.START_WATCH_NOTIFICATION, startWatchNotification),
  takeLatest(UserRedux.Types.SET_NOTIFICATION_BADGE, setNotificationBadge),
  takeLatest(UserRedux.Types.GET_NOTIFICATION_CONFIG, getNotificationConfig),
  takeLatest(UserRedux.Types.SET_NOTIFICATION_CONFIG, setNotificationConfig),

  takeLatest(ContactRedux.Types.MARK_AS_READ_SUCCESS, contactMarkedAsRead),
  takeLatest(ConversationRedux.Types.ACTION_CHANGE_SUCCESS, conversationMarkedAsRead),
]
