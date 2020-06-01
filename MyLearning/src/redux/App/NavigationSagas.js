import { NavigationAction, NavigationContainerComponent, } from 'react-navigation'
import { put, take, takeEvery, } from 'redux-saga/effects'
import NavigationRedux from './NavigationRedux'

let AppContainerRef: NavigationContainerComponent = null

const initializeAppContainerRef = function * ({ ref, }: { ref: NavigationContainerComponent }) {
  AppContainerRef = ref
  yield put(NavigationRedux.Creators.initializeAppContainerRefFinished())
}

const dispatchNavigationAction = function * ({ action, }: { action: NavigationAction }) {
  if (!AppContainerRef) {
    yield take(NavigationRedux.Types.INITIALIZE_APP_CONTAINER_REF_FINISHED)
  }
  yield AppContainerRef.dispatch(action)
}

export default [
  takeEvery(NavigationRedux.Types.INITIALIZE_APP_CONTAINER_REF, initializeAppContainerRef),
  takeEvery(NavigationRedux.Types.DISPATCH_NAVIGATION_ACTION, dispatchNavigationAction),
]
