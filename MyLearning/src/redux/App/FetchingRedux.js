import { createActions, createReducer, } from 'reduxsauce'
import { produce, } from 'immer'
import { reducerPrefixFormat, } from '../common'

const stateKey = 'fetching'

/* ------------- Initial State ------------- */
const INITIAL_STATE = ({
  fetching: false,
  fetchingCount: 0,
  downloadingPDF: false,
})

/* ------------- Types and Action Creators ------------- */
const { Types, Creators, } = createActions({
  started: null,
  stopped: null,
  updateDownloadingPdf: [ 'value', ],
}, {
  prefix: reducerPrefixFormat(stateKey),
})

/* ------------- Reducers ------------- */
const started = (state) =>
  produce(state, (draft) => {
    draft.fetchingCount = draft.fetchingCount + 1
    draft.fetching = (draft.fetchingCount > 0)
  })

const stopped = (state) =>
  produce(state, (draft) => {
    draft.fetchingCount = Math.max(draft.fetchingCount - 1, 0)
    draft.fetching = (draft.fetchingCount > 0)
  })

const updateDownloadingPdf = (state, { value, }) =>
  produce(state, (draft) => {
    draft.downloadingPDF = value
  })

/* ------------- Hookup Reducers To Types ------------- */
const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTED]: started,
  [Types.STOPPED]: stopped,
  [Types.UPDATE_DOWNLOADING_PDF]: updateDownloadingPdf,
})

const reducerMap = { [stateKey]: reducer, }

/* ------------- Selectors ------------- */
const getReducerState = (state) => (state[stateKey])
const getFetchingStatus = ({ fetching, }) => (fetching)

/* ------------- Export ------------- */
export default {
  getFetchingStatus,

  // default export
  INITIAL_STATE,
  Types,
  Creators,

  stateKey,
  getReducerState,
  reducerMap,
}
