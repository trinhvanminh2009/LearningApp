import { parsePhoneNumberFromString, PhoneNumber, } from 'libphonenumber-js'

export const formatPhoneNumber = (phoneNumberStr) => {
  if (!phoneNumberStr) { return null }

  const phoneNumber: PhoneNumber = parsePhoneNumberFromString(phoneNumberStr)
  if (!phoneNumber) { return null }

  return `+${phoneNumber.countryCallingCode} ${phoneNumber.formatNational()}`
}
