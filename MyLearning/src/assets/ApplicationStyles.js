import Colors from './Colors'
import Metrics from './Metrics'

export default {
  screen: {
    blurFill: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'stretch',
    },
    navStackCard: {
      backgroundColor: Colors.white,
    },
    navBarContainer: {
      backgroundColor: Colors.white,
      borderBottomColor: Colors.transparent,
      height: Metrics.height.navBar,
    },
    containerInput: {
      paddingHorizontal: 16,
    },
  },
}
