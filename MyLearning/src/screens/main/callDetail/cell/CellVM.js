import { compose, withMemo, withState, } from '@truefit/bach'
import R from 'ramda'
import View from './CellV'

export default compose(
  withMemo(
    'title',
    ({ item, }) => {
      const direction = (R.path([ 'direction', ])(item))
      if (direction === 'outgoingCall') {
        return 'Outgoing Call'
      }
      if (direction === 'incommingCall') {
        return 'Incomming Call'
      }
      return 'Outgoing Call'
    },
    [ 'item', ]
  ),

  withMemo(
    'description',
    ({ item, }) => ((R.path([ 'contactId', ])(item)) ? 'BBC Contact' : 'Unknown'),
    [ 'item', ]
  ),


  withState('isShowDuration', 'setShowDuration', false),

)(View)
