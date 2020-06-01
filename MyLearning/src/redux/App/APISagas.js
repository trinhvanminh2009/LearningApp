  import { call, put, select, } from 'redux-saga/effects'
import {
  LoginRedux,
  NavigationRedux,
  UserRedux,
} from '../reducers'
import { API_CONFIG, } from '@src/constants'
import { apiService, } from '@src/services'
import { NavigationActions, } from 'react-navigation'
import R from 'ramda'

const IS_DEV_LOG = __DEV__

export const apiCall = function * (fn, ...args) {
  const response = yield call(fn, ...args)

  if (
    !response.ok &&
    response.status === API_CONFIG.unauthorizedErrorCode &&
    response.headers[API_CONFIG.TokenExpiredHeader]
  ) {
    const userState = yield select(UserRedux.getReducerState)
    const token = UserRedux.selectors.getToken(userState)
    const refreshToken = UserRedux.selectors.getRefreshToken(userState)

    if (!R.equals(
      R.path([ 'Authorization', ])(response.config.headers) || null,
      R.path([ 'Authorization', ])(apiService.getHeaders()) || null
    )) {
      // already changed in other APi in the mean time, just retry
      const retryResponse = yield call(fn, ...args)

      const ret = yield defaultResponseHandling({ response: retryResponse, })
      return ret
    } else if (token && refreshToken) {
      const refreshTokensResponse = yield call(apiService.tokenPost, {
        token,
        refreshToken,
      })

      if (refreshTokensResponse.ok) {
        const updatedTokens = refreshTokensResponse.data

        yield put(UserRedux.Creators.updateSessionSuccess(updatedTokens))
        yield apiService.setHeaders({ Authorization: `Bearer ${updatedTokens.token}`, })
        // Twilio

        const retryResponse = yield call(fn, ...args)

        const ret = yield defaultResponseHandling({ response: retryResponse, })
        return ret
      }
    }
  }

  const ret = yield defaultResponseHandling({ response, })
  return ret
}

const defaultResponseHandling = function * ({ response, }) {
  if (!response.ok) {
    if (response.status === API_CONFIG.unauthorizedErrorCode) {
      // not authenticated --> logout flow in User Sagas
      yield put(LoginRedux.Creators.logout())
      yield put(NavigationRedux.Creators.dispatchNavigationAction(NavigationActions.navigate({
        routeName: 'StartStack',
      })))

      if (IS_DEV_LOG) {
        throw new Error(`Unauthorized\n${response.config.method.toUpperCase()} ${response.config.url}\n${response.config.data}`)
      } else {
        throw (new Error('Unauthorized'))
      }
    } else {
      const message = R.path([ 'message', ])(response.data) || R.path([ 'message', ])(response.originalError)
      if (IS_DEV_LOG) {
        throw new Error(`${message}\n${response.config.method.toUpperCase()} ${response.config.url}\n${response.config.data}`)
      } else {
        throw new Error(message)
      }
    }
  }

  return response
}
