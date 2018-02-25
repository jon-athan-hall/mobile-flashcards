/**
 * React
 */
import React                           from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'

/**
 * Expo
 */
import { Constants } from 'expo'

/**
 * Utils
 */
import { darkGray } from '../utils/constants'

const AppStatusBar = (props) => (
  <View style={styles.appStatusBar}>
    <StatusBar translucent backgroundColor={darkGray} {...props} />
  </View>
)

const styles = StyleSheet.create({
  appStatusBar: {
    height: Constants.statusBarHeight
  }
})

export default AppStatusBar
