/**
 * React Native
 */
import React, { Component }       from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'

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

    /**
     * This is a simpler verson of a similar subscription in the Deck component.
     */
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus', () => { getDecks().then((decks) => this.setState({ ready: true, decks})) }
    )
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove()
  }

  toDeck = (deckKey) => {
    this.props.navigation.push('Deck', { deckKey })
  }

  render() {
    const { ready, decks } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    // @TODO Try out ES6 from function?
    return (
      <ScrollView contentContainerStyle={styles.deckList}> 
        {Object.keys(decks).map((deckKey) => {
          const { title, cards } = decks[deckKey]

          return (
            <DeckInfo key={deckKey} deckKey={deckKey} title={title} size={cards.length} handlePress={this.toDeck}/>
          )
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  deckList: {
    flex: 1,
    padding: baseSize
  }
})

export default DeckList
