import { all, call, put, select, takeLatest, } from 'redux-saga/effects'
import {
  AppRedux,
  ConversationRedux,
  LoginRedux,
  UserRedux,
} from '../reducers'
import { API_CONFIG, } from '@src/constants'
import { apiService, } from '@src/services'
import { PushService, } from '@src/services/pushNotification'
import R from 'ramda'
import { startWatchingNetInfo, } from './NetInfoSagas'

const initializeApp = function * ({ meta, }) {
  try {
    yield all([
      // start watching internet connection
      startWatchingNetInfo(),
      // init push notification service
      call(PushService.init),
    ])

    // Set App Key header
    yield apiService.setHeaders({ 'App-Key': API_CONFIG.APP_KEY, })

    // Check auth status silently
    // yield put(LoginRedux.Creators.loginSilently())
    const isRememberMe = yield select(R.pipe(LoginRedux.getReducerState, LoginRedux.selectors.isRememberMe))
    const userState = yield select(UserRedux.getReducerState)
    const account = UserRedux.selectors.getAccount(userState)
    const token = UserRedux.selectors.getToken(userState)
    const refreshToken = UserRedux.selectors.getRefreshToken(userState)

    let thunkPayload = {
      hasToken: false,
    }

    // user logged in
    if (isRememberMe && token && refreshToken) {
      yield apiService.setHeaders({ Authorization: `Bearer ${token}`, })

      const refreshTokensResponse = yield call(apiService.tokenPost, {
        token,
        refreshToken,
      })

      if (refreshTokensResponse.ok) {
        const updatedTokens = refreshTokensResponse.data

        yield put(UserRedux.Creators.updateSessionSuccess(updatedTokens))
        yield apiService.setHeaders({ Authorization: `Bearer ${updatedTokens.token}`, })


        // start watch notification events
        yield all([
          put(UserRedux.Creators.startWatchNotification()),
          put(UserRedux.Creators.setNotificationBadge()),
        ])

        thunkPayload = {
          hasToken: true,
        }
      }
    }

    yield put(AppRedux.Creators.initializeAppFinished(thunkPayload, meta))
  } catch (e) {
    yield put(AppRedux.Creators.requestFailure(e, meta))
  }
}

export default [
  takeLatest(AppRedux.Types.INITIALIZE_APP, initializeApp),
]
