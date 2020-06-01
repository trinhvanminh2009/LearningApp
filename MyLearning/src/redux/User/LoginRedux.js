import { createActions, createReducer, } from 'reduxsauce'
import { produce, } from 'immer'
import R from 'ramda'
import { reducerPrefixFormat, } from '../common'

const stateKey = 'userlogin'

/* ------------- Initial State ------------- */
const INITIAL_STATE = ({
  isRememberMe: true,
  email: null,
  isLoading: false,
  // password: null
})

/* ------------- Types and Action Creators ------------- */
const { Types, Creators, } = createActions({
  login: [ 'payload', 'meta', ],
  // loginSilently: null,
  loginSuccess: [ 'email', 'isRememberMe', 'meta', ],

  logout: [ 'meta', ],
  logoutSuccess: [ 'meta', ],

  requestFailure: [ 'error', 'meta', ],
}, {
  prefix: reducerPrefixFormat(stateKey),
})

/* ------------- Reducers ------------- */
const login = (state) => {
  return produce(state, (draft) => {
    Object.assign(draft, { isLoading: true, })
  })
}

// const loginSilently = R.identity

const loginSuccess = (state, { email, isRememberMe, }) => {
  return produce(state, (draft) => {
    Object.assign(draft, { email, isRememberMe, isLoading: false, })
  })
}

const logout = R.identity

const logoutSuccess = R.identity

const requestFailure = (state) =>
  produce(state, (draft) => {
    Object.assign(draft, { isLoading: false, })
  })

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN]: login,
  // [Types.LOGIN_SILENTLY]: loginSilently,
  [Types.LOGIN_SUCCESS]: loginSuccess,

  [Types.LOGOUT]: logout,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,

  [Types.REQUEST_FAILURE]: requestFailure,
})

const reducerMap = { [stateKey]: reducer, }

/* ------------- Selectors ------------- */
const getReducerState = (state) => (state[stateKey])
const selectors = {
  isRememberMe: ({ isRememberMe, }) => (isRememberMe),
  getEmail: ({ email, }) => (email),
  isLoading: ({ isLoading, }) => (isLoading),
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
