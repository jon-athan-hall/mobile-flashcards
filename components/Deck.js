/**
 * React Native
 */
import React                      from 'react'
import { View, Text, StyleSheet } from 'react-native'

/**
 * Utils
 */
import { baseSize, darkGray, phi } from '../utils/constants'

/**
 * Functional Component
 */
const Deck = ({ title, size }) => (
  <View style={styles.deck}>
    <Text style={styles.deckTitle}>{title}</Text>
    <Text>{size} card{size !== 1 ? 's' : ''}</Text>
  </View>
)

/**
 * Styles
 */
const styles = StyleSheet.create({
  deck: {
    alignItems: 'center',
    marginTop: baseSize,
    marginLeft: baseSize,
    marginBottom: baseSize,
    marginRight: baseSize,
    paddingTop: baseSize * 2,
    paddingBottom: baseSize * 2,
    borderRadius: baseSize / 4,
    borderColor: darkGray,
    borderWidth: 1
  },
  deckTitle: {
    fontSize: baseSize * phi,
    fontWeight: 'bold'
  }
})

export default Deck
