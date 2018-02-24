/**
 * React Native
 */
import React, { Component }       from 'react'
import { View, Text, StyleSheet } from 'react-native'

/**
 * Expo
 */
import { AppLoading } from 'expo'

/**
 * Utils
 */
import { getDecks }                from '../utils/api'
import { baseSize, darkGray, phi } from '../utils/constants'

/**
 * Class Component
 */
class DeckList extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      ready: false,
      decks: null
    }
  }

  componentDidMount() {
    getDecks()
      .then((decks) => this.setState(() => ({ decks, ready: true })))
  }

  render() {
    const { ready, decks } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    // @TODO Try out ES6 from function?
    return (
      <View>
        {Object.keys(decks).map((deck) => {
          const { title, questions } = decks[deck]

          return (
            <View key={deck} style={styles.deck}>
              <Text style={styles.deckTitle}>{title}</Text>
              <Text>{questions.length} card{questions.length !== 1 ? 's' : ''}</Text>
            </View>
          )
        })}
      </View>
    )
  }
}

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

export default DeckList
