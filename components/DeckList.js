/**
 * React Native
 */
import React, { Component }       from 'react'
import { View, Text } from 'react-native'

/**
 * Expo
 */
import { AppLoading } from 'expo'

/**
 * Utils
 */
import { getDecks } from '../utils/api'

/**
 * Components
 */
import Deck from './Deck'

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
            <Deck key={deck} title={title} size={questions.length} />
          )
        })}
      </View>
    )
  }
}

export default DeckList
