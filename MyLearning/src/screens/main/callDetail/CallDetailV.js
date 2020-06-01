import {
  Button,
  Icon,
  Text,
  View,
} from 'native-base'
import {
  Colors,
  Icons,
} from '@src/assets'
import {
  compose,
  withMemo,
} from '@truefit/bach'
import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Cell from './cell/CellVM'
import { icons, } from '@src/assets/Images'
import R from 'ramda'
import React from 'react'

import { VProps, } from './types'

class CallDetailV extends React.PureComponent<VProps> {
  componentWillMount () {
    this._onUpdateHeader()
  }

  componentWillUnmount () {
    this.focusListener.remove()
  }

  _onUpdateHeader = () => {
    const { navigation, } = this.props
    this.focusListener = navigation.addListener('didFocus', () => {
      const barStyle = 'light-content'
      const barBackground = Colors.blueDarker
      StatusBar.setBarStyle(barStyle)
      Platform.OS === 'android' && StatusBar.setBackgroundColor(barBackground)
    })
  }

  renderKeyExtractor = (item, index) => (item.messageId)

  renderItem = ({ item, }) => (
    <Cell
      item={item}
    />
  )

  render () {
    const {
      contactId,
      onNavBack,
      _onNavConversationSMS,
      _onNavConversationEmail,
      _onNavCalling,
      _onNavContactInfo,
      rdx,
      onOpenOptions,
      phoneNumber,
      displayData: {
        name,
        email,
        contactAddress,
      },
    } = this.props
    return (
      <View
        header={(
          <View horizontal space-between v-center style={styles.headerContainer} >
            <Button iconLeft transparent onPress={onNavBack}>
              <Image source={Icons.back} style={styles.iconHeaderBack} />
              <Text text-header-white>
                {'Call Info'}
              </Text>
            </Button>
            {!contactId && (
              <View horizontal space-between v-center>
                <TouchableOpacity onPress={!contactId && onOpenOptions}>
                  <Icon name='dots-vertical' style={styles.iconHeaderOption} type='MaterialCommunityIcons' />
                </TouchableOpacity>
              </View>
            )}

          </View>
        )}
        headerColor={Colors.blueDodger}
      >

        <View h-center v-center vertical style={styles.containerInfo}>
          <View h-center v-center vertical>
            <Text semi-bold text-detail-black text-header-title style={styles.textName}>{name || phoneNumber}</Text>
            <Text style={styles.textPhoneNumber}>{contactAddress}</Text>
            <React.Fragment>
              <View h-center horizontal v-center style={styles.containerIcon}>
                <Button content-center light tight disabled={phoneNumber === '-'} style={[ styles.btnAction, (phoneNumber !== '-') ? styles.btnActionEnable : styles.btnActionDisable, ]} onPress={_onNavCalling}>
                  <Image source={icons.phone} />
                </Button>
                <Button content-center light tight disabled={phoneNumber === '-'} style={[ styles.btnAction, (phoneNumber !== '-') ? styles.btnActionEnable : styles.btnActionDisable, ]} onPress={_onNavConversationSMS}>
                  <Image source={icons.chat} />
                </Button>
                <Button content-center light tight disabled={email === '-'} style={[ styles.btnAction, (email !== '-') ? styles.btnActionEnable : styles.btnActionDisable, ]} onPress={_onNavConversationEmail}>
                  <Image source={icons.email} />
                </Button>
                <Button content-center light tight disabled={contactId === null} style={[ styles.btnAction, (contactId !== null) ? styles.btnActionEnable : styles.btnActionDisable, ]} onPress={_onNavContactInfo}>
                  <Image source={icons.info} />
                </Button>
              </View>
            </React.Fragment>
          </View>
        </View>

        <View style={styles.containerSeparator} />
        <View flex1 style={styles.containerList}>
          <FlatList
            data={rdx.calls}
            keyExtractor={this.renderKeyExtractor}
            refreshing={false}
            renderItem={this.renderItem}
            style={styles.flastListStyle}
            onRefresh={rdx.onGetContactDetailCalls}
          />
        </View>
      </View>
    )
  }
}

const enhancerDisplayData = compose(
  // ---- local state
  withMemo(
    'displayData',
    ({ rdx: { contact, }, }) => {
      const firstName = R.path([ 'firstName', ])(contact) || ''
      const lastName = R.path([ 'lastName', ])(contact) || ''
      const name = `${firstName} ${lastName}`.trim()
      const email = R.path([ 'email', ])(contact) || '-'
      const contactAddress = (phoneNumber === '-') ? email : phoneNumber
      return {
        name,
        email,
        phoneNumberDisplay: phoneNumber,
        contactAddress,
      }
    },
    [ 'rdx.contact', ]
  ),
)
export default enhancerDisplayData(CallDetailV)

const styles = StyleSheet.create({
  btnAction: {
    borderRadius: 41,
    height: 41,
    marginHorizontal: 12,
    width: 41,
  },
  btnActionDisable: {
    backgroundColor: Colors.whiteSmoke,
  },
  btnActionEnable: {
    backgroundColor: Colors.blueDeepSky,
  },
  containerIcon: {
    marginBottom: 24,
  },
  containerInfo: {
    paddingTop: 20,
  },
  containerList: {
    backgroundColor: Colors.whiteSmokeLight,
  },
  containerSeparator: {
    backgroundColor: Colors.whiteSmokeLight,
    height: 12,
  },
  flastListStyle: {
    flex: 1,
  },
  headerContainer: {
    height: 60,
  },
  iconHeaderBack: {
    marginLeft: 20,
  },
  iconHeaderOption: {
    color: Colors.white,
    fontSize: 25,
    marginRight: 8,
  },
  textName: {
    color: Colors.black,
    marginTop: 15,
    textTransform: 'capitalize',
  },
  textPhoneNumber: {
    color: Colors.greyMortar,
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 18,
    marginTop: 2,
  },
})
