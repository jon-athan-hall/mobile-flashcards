/**
 * React Native
 */
import { AsyncStorage } from 'react-native'

/**
 * Expo
 */
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

export const clearLocalNotification = () => (
  AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(notifications.cancelAllScheduledNotificationsAsync)
)

const createLocalNotification = () => ({
  title: 'Daily Quiz.',
  body: 'Be sure to take you daily quiz',
  ios: {
    sound: true
  }
})

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(18)
              tomorrow.setMinutes(30)

              Notifications.scheduleLocalNotificationAsync(
                createLocalNotification(), {
                  time: tomorrow,
                  repeat: 'day'
              })

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
