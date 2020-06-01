import {ApplicationStyles, Colors} from '@src/assets';
import {StackNavigatorConfig, TabNavigatorConfig} from 'react-navigation';

const {screen: screenStyles} = ApplicationStyles;

export const STACKNAV_CONFIG: StackNavigatorConfig = {
  cardStyle: screenStyles.navStackCard,
  mode: 'card',
  defaultNavigationOptions: {
    gesturesEnabled: false,
    headerBackTitle: null,
    /*
    headerStyle: screenStyles.navBarContainer,
    headerTintColor: Colors.black,
    headerTitle: ({ style, ...props }) => (
      <HeaderTitle
        style={
          R.pipe(
            R.flatten, // Because "style" can be an array
            R.mergeAll
          )([
            textStyles.navBarTitle,
            style
          ])
        }
        {...props}
      />
    ),
    headerTitleStyle: {
      color: Colors.white
    },
    */
  },
};

export const TABNAV_CONFIG: TabNavigatorConfig = {
  tabBarOptions: {
    activeTintColor: Colors.blueDeepSky,
    inactiveTintColor: Colors.greyNobel,
    showLabel: false,
    style: {
      borderTopWidth: 0,
      elevation: 10,
      shadowColor: '#000000',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 10,
    },
  },
};
