import {
  type onMessageCallback,
  type onNotificationCallback, type onNotificationDisplayedCallback, type onNotificationOpenedCallback,
  type onTokenRefreshCallback,
} from './types'
import firebase from 'react-native-firebase'
import { Platform, } from 'react-native'

class PushService {
  pushToken: String = null

  tokenRefreshListener: any = null

  messageListener: any = null

  notificationDisplayedListener: any = null

  notificationListener: any = null

  notificationOpenedListener: any = null

  init: () => String = async () => {
    try {
      // request push permisson
      await this.requestPermisson()

      this.setTokenRefreshListener()
      this.setMessageListener()

      const token: String = await this.getToken()
      this.pushToken = token

      // const channel = new firebase.notifications.Android.Channel('voximplant_channel_id', 'Incoming call channel', firebase.notifications.Android.Importance.Max).setDescription('Incoming call received')
      // firebase.notifications().android.createChannel(channel)
      return this.pushToken
    } catch (e) {
      console.warn('[PushService] init error.', { error: e, })
    }
  }

  clearAllListeners: () => void = () => {
    this.tokenRefreshListener && this.tokenRefreshListener()
    this.messageListener && this.messageListener()
    this.notificationDisplayedListener && this.notificationDisplayedListener()
    this.notificationListener && this.notificationListener()
    this.notificationOpenedListener && this.notificationOpenedListener()
  }

  setTokenRefreshListener: (onTokenRefreshCallback) => void = (callback) => {
    this.tokenRefreshListener && this.tokenRefreshListener()
    this.tokenRefreshListener = firebase.messaging().onTokenRefresh((token: String) => {
      // console.log('Refresh token: ' + token)
      this.pushToken = token
      callback && callback(token)
    })
  }

  setMessageListener: (onMessageCallback) => void = (callback) => {
    this.messageListener && this.messageListener()
    callback && (this.messageListener = firebase.messaging().onMessage(callback))
  }

  setNotificationDisplayedListener: (onNotificationDisplayedCallback) => void = (callback) => {
    this.notificationDisplayedListener && this.notificationDisplayedListener()
    callback && (this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed(callback))
  }

  setNotificationListener: (onNotificationCallback) => void = (callback) => {
    this.notificationListener && this.notificationListener()
    callback && (this.notificationListener = firebase.notifications().onNotification(callback))
  }

  setNotificationOpenedListener: (onNotificationOpenedCallback) => void = (callback) => {
    this.notificationOpenedListener && this.notificationOpenedListener()
    callback && (this.notificationOpenedListener = firebase.notifications().onNotificationOpened(callback))
  }

  getInitialNotification = () => (
    firebase.notifications().getInitialNotification()
  )

  getBadge: () => Promise<number> = () => (
    firebase.notifications().getBadge()
  )

  setBadge: (badge: number) => void = (badge) => (
    firebase.notifications().setBadge(badge)
  )

  // showLocalNotification (from) {
  //   console.log('PushManager: showLocalNotification')
  //   try {
  //     const notification = new firebase.notifications.Notification()
  //       .setNotificationId('notificationId')
  //       .setTitle('Incoming call')
  //     notification.android.setSmallIcon('ic_vox_notification')
  //     notification
  //       .android.setChannelId('voximplant_channel_id')
  //     firebase.notifications().displayNotification(notification)
  //   } catch (e) {
  //     console.warn('React Native Firebase is not set up. Enable google-services plugin at the bottom of the build.gradle file')
  //   }
  // }

  // removeDeliveredNotification () {
  //   try {
  //     firebase.notifications().removeAllDeliveredNotifications()
  //   } catch (e) {
  //     console.warn('React Native Firebase is not set up. Enable google-services plugin at the bottom of the build.gradle file')
  //   }
  // }

  getToken: () => String = async () => {
    try {
      const fcmToken = await firebase.messaging().getToken()

      return fcmToken
    } catch (error) {
      console.warn('[PushService] get token error.', { error, })
      throw error
    }
  }

  requestPermisson: () => void = async () => {
    try {
      if (Platform.OS === 'ios') {
        await firebase.messaging().requestPermission()
        // User has authorised
      }
      const hasPermisson = await firebase.messaging().hasPermission()

      if (!hasPermisson) throw new Error(`Please enable push notification permisson.`)
    } catch (error) {
      // User has rejected permissions
      console.warn('[PushService] request permisson error.', { error, })
      throw error
    }
  }
}

const pushService = new PushService()
export default pushService
