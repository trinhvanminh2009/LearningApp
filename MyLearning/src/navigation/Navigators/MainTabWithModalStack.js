import {
  AssigneeScreen,
} from '@src/screens';
import {compose, withCallback, withHook, withMemo} from '@truefit/bach';
import {createStackNavigator} from 'react-navigation-stack';
import MainTabStack from './MainTabStack';
import {STACKNAV_CONFIG} from './Constants';
import {useAutoNavigate} from '../_hooks';

// MARK: - MainTabWithModalStack
const MainTabWithModalStack = createStackNavigator(
  {
    MainTabStack: {
      screen: MainTabStack,
    },

    Assignee: {
      screen: compose(
        withMemo(
          'currentAssignee',
          ({navigation}) => navigation.getParam('currentAssignee'),
          ['navigation'],
        ),
        withMemo(
          'onSelectAssignee',
          ({navigation}) => navigation.getParam('onSelectAssignee'),
          ['navigation'],
        ),
        withCallback('onNavBack', ({navigation}) => () => navigation.goBack(), [
          'navigation',
        ]),
      )(AssigneeScreen),
    },

  },
  {
    ...STACKNAV_CONFIG,
    headerMode: 'none',
    initialRouteName: 'MainTabStack',
    mode: 'modal',
  },
);

export default MainTabWithModalStack;
