import { APP_CONFIG, } from '@src/constants'

const reducerPrefixFormat = (_key) => (`${APP_CONFIG.prefixReducer}/${_key}_reducer/`).toUpperCase()

export {
  reducerPrefixFormat,
}
