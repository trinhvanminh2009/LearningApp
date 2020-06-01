import {compose, withCallback} from '@truefit/bach';
import {createStackNavigator} from 'react-navigation-stack';
import {TutorialScreen} from '@src/screens';
import {STACKNAV_CONFIG} from './Constants';

const StartStack = createStackNavigator(
  {
    SignIn: {
      screen: compose(
        withCallback(
          'onNavMainTab',
          ({navigation}) => () => navigation.navigate('MainTab'),
          ['navigation'],
        ),
      )(TutorialScreen),
    },
  },
  {
    ...STACKNAV_CONFIG,
    headerMode: 'none',
    initialRouteName: 'SignIn',
  },
);

export default StartStack;
