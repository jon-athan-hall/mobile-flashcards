/**
 * React Native
 */
import React                                          from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

/**
 * Utils
 */
import { baseSize, darkGray, phi } from '../utils/constants'

/**
 * Functional Component
 */
const DeckInfo = ({ deckKey, title, size, handlePress }) => {
  if (handlePress === undefined) {
    return (
      <View style={styles.deckInfo}>
        <Text style={styles.deckInfoTitle}>{title}</Text>
        <Text style={styles.deckInfoSize}>{size} card{size !== 1 ? 's' : ''}</Text>
      </View>
    )
  }
     
  return (
    <TouchableHighlight style={styles.deckInfo} onPress={() => handlePress(deckKey)}>
      <View>
        <Text style={styles.deckInfoTitle}>{title}</Text>
        <Text style={styles.deckInfoSize}>{size} card{size !== 1 ? 's' : ''}</Text>
      </View>
    </TouchableHighlight>
  )
}

/**
 * Styles
 */
const styles = StyleSheet.create({
  deckInfo: {
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
  deckInfoTitle: {
    fontSize: baseSize * phi,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  deckInfoSize: {
    textAlign: 'center'
  }
})

export default DeckInfo
