import { Platform, } from 'react-native'

const IS_DEV_API = __DEV__

export default {
  // app specific
  APP_KEY: IS_DEV_API
    ? Platform.select({
      android: 418327184,
      ios: 805640457,
    })
    : Platform.select({
      android: 612778858,
      ios: 398827530,
    }),
  HOST: IS_DEV_API // BASE_URL
    ? 'https://dev.bbc.com'
    : 'https://app.bbc.com/',
  AVATAR_URL: IS_DEV_API
    ? 'https://dev-bbc-files.s3.amazonaws.com/avatar'
    : 'https://bbc-files.s3.amazonaws.com/avatar',
  VOICE_MAIL_URL: IS_DEV_API
    ? 'https://dev-bbc-files.s3.amazonaws.com/voicemail'
    : 'https://bbc-files.s3.amazonaws.com/voicemail',
  // generic config
  timeout: 10000,
  unauthorizedErrorCode: 401,
  TokenExpiredHeader: 'token-expired',
}
