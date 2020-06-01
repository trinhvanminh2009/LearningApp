import { createActions, createReducer, } from 'reduxsauce'
import R from 'ramda'
import { reducerPrefixFormat, } from '../common'

const stateKey = 'app'

/* ------------- Initial State ------------- */
const INITIAL_STATE = ({
})

/* ------------- Types and Action Creators ------------- */
const { Types, Creators, } = createActions({
  initializeApp: [ 'meta', ],
  initializeAppFinished: [ 'payload', 'meta', ],

  requestFailure: [ 'error', 'meta', ],
}, {
  prefix: reducerPrefixFormat(stateKey),
})

/* ------------- Reducers ------------- */
const initializeApp = R.identity
const initializeAppFinished = R.identity

const requestFailure = R.identity

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [Types.INITIALIZE_APP]: initializeApp,
  [Types.INITIALIZE_APP_FINISHED]: initializeAppFinished,

  [Types.REQUEST_FAILURE]: requestFailure,
})

const reducerMap = { [stateKey]: reducer, }

/* ------------- Selectors ------------- */
const getReducerState = (state) => (state[stateKey])

/* ------------- Export ------------- */
export default {
  // default export
  INITIAL_STATE,
  Types,
  Creators,

  stateKey,
  getReducerState,
  reducerMap,
}
