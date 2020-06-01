// take from reducers & put to Fetching reducer
import {
  ConversationRedux,
  LoginRedux,
  UserRedux,
} from '../reducers'
import { put, takeEvery, } from 'redux-saga/effects'
import FetchingRedux from './FetchingRedux'

const started = function * ({ type, }) {
  // __DEV__ && console.warn('started ', type)
  yield put(FetchingRedux.Creators.started())
}

const stopped = function * ({ type, }) {
  // __DEV__ && console.warn('stopped ', type)
  yield put(FetchingRedux.Creators.stopped())
}

export default [

  takeEvery(LoginRedux.Types.LOGIN, started),
  takeEvery(LoginRedux.Types.LOGIN_SUCCESS, stopped),
  takeEvery(LoginRedux.Types.LOGOUT, started),
  takeEvery(LoginRedux.Types.LOGOUT_SUCCESS, stopped),
  takeEvery(LoginRedux.Types.REQUEST_FAILURE, stopped),

  takeEvery(UserRedux.Types.SAVE_PROFILE, started),
  takeEvery(UserRedux.Types.SAVE_PROFILE_SUCCESS, stopped),
  takeEvery(UserRedux.Types.REQUEST_FAILURE, stopped),
]
