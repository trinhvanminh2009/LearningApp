import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {MainTabWithModalStack, StartStack} from '../Navigators';
import {STACKNAV_CONFIG} from '../Navigators/Constants';

const RootNavigator = createSwitchNavigator(
  {
    StartStack: {
      screen: StartStack,
    },
    MainTabWithModalStack: {
      screen: MainTabWithModalStack,
    },
  },
  {
    ...STACKNAV_CONFIG,
    headerMode: 'none',
    initialRouteName: 'StartStack',
  },
);

const AppContainer = createAppContainer(RootNavigator);

export default AppContainer;
