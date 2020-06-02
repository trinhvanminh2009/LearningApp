import {
  ActivityIndicator, Image, Platform, StatusBar, StyleSheet,

  SafeAreaView,
} from 'react-native'
import { Text, View, Button } from 'native-base'
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

    <View style={styles.tutorialContainer}>
      <SafeAreaView>
        <Text text-right text-detail-white text-common-margin-right-30 text-body-2 semi-bold>{'skip'}</Text>
        <Image source={Images.splash} resizeMode={"stretch"} style={styles.splash} />
        <View  style = {styles.containerBottom}>
          <Text text-detail-white text-header-title-big semi-bold text-center>{'Best online coaches'}</Text>
          <Text text-detail-white text-center margin-top-20>{'get some fantasct online videos and content\nto learn more and gain extra knowledge'}</Text>
          <Button content-center style={styles.buttonNext}>
            <Text text-ocean-blue>{'Next'}</Text>
          </Button>
        </View>

      </SafeAreaView>


    </View>
  )
}
const styles = StyleSheet.create({

  tutorialContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.oceanBlue,
  },
  splash: {
    marginTop: 20,
    width: '95%',
  },
  buttonNext: {
    width: 137,
    borderRadius: 21,
    backgroundColor: Colors.white,
    marginTop: 30,


  },
  containerBottom: {
    marginTop: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  }

})

export default TutorialV
