import {
  AppRedux,
  ErrorRedux,
  FetchingRedux,
  NavigationRedux,
} from '@src/redux/reducers';
import {compose, withEffect, withHook} from '@truefit/bach';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import R from 'ramda';
import {useMemo} from 'react';
import View from './AppNavigationV';

const useConnect = () => {
  // mapState
  const mapState = useSelector((state) => {
    const currentError = R.pipe(
      ErrorRedux.getReducerState,
      ErrorRedux.getCurrentError,
    )(state);
    const fetching = R.pipe(
      FetchingRedux.getReducerState,
      FetchingRedux.getFetchingStatus,
    )(state);
    return {
      currentError,
      fetching,
    };
  });
  // mapDispatch
  const dispatch = useDispatch();
  const mapDispatch = useMemo(
    () => ({
      /// set meta thunk to true for async dispatch that wait for saga to finish
      onInitializeApp: () =>
        dispatch(AppRedux.Creators.initializeApp({thunk: true})),
      onErrorFinish: () => dispatch(ErrorRedux.Creators.currentErrorFinish()),
      onInitializeAppContainerRef: (ref) =>
        dispatch(NavigationRedux.Creators.initializeAppContainerRef(ref)),
      onNavMain: () =>
        dispatch(
          NavigationRedux.Creators.dispatchNavigationAction(
            NavigationActions.navigate({
              routeName: 'MainTab',
            }),
          ),
        ),
    }),
    [dispatch],
  );

  return {
    ...mapState,
    ...mapDispatch,
  };
};

export default compose(
  withHook(useConnect, null, 'rdx'),
  withEffect(({rdx}) => {
    const initializeAsync = async () => {
      const payload = await rdx.onInitializeApp();

      // nav to main screen after init if hasToken
      if (payload && payload.hasToken) {
        rdx.onNavMain();
      }
    };

    initializeAsync();
  }, []), // run once
)(View);
