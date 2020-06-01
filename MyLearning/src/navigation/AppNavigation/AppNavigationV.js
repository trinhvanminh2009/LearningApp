import {Colors, Fonts} from '@src/assets';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {Image, StyleSheet} from 'react-native';
import React, {memo, useEffect} from 'react';

// import { APP_CONFIG, } from '@src/constants'
import AppContainer from '../AppContainer';
import {icons} from '@src/assets/Images';
import {ifIphoneX} from 'react-native-iphone-x-helper';
// import { BlurView, } from '@react-native-community/blur'
import {Root} from 'native-base';

import {VProps} from './types';

const alertIcon = (icon, style, customProps) => {
  return (
    <Image
      source={icons.alert}
      style={[styles.errorIcon, style]}
      {...customProps}
    />
  );
};
const AppNavigationV = (props: VProps) => {
  const {currentError, onInitializeAppContainerRef, onErrorFinish} = props.rdx;
  // alert errors
  useEffect(() => {
    if (currentError) {
      showMessage({
        message: currentError.message || currentError,
      });
      onErrorFinish();
      // Alert.alert(
      //   APP_CONFIG.displayName,
      //   currentError.message || currentError,
      //   [
      //     {
      //       text: 'OK',
      //       onPress: () => {
      //         onErrorFinish()
      //       },
      //     },
      //   ],
      //   {
      //     onDismiss: () => {
      //       onErrorFinish()
      //     },
      //   }
      // )
    }
  }, [currentError]);

  return (
    <Root>
      <AppContainer ref={onInitializeAppContainerRef} />
      <FlashMessage
        icon={{icon: 'danger', position: 'left'}}
        position="bottom"
        renderFlashMessageIcon={alertIcon}
        style={styles.errorBackground}
        titleStyle={styles.errorTitle}
      />
      {/*
        this.props.fetching &&
        <BlurView
          // blurAmount={50}
          blurType='light'
          style={screenStyles.blurFill}
        >
          <ActivityIndicator
            animating
            color={Colors.grayDim}
            size='large'
          />
        </BlurView>
      */}
    </Root>
  );
};
const styles = StyleSheet.create({
  errorBackground: {
    backgroundColor: Colors.orangeBittersweet,
    ...ifIphoneX({
      paddingBottom: 0,
    }),
  },
  errorIcon: {
    alignSelf: 'center',
    height: 24,
    width: 24,
  },
  errorTitle: {
    fontSize: 13,
  },
});
export default memo(AppNavigationV);
