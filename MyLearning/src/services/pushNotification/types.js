import { type Notification, type NotificationOpen, type RemoteMessage, } from 'react-native-firebase'

export type onTokenRefreshCallback = (token: String) => void

export type onMessageCallback = (message: RemoteMessage) => void

export type onNotificationDisplayedCallback = (notification: Notification) => void

export type onNotificationCallback = (notification: Notification) => void

export type onNotificationOpenedCallback = (notificationOpen: NotificationOpen) => void
