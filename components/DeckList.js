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
import { getDecks } from '../utils/api'
import { baseSize } from '../utils/constants'

/**
 * Components
 */
import DeckInfo from './DeckInfo'

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

  toDeck = (key) => {
    this.props.navigation.push('Deck', { key })
  }

  render() {
    const { ready, decks } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    // @TODO Try out ES6 from function?
    return (
      <View style={styles.deckList}>
        {Object.keys(decks).map((deck) => {
          const { title, cards } = decks[deck]

          return (
            <DeckInfo key={deck} deckKey={deck} title={title} size={cards.length} handlePress={this.toDeck}/>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckList: {
    flex: 1,
    justifyContent: 'center',
    padding: baseSize
  }
})

export default DeckList
