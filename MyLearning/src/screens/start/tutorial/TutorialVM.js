import { AppRedux, LoginRedux, } from '@src/redux/reducers'
import { compose, withCallback, withHook, } from '@truefit/bach'
import { useDispatch, useSelector, } from 'react-redux'
import { type VMProps, type VProps, } from './types'
import { ComponentEnhancer, } from '@src/utils/hocType'
import { pending, } from 'redux-saga-thunk'
import R from 'ramda'
import { useMemo, } from 'react'
import View from './TutorialV'


/**
 * Hooks
 */
const useConnect = () => {

  // mapDispatch
  const dispatch = useDispatch()

  const mapDispatch = useMemo(() => ({
    // set meta thunk to true for async dispatch that wait for saga to finish
    // https://github.com/diegohaz/redux-saga-thunk#usage
  }), [ dispatch, ])

  return {
    ...mapDispatch,
  }
}

const enhancer = compose(
  // connect
  withHook(useConnect, null, 'rdx'),
)


export default enhancer(View)
