import {type NavigationProp} from 'react-navigation';
import {useEffect} from 'react';

// ---- common enhancer
export const useAutoNavigate = ({
  navigation,
  toScreenName,
  toScreenParams,
  navDelay,
}: {
  navigation: NavigationProp,
  toScreenName: string,
  toScreenParams?: {},
  navDelay: ?number,
}) => {
  useEffect(() => {
    (async () => {
      await delay(navDelay);

      navigation.navigate(toScreenName, toScreenParams);
    })();
  }, [navigation, toScreenName, navDelay]);
};
