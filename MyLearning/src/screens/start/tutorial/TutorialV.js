import {
  ActivityIndicator, Image, Platform, StatusBar, StyleSheet, Button,
  Text,
  View,
} from 'react-native'

import { Colors, Fonts, Images, Metrics, } from '@src/assets'
import React, { useEffect, } from 'react'
import { useNavigation, } from 'react-navigation-hooks'
import { type VProps, } from './types'

const TutorialV = ({
  onNavMainTab,
  rdx: {
    isPendingLogin,
    isPendingRefreshToken,
    isLoading,
  },
}: VProps) => {

  return (

    <View style={styles.containerSignIn}>



    </View>
  )
}
const styles = StyleSheet.create({
  btnSignIn: {
    backgroundColor: Colors.blueDeepSky,
    height: 51,
    marginBottom: 20,
    marginTop: 32,

  },
  containerAction: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  containerLogo: {
    marginBottom: 45,
    marginTop: Metrics.screen.height > 700 ? 100 : '10%',
  },
  containerSignIn: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.redCharm,
  },
  imageLogo: {
    height: 77,
    width: 218,
  },
  labelStyle: {
    color: Colors.black,
  },
  textInputStyle: {
    color: Colors.black,
  },
  textTitle: {
    color: Colors.white,
    marginBottom: 45,
  },
})

export default TutorialV
