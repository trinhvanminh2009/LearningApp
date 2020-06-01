import { API_CONFIG, } from '@src/constants'
import apisauce from 'apisauce'
const _api = (() => {
  const api = apisauce.create({
    baseURL: API_CONFIG.HOST,
    timeout: API_CONFIG.timeout,
  })

  /*
  if (API_CONFIG.isLoggingEnable) {
    const monitor = (response) => (console.warn(
      'apisauce:monitor:',
      '\nCONFIG:', response.config,
      '\nERROR:', response._error ? response._error.message : response._error,
      // '\nRESULT:', response._result ? JSON.stringify(response._result, null, '  ') : response._result
      '\nRESULT:', response._result ? 'Has result' : response._result
    ))
    api.addMonitor(monitor)
  }
  */

  /* Transform response if needed
  api.addResponseTransform((response) => {
  })
  */

  return api
})()

export default _api
