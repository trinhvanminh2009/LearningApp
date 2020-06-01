import color from 'color'
import Colors from './Colors'
import Fonts from './Fonts'
import getTheme from 'native-base/src/theme/components'
import material from 'native-base/src/theme/variables/material'
import Metrics from './Metrics'
import { StyleProvider as NBStyleProvider, } from 'native-base'
import { Platform, } from 'react-native'
import R from 'ramda'
import React from 'react'

const variables = {
  ...material,
  borderRadiusBase: Metrics.radius.buttonCorner,
  borderWidth: Metrics.thickness.line,
  brandDark: Colors.greyMortar,
  brandPrimary: Colors.blueDeepSky,
  buttonDisabledBg: Colors.bluePattens,
  buttonFontFamily: Fonts.fontFamilyGotham.Book,
  buttonLineHeight: 14,
  buttonUppercaseAndroidText: false,
  checkboxDefaultColor: 'transparent',
  CheckboxPaddingBottom: 2,
  DefaultFontSize: 13,
  fontFamily: Fonts.fontFamilyGotham.Book,
  fontSizeBase: 12,
  inputFontSize: 12,
  inputHeightBase: 40,
  inverseTextColor: Colors.white,
  lineHeight: 14,
  lineHeightH1: 29,
  lineHeightH2: 24,
  lineHeightH3: 19,
  listNoteColor: Colors.greyNobel,
  noteFontSize: 11,
  subtitleColor: Colors.greyMortar,
  subTitleFontSize: 12,
  textColor: Colors.greyMortar,
  titleFontColor: Colors.greyMortar,
  titleFontfamily: Fonts.fontFamilyGotham.Book,
  titleFontSize: 16,

  // OUR variables
  inputLineHeight: 13,
  noteLineHeight: 15,
  noteColor: Colors.greyNobel,

  // changed getter
  get buttonTextSize () {
    return this.fontSizeBase
  },
  get fontSizeH1 () {
    return this.fontSizeBase / 3 * 6 // 24
  },
  get fontSizeH2 () {
    return this.fontSizeBase / 3 * 5 // 20
  },
  get fontSizeH3 () {
    return this.fontSizeBase / 3 * 4 // 16
  },

  // fix default getter from original material
  get buttonPrimaryBg () {
    return this.brandPrimary
  },
  get buttonPrimaryColor () {
    return this.inverseTextColor
  },
  get buttonInfoBg () {
    return this.brandInfo
  },
  get buttonInfoColor () {
    return this.inverseTextColor
  },
  get buttonSuccessBg () {
    return this.brandSuccess
  },
  get buttonSuccessColor () {
    return this.inverseTextColor
  },
  get buttonDangerBg () {
    return this.brandDanger
  },
  get buttonDangerColor () {
    return this.inverseTextColor
  },
  get buttonWarningBg () {
    return this.brandWarning
  },
  get buttonWarningColor () {
    return this.inverseTextColor
  },
  get buttonTextSizeLarge () {
    return this.fontSizeBase * 1.5
  },
  get buttonTextSizeSmall () {
    return this.fontSizeBase * 0.8
  },
  get borderRadiusLarge () {
    return this.fontSizeBase * 3.8
  },
  get iconSizeLarge () {
    return this.iconFontSize * 1.5
  },
  get iconSizeSmall () {
    return this.iconFontSize * 0.6
  },
  get statusBarColor () {
    return color(this.toolbarDefaultBg)
      .darken(0.2)
      .hex()
  },
  get darkenHeader () {
    return color(this.tabBgColor)
      .darken(0.03)
      .hex()
  },
  get inputColor () {
    return this.textColor
  },
  get inputColorPlaceholder () {
    return '#575757'
  },
  get radioColor () {
    return this.brandPrimary
  },
  get defaultTextColor () {
    return this.textColor
  },
}

const Theme = R.mergeDeepRight(
  getTheme(variables),
  {
    // Text customization
    'NativeBase.Text': {
      '.flex0': { flex: 0, },
      '.flex1': { flex: 1, },
      '.self-stretch': { alignSelf: 'stretch', },
      '.self-center': { alignSelf: 'center', },
      '.text-center': { textAlign: 'center', },
      '.text-left': { textAlign: 'left', },
      '.text-right': { textAlign: 'right', },

      lineHeight: variables.lineHeight,
      '.note': {
        lineHeight: variables.noteLineHeight,
      },
      '.light': { fontFamily: Fonts.fontFamilyGotham.Light, },
      '.semi-bold': { fontFamily: Fonts.fontFamilyGotham.Medium, },
      '.bold': { fontWeight: 'bold', fontFamily: Fonts.fontFamilyGotham.Bold, },
      '.text-label': { color: Colors.black, fontFamily: Fonts.fontFamilyGotham.Medium, },
      '.text-label-margin': { marginTop: 24, marginBottom: 8, },
      '.text-detail-grey-nobel': { color: Colors.greyNobel, },
      '.text-detail-black': { color: Colors.black, },
      '.text-detail-grey': { color: Colors.greyMortar, },
      '.text-detail-white': { color: Colors.white, },
      '.text-detail-grey-small': { color: Colors.greyMortar, lineHeight: 17, fontSize: 12, },
      '.text-header-white': { color: Colors.white, lineHeight: 19, fontSize: 16, marginLeft: 34, fontFamily: Fonts.fontFamilyGotham.Medium, },
      '.text-header-white-right': { fontWeight: 'bold', color: Colors.white, fontSize: 12, marginRight: 3, },
      '.text-header-title': { fontSize: 24, lineHeight: 29, },
      '.text-header-title-big': { lineHeight: 19, fontSize: 16, },
      '.text-header-title-small': { fontSize: 20, lineHeight: 24, },
      '.text-bold': { lineHeight: 19, fontSize: 16, fontFamily: Fonts.fontFamilyGotham.Medium, },
      '.text-bold-small': { fontWeight: 'bold', fontSize: 12, fontFamily: Fonts.fontFamilyGotham.Bold, },
      '.text-body-1': { lineHeight: 21, fontSize: 15, },
      '.text-body-2': { lineHeight: 14, fontSize: 14, },
      '.text-done-common': { fontSize: 12, lineHeight: 14, color: Colors.blueDeepSky, justifyContent: 'flex-end', },
      '.text-input-common': {
        color: Colors.black,
        fontSize: 15,
        lineHeight: 21,
      },
      '.text-common-margin': {
        marginLeft: 20,
      },
      '.text-select-placeholder-common': {
        color: Colors.black,
        fontSize: 15,
        lineHeight: 21,
      },
      '.text-cell-label': {
        color: Colors.black,
        fontFamily: Fonts.fontFamilyGotham.HTF,
        fontSize: 15,
        lineHeight: 21,
      },
      '.text-cell-label-active': {
        color: Colors.blueDeepSky,
        fontFamily: Fonts.fontFamilyGotham.Medium,
        fontSize: 16,
        lineHeight: 21,
      },
      paddingTop: Platform.select({
        android: 0,
        ios: 4,
      }), // weird Gotham font fix
    },
    'NativeBase.H1': {
      '.flex0': { flex: 0, },
      '.flex1': { flex: 1, },
      '.self-stretch': { alignSelf: 'stretch', },
      '.self-center': { alignSelf: 'center', },
      '.text-center': { textAlign: 'center', },
      '.text-left': { textAlign: 'left', },
      '.text-right': { textAlign: 'right', },

      '.light': { fontFamily: Fonts.fontFamilyGotham.Light, },
      '.semi-bold': { fontFamily: Fonts.fontFamilyGotham.Medium, },
      '.bold': { fontWeight: 'bold', },
      '.text-black': { color: Colors.black, },

    },
    'NativeBase.H2': {
      '.flex0': { flex: 0, },
      '.flex1': { flex: 1, },
      '.self-stretch': { alignSelf: 'stretch', },
      '.self-center': { alignSelf: 'center', },
      '.text-center': { textAlign: 'center', },
      '.text-left': { textAlign: 'left', },
      '.text-right': { textAlign: 'right', },

      '.light': { fontFamily: Fonts.fontFamilyGotham.Light, },
      '.semi-bold': { fontFamily: Fonts.fontFamilyGotham.Medium, },
      '.bold': { fontWeight: 'bold', },
      '.text-black': { color: Colors.black, },
    },
    'NativeBase.H3': {
      '.flex0': { flex: 0, },
      '.flex1': { flex: 1, },
      '.self-stretch': { alignSelf: 'stretch', },
      '.self-center': { alignSelf: 'center', },
      '.text-center': { textAlign: 'center', },
      '.text-left': { textAlign: 'left', },
      '.text-right': { textAlign: 'right', },

      '.light': { fontFamily: Fonts.fontFamilyGotham.Light, },
      '.semi-bold': { fontFamily: Fonts.fontFamilyGotham.Medium, },
      '.bold': { fontWeight: 'bold', },
      '.text-black': { color: Colors.black, },
    },
    'NativeBase.Input': {
      '.flex0': { flex: 0, },
      '.flex1': { flex: 1, },
      '.self-stretch': { alignSelf: 'stretch', },

      '.light': { fontFamily: Fonts.fontFamilyGotham.Light, },
      '.semi-bold': { fontFamily: Fonts.fontFamilyGotham.Medium, },
      '.bold': { fontWeight: 'bold', },
      '.none-padding': { paddingLeft: 0, paddingRight: 0, },
      '.text-input-common': {
        color: Colors.black,
        fontSize: 15,
        lineHeight: 15,
      },
      '.text-common-margin': {
        marginLeft: 20,
      },
      '.text-body-1': { lineHeight: 21, fontSize: 15, },
      fontFamily: variables.fontFamily,
      lineHeight: Platform.select({
        ios: variables.inputLineHeight,
      }),
    },
    // Button customization
    'NativeBase.Button': {
      '.flex0': { flex: 0, },
      '.flex1': { flex: 1, },
      '.self-stretch': { alignSelf: 'stretch', },
      '.small-common': { width: 161, height: 42, },
      '.flex-start': { alignItems: 'flex-start', },
      '.danger-common': { backgroundColor: Colors.orangeBittersweet, },
      // add outline button white background
      '.bordered': {
        '.dark': {
          backgroundColor: Colors.white,
        },
        '.light': {
          backgroundColor: Colors.white,
        },
        '.primary': {
          backgroundColor: Colors.white,
        },
        '.success': {
          backgroundColor: Colors.white,
        },
        '.info': {
          backgroundColor: Colors.white,
        },
        '.warning': {
          backgroundColor: Colors.white,
        },
        '.danger': {
          backgroundColor: Colors.white,
        },
        '.disabled': {
          backgroundColor: Colors.white,
        },
      },
      '.shadowed': {
        shadowColor: variables.brandDark,
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.2,
        shadowRadius: 1.2,
      },
      '.content-center': {
        justifyContent: 'center',
      },
      '.iconLeft': {
        'NativeBase.Text': {
          paddingLeft: 8,
          paddingTop: Platform.select({
            android: 0,
            ios: 2,
          }),
        },
      },
      '.iconRight': {
        'NativeBase.Text': {
          paddingRight: 8,
          paddingTop: Platform.select({
            android: 0,
            ios: 2,
          }),
        },
      },
      '.tight': {
        height: null,
        paddingTop: 0,
        paddingBottom: 0,
        'NativeBase.Icon': {
          marginLeft: 0,
          marginRight: 0,
        },
        'NativeBase.Text': {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },

      'NativeBase.Text': {
        fontFamily: Fonts.fontFamilyGotham.Medium,
        paddingTop: Platform.select({
          android: 0,
          ios: 2,
        }),
      },
      '.nonBold': {

        'NativeBase.Text': {
          fontFamily: Fonts.fontFamilyGotham.Book,
          paddingTop: Platform.select({
            android: 0,
            ios: 2,
          }),
        },
      },
      elevation: undefined,
      shadowColor: undefined,
      shadowOffset: undefined,
      shadowOpacity: undefined,
      shadowRadius: undefined,
    },
    // CheckBox customization
    'NativeBase.CheckBox': {
      marginTop: Platform.select({
        android: 0,
        ios: 4,
      }), // weird Gotham font fix - to align checkbox and text
    },
    // View
    'NativeBase.Left': {
      '.flex0': { flex: 0, },
      '.flex1': { flex: 1, },
    },
    'NativeBase.Body': {
      '.flex0': { flex: 0, },
      '.flex1': { flex: 1, },
    },
    'NativeBase.Right': {
      '.flex0': { flex: 0, },
      '.flex1': { flex: 1, },
    },
    'NativeBase.ViewNB': {
      '.flex0': { flex: 0, },
      '.flex1': { flex: 1, },
      '.self-stretch': { alignSelf: 'stretch', },
      '.view-input-common': {
        height: 54,
        borderWidth: 1,
        borderRadius: Metrics.radius.buttonCorner,
        borderColor: Colors.greyLittleLight,
        alignSelf: 'stretch',
      },
      '.vertical': {
        flexDirection: 'column',

        '.space-between': { justifyContent: 'space-between', },
        '.space-around': { justifyContent: 'space-around', },
        '.space-evenly': { justifyContent: 'space-evenly', },

        '.h-center': { alignItems: 'center', },
        '.h-start': { alignItems: 'flex-start', },
        '.h-end': { alignItems: 'flex-end', },
        '.h-stretch': { alignItems: 'stretch', },
        '.h-baseline': { alignItems: 'baseline', },
        '.v-center': { justifyContent: 'center', },
        '.v-start': { justifyContent: 'flex-start', },
        '.v-end': { justifyContent: 'flex-end', },
      },
      '.horizontal': {
        flexDirection: 'row',

        '.space-between': { justifyContent: 'space-between', },
        '.space-around': { justifyContent: 'space-around', },
        '.space-evenly': { justifyContent: 'space-evenly', },

        '.h-center': { justifyContent: 'center', },
        '.h-start': { justifyContent: 'flex-start', },
        '.h-end': { justifyContent: 'flex-end', },
        '.v-center': { alignItems: 'center', },
        '.v-start': { alignItems: 'flex-start', },
        '.v-end': { alignItems: 'flex-end', },
        '.v-stretch': { alignItems: 'stretch', },
        '.v-baseline': { alignItems: 'baseline', },
      },

      '.bordered': {
        borderColor: Colors.greyLittleLight,
        borderRadius: variables.borderRadiusBase,
        borderWidth: variables.borderWidth * 2,
      },
      '.bordered-bottom': {
        borderBottomWidth: variables.borderWidth * 2,
        borderColor: Colors.whiteSmoke,

      },
      '.shadowed': {
        shadowColor: variables.brandDark,
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.2,
        shadowRadius: 1.2,
      },
      '.view-input-common-height': { height: 54, },
      '.margin-common': { marginHorizontal: 20, },
    },
  }
)

export default Theme

export const StyleProvider = ({ children, }) => (
  <NBStyleProvider style={Theme}>
    {children}
  </NBStyleProvider>
)
