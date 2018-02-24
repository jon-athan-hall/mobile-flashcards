/**
 * React Native
 */
import React, { Component }  from 'react'
import { View, Text }        from 'react-native'
import { NavigationActions } from 'react-navigation'

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

  toDeck = (title) => {
    //this.props.navigation.dispatch(NavigationActions.back({
    //  key: 'Deck'
    //}))
    console.log('title...', title)
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
          const { title, cards } = decks[deck]

          return (
            <DeckInfo key={deck} title={title} size={cards.length} handlePress={this.toDeck}/>
          )
        })}
      </View>
    )
  }
}

export default DeckList
