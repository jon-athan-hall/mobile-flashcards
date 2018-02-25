/**
 * React Native
 */
import React from 'react'
import { Text, TouchableHighlight, StyleSheet } from 'react-native'

/**
 * Utils
 */
import { white, yellow, baseSize, phi } from '../utils/constants'

/**
 * Functional Component
 */
const SubmitButton = ({ text, onPress }) => (
  <TouchableHighlight onPress={onPress} style={styles.submitButton}>
    <Text style={styles.submitButtonText}>{text}</Text>
  </TouchableHighlight>
)

/**
 * Styles
 */
const styles = StyleSheet.create({
  submitButton: {
    marginTop: baseSize / 2,
    marginBottom: baseSize / 2,
    padding: baseSize,
    backgroundColor: yellow,
    borderRadius: baseSize / 4
  },
  submitButtonText: {
    color: white,
    fontSize: baseSize * phi,
    textAlign: 'center'
  }
})

export default SubmitButton
