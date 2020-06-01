import { createActions, createReducer, } from 'reduxsauce'
import { produce, } from 'immer'
import { reducerPrefixFormat, } from '../common'

const stateKey = 'net_info'

/* ------------- Initial State ------------- */
const INITIAL_STATE = ({
  isConnected: false,
})

/* ------------- Types and Action Creators ------------- */
const { Types, Creators, } = createActions({
  setIsConnected: [ 'isConnected', ],
}, {
  prefix: reducerPrefixFormat(stateKey),
})

/* ------------- Reducers ------------- */
const setIsConnected = (state, { isConnected, }) =>
  produce(state, (draft) => {
    draft.isConnected = isConnected
  })

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_IS_CONNECTED]: setIsConnected,
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
