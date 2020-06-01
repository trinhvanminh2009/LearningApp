// take from reducers & put to Error reducer
import {
  AppRedux,
  CallRedux,
  ContactRedux,
  ConversationRedux,
  LoginRedux,
  PhoneNumberRedux,
  UserRedux,
} from '../reducers'
import { put, takeEvery, } from 'redux-saga/effects'
import ErrorRedux from './ErrorRedux'

const requestFailure = function * ({ error, }) {
  if (!error) { return }
  if (typeof error === 'string') {
    yield put(ErrorRedux.Creators.errorsQueueAppend(new Error(error)))
  } else if (typeof error.message === 'string') {
    yield put(ErrorRedux.Creators.errorsQueueAppend(error))
  }
}

export default [
  takeEvery(AppRedux.Types.REQUEST_FAILURE, requestFailure),

  takeEvery(ErrorRedux.Types.REQUEST_FAILURE, requestFailure),
]
