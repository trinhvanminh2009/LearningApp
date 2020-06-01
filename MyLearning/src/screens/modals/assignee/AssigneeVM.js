import { compose, withCallback, withEffect, withHook, withMemo, withState, } from '@truefit/bach'
import { ListItemAssignee, VMProps, VProps, } from './types'
import { useDispatch, useSelector, } from 'react-redux'
import { AssigneeRedux, } from '@src/redux/reducers'
import { ComponentEnhancer, } from '@src/utils/hocType'
import R from 'ramda'
import { useMemo, } from 'react'
import View from './AssigneeV'

const useConnect = () => {
  // mapState
  const listAssignees: ListItemAssignee[] = useSelector(R.pipe(AssigneeRedux.getReducerState, AssigneeRedux.selectors.getListAssignees))
  const mapState = {
    listAssignees,
  }
  // mapDispatch
  const dispatch = useDispatch()
  const mapDispatch = useMemo(() => ({
    onFetch: () => dispatch(AssigneeRedux.Creators.fetch()),
  }), [ dispatch, ])

  return {
    ...mapDispatch,
    ...mapState,
  }
}

const enhancer: ComponentEnhancer<VProps, VMProps> = compose(
  // ---- process VM props
  withMemo(
    'currentAssigneeKey',
    ({ currentAssignee, }) => (R.path([ 'key', ])(currentAssignee) || null),
    [ 'currentAssignee', ]
  ),
  withCallback(
    '_onSelectAssignee',
    ({ onNavBack, onSelectAssignee, }) => (assignee) => {
      onSelectAssignee(assignee)
      onNavBack()
    }
  ),
  // ---- connect
  withHook(useConnect, null, 'rdx'),
  withEffect(({ rdx, }) => {
    // mount
    rdx.onFetch()
  }, []), // run once
  // ---- local state
  // search
  withState('searchText', 'setSearchText', ''),
  withMemo(
    'filteredListAssignees',
    ({ rdx, searchText, }) => {
      if (searchText) {
        return R.filter(
          R.propSatisfies(
            (name) => (name && (name.search(searchText) > -1)),
            'value'
          )
        )(rdx.listAssignees)
      }
      return rdx.listAssignees
    },
    [ 'rdx.listAssignees', 'searchText', ]
  ),
)

export default enhancer(View)
