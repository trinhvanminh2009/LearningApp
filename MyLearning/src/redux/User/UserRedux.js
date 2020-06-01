import { createActions, createReducer, } from 'reduxsauce'
import { LoginResponsePayload, } from './types'
import { produce, } from 'immer'
import R from 'ramda'
import { reducerPrefixFormat, } from '../common'

const stateKey = 'user'

/* ------------- Initial State ------------- */
const INITIAL_STATE = ({
  token: null,
  refreshToken: null,
  twilioCapabilityToken: null,
  twilioAccessToken: null,
  dateExpired: null,
  account: null,
  user: null,
  loggedId: null,

  pushToken: null,
  notificationConfig: null,
})

/* ------------- Types and Action Creators ------------- */
const { Types, Creators, } = createActions({
  loginSessionSuccess: [ 'payload', /* LoginResponsePayload */ ],
  updateSessionSuccess: [ 'updatedTokens', ],
  logoutSessionSuccess: null,

  getProfile: null,
  getProfileSuccess: [ 'username', 'user', ],
  saveProfile: [ 'username', 'payload', ],
  saveProfileSuccess: [ 'username', 'user', ],

  deleteProfile: null,
  deleteProfileSuccess: null,

  changeAvatar: [ 'uri', ],
  changeAvatarSuccess: [ 'newUserAvatar', ],

  startWatchNotification: null,
  registerUserPushToken: [ 'pushToken', ],
  setNotificationBadge: [ 'forceCount', ],

  getNotificationConfig: [ 'meta', ],
  getNotificationConfigSuccess: [ 'config', 'meta', ],
  setNotificationConfig: [ 'config', 'meta', ],
  setNotificationConfigSuccess: [ 'meta', ],

  requestFailure: [ 'error', 'meta', ],
}, {
  prefix: reducerPrefixFormat(stateKey),
})

/* ------------- Reducers ------------- */
const loginSessionSuccess = (state, { payload, }: { payload: LoginResponsePayload, }) =>
  produce(state, (draft) => {
    Object.assign(draft, payload)
  })

const updateSessionSuccess = (state, { updatedTokens: { token, refreshToken, twilioAccessToken, }, }) =>
  produce(state, (draft) => {
    Object.assign(draft, { token, refreshToken, twilioAccessToken, })
  })

const logoutSessionSuccess = (state) =>
  produce(state, (draft) => {
    Object.assign(draft, INITIAL_STATE)
  })

const getProfile = R.identity

const getProfileSuccess = (state, { username, user, }) =>
  produce(state, (draft) => {
    if (draft.username === username) {
      draft.user = user
    }
  })

const saveProfile = R.identity

const saveProfileSuccess = (state, { username, user, }) =>
  produce(state, (draft) => {
    if (draft.username === username) {
      draft.user = user
    }
  })

const deleteProfile = R.identity

const deleteProfileSuccess = R.identity

const changeAvatar = R.identity
const changeAvatarSuccess = (state, { newUserAvatar, }) =>
  produce(state, (draft) => {
    draft.user.avatar = newUserAvatar
  })

const registerUserPushToken = (state, { pushToken, }) =>
  produce(state, (draft) => {
    draft.pushToken = pushToken
  })
const startWatchNotification = R.identity
const setNotificationBadge = R.identity

const getNotificationConfig = R.identity
const getNotificationConfigSuccess = (state, { config, }) =>
  produce(state, (draft) => {
    draft.notificationConfig = config
  })
const setNotificationConfig = R.identity
const setNotificationConfigSuccess = R.identity

const requestFailure = R.identity

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_SESSION_SUCCESS]: loginSessionSuccess,
  [Types.UPDATE_SESSION_SUCCESS]: updateSessionSuccess,
  [Types.LOGOUT_SESSION_SUCCESS]: logoutSessionSuccess,

  [Types.GET_PROFILE]: getProfile,
  [Types.GET_PROFILE_SUCCESS]: getProfileSuccess,
  [Types.SAVE_PROFILE]: saveProfile,
  [Types.SAVE_PROFILE_SUCCESS]: saveProfileSuccess,

  [Types.DELETE_PROFILE]: deleteProfile,
  [Types.DELETE_PROFILE_SUCCESS]: deleteProfileSuccess,

  [Types.CHANGE_AVATAR]: changeAvatar,
  [Types.CHANGE_AVATAR_SUCCESS]: changeAvatarSuccess,

  [Types.REGISTER_USER_PUSH_TOKEN]: registerUserPushToken,
  [Types.START_WATCH_NOTIFICATION]: startWatchNotification,
  [Types.SET_NOTIFICATION_BADGE]: setNotificationBadge,

  [Types.GET_NOTIFICATION_CONFIG]: getNotificationConfig,
  [Types.GET_NOTIFICATION_CONFIG_SUCCESS]: getNotificationConfigSuccess,
  [Types.SET_NOTIFICATION_CONFIG]: setNotificationConfig,
  [Types.SET_NOTIFICATION_CONFIG_SUCCESS]: setNotificationConfigSuccess,

  [Types.REQUEST_FAILURE]: requestFailure,
})

const reducerMap = { [stateKey]: reducer, }

/* ------------- Selectors ------------- */
const getReducerState = (state) => (state[stateKey])
const selectors = {
  getToken: ({ token, }) => (token),
  getRefreshToken: ({ refreshToken, }) => (refreshToken),
  getTwilioAccessToken: ({ twilioAccessToken, }) => (twilioAccessToken),
  getDateExpired: ({ dateExpired, }) => (dateExpired),
  getAccount: ({ account, }) => (account),
  getUser: ({ user, }) => (user),
  getLoggedId: ({ loggedId, }) => (loggedId),

  getPushToken: ({ pushToken, }) => (pushToken),
  getNotificationConfig: ({ notificationConfig, }) => (notificationConfig),
}

/* ------------- Export ------------- */
export default {
  selectors,

  // default export
  INITIAL_STATE,
  Types,
  Creators,

  stateKey,
  getReducerState,
  reducerMap,
}
