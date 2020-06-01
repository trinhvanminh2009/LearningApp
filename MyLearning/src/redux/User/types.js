/**
 * @flow
 */

export type LoginPayload = {
  email: string,
  password: string,
  isRememberMe: boolean,
}

export type LoginResponsePayload = {
  // AuthResultModel in docs
  token: string,
  twilioCapabilityToken: string,
  twilioAccessToken: string,
  dateExpired: Date, // date string
  account: {}, // AccountModel
  user: {}, // UserModel
  loggedId: string,
}
