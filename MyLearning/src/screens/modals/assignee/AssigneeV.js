import React from 'react'
import { View, Text} from 'react-native'

class AssigneeV extends React.PureComponent<VProps> {




  render () {
    const {
      onNavBack,
      filteredListAssignees,
      rdx,
      searchText,
      setSearchText,
    } = this.props

    return (
      <View>
        <Text>{'Nothing inside'}</Text>
      </View>
    )
  }
}

export default AssigneeV
