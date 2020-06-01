import {
  CallDetailScreen,
} from '@src/screens'
import {compose, withCallback, withMemo} from '@truefit/bach';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation-stack';
import {STACKNAV_CONFIG, TABNAV_CONFIG} from './Constants';
import {Icon} from 'native-base';
import React from 'react';


const MainTab = createStackNavigator({
  CallDetail: {
    screen: compose(
      withMemo('contactId', ({ navigation, }) => (navigation.getParam('contactId')), [ 'navigation', ]),
      withMemo('phoneNumber', ({ navigation, }) => (navigation.getParam('phoneNumber')), [ 'navigation', ]),
      withMemo('initialComposer', ({ navigation, }) => (navigation.getParam('initialComposer', '')), [ 'navigation', ]),
    )(CallDetailScreen),
  },
}, {
  ...TABNAV_CONFIG,
  initialRouteName: 'CallDetail',
});
const MainTabStack = createStackNavigator(
  {
    MainTab: {
      screen: MainTab,
    },

  },
  {
    ...STACKNAV_CONFIG,
    headerMode: 'none',
    initialRouteName: 'MainTab',
  },
);

export default MainTabStack;
