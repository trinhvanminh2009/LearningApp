import { put, select, spawn, take, } from 'redux-saga/effects'
import { channel, } from 'redux-saga'
import NetInfo from '@react-native-community/netinfo'
import NetInfoRedux from './NetInfoRedux'

const netInfoChannel = channel()

const onConnectivityChange = (isConnected) => {
  netInfoChannel.put(NetInfoRedux.Creators.setIsConnected(isConnected))
}

export const startWatchingNetInfo = function * () {
  const isConnected = yield NetInfo.isConnected.fetch()
  yield put(NetInfoRedux.Creators.setIsConnected(isConnected))

  yield spawn(watchNetInfoChannel)

  yield NetInfo.isConnected.addEventListener(
    'connectionChange',
    onConnectivityChange
  )
}

export const stopWatchingNetInfo = function * () {
  yield NetInfo.isConnected.removeEventListener(
    'connectionChange',
    onConnectivityChange
  )
}

const watchNetInfoChannel = function * () {
  while (true) {
    try {
      const action = yield take(netInfoChannel)
      yield put(action)
    } catch (e) {
      __DEV__ && console.error(e.message)
    }
  }
}

export const checkNetInfo = function * () {
  const { isConnected, } = yield select(NetInfoRedux.getReducerState)
  return isConnected

  /*
  Naive Race logic

  const { isConnected } = yield race({
    isConnected: call(() => ultCheckNetInfo()),
    timeout: delay(1000)
  })

  if (isConnected != null) {
    return isConnected
  } else {
    return false
  }
  */
}
