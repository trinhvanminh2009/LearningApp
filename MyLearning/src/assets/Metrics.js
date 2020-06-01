import {
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native'

const { width, height, } = Dimensions.get('window')

export default {
  height: {
    horizontalLine: StyleSheet.hairlineWidth * 2,
    statusBar: (Platform.OS === 'ios') ? 20 : 24,
    navBar: (Platform.OS === 'ios') ? 44 : 48,
    searchBar: 30,
    tabbar: 32,
  },
  os: {
    name: (Platform.OS === 'ios' ? 'iphone' : 'android'), // match Titanium SDK osname,
    version: Platform.Version,
    isIOS: (Platform.OS === 'ios'),
    isAndroid: (Platform.OS === 'android'),
  },
  radius: {
    buttonCorner: 5,
    modalCorner: 20,
    tabbarCorner: 10,
  },
  screen: {
    width,
    height,
  },
  width: {
    navBarAccessory: 60,
    verticalLine: StyleSheet.hairlineWidth * 2,
    drawer: Math.min(300, 4 / 5 * width),
  },
  thickness: {
    line: StyleSheet.hairlineWidth,
  },
}
