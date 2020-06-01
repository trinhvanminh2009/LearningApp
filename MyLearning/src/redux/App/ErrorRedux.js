import { createActions, createReducer, } from 'reduxsauce'
import { produce, } from 'immer'
import R from 'ramda'
import { reducerPrefixFormat, } from '../common'

const stateKey = 'error'

/* ------------- Initial State ------------- */
const INITIAL_STATE = ({
  errorsQueue: [],
  currentError: null,
})

/* ------------- Types and Action Creators ------------- */
const { Types, Creators, } = createActions({
  errorsQueueAppend: [ 'error', ],
  currentErrorFinish: null,

  requestFailure: [ 'error', ],
}, {
  prefix: reducerPrefixFormat(stateKey),
})

/* ------------- Reducers ------------- */
const errorsQueueAppend = (state, { error, }) =>
  produce(state, (draft) => {
    let { errorsQueue = [], currentError, } = draft
    if (currentError && currentError.message === error.message) {
      // do nothing to reduce duplicate error
    } else if (errorsQueue.findIndex((item) => (item.message === error.message)) > -1) {
      // do nothing to reduce duplicate error
    } else {
      errorsQueue = errorsQueue.concat(error)
    }

    if (currentError) {
      draft.errorsQueue = errorsQueue
    } else {
      draft.errorsQueue = errorsQueue.slice(1)
      draft.currentError = errorsQueue[0]
    }
  })

const currentErrorFinish = (state) =>
  produce(state, (draft) => {
    const errorsQueue = draft.errorsQueue
    if (errorsQueue.length > 0) {
      draft.errorsQueue = errorsQueue.slice(1)
      draft.currentError = errorsQueue[0]
    } else {
      Object.assign(draft, INITIAL_STATE)
    }
  })

const requestFailure = R.identity

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [Types.ERRORS_QUEUE_APPEND]: errorsQueueAppend,
  [Types.CURRENT_ERROR_FINISH]: currentErrorFinish,

  [Types.REQUEST_FAILURE]: requestFailure,
})

const reducerMap = { [stateKey]: reducer, }

/* ------------- Selectors ------------- */
const getReducerState = (state) => (state[stateKey])
const getCurrentError = ({ currentError, }) => (currentError)

/* ------------- Export ------------- */
export default {
  getCurrentError,

  // default export
  INITIAL_STATE,
  Types,
  Creators,

  stateKey,
  getReducerState,
  reducerMap,
}
