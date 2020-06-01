import { createActions, createReducer, } from 'reduxsauce'
import R from 'ramda'
import { reducerPrefixFormat, } from '../common'

const stateKey = 'navigation'

/* ------------- Initial State ------------- */
const INITIAL_STATE = ({
})

/* ------------- Types and Action Creators ------------- */
const { Types, Creators, } = createActions({
  initializeAppContainerRef: [ 'ref', ],
  initializeAppContainerRefFinished: null,
  dispatchNavigationAction: [ 'action', ],
}, {
  prefix: reducerPrefixFormat(stateKey),
})

/* ------------- Reducers ------------- */
const initializeAppContainerRef = R.identity
const initializeAppContainerRefFinished = R.identity

const dispatchNavigationAction = R.identity

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [Types.INITIALIZE_APP_CONTAINER_REF]: initializeAppContainerRef,
  [Types.INITIALIZE_APP_CONTAINER_REF_FINISHED]: initializeAppContainerRefFinished,
  [Types.DISPATCH_NAVIGATION_ACTION]: dispatchNavigationAction,
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
