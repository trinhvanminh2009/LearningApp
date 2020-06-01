import { createMigrate, PersistConfig, } from 'redux-persist'
import storage from '@react-native-community/async-storage'

export {
  storage,
}
export const isPersistActive = true
const migrations = {
  0: state => ({
    // conversation.messages shape change from array => object
    ...state,
    conversation: {},
  }),
}
export const persistConfig: PersistConfig = {
  key: 'root',
  // update reducerVersion each time reducer configuration changes to purge redux persisted storage
  version: 0,
  storage,
  // reducer keys that you do NOT want stored to persistence here
  blacklist: [
    // nested, separate persist config
    'calls',
    'conversation',
    // default blacklist
    'app',
    'error',
    'fetching',
    'navigation',
    'net_info',
    'thunk',
  ],
  migrate: createMigrate(migrations, { debug: __DEV__, }),
  /*
  // Optionally, just specify the keys you DO want stored to persistence.
  // An empty array means 'don't store any reducers' -> infinitered/ignite#409
  whitelist: [
  ],
  stateReconciler: autoMergeLevel1, // default
  debug
  */
}
