/**
 * React Native
 */
import React, { Component }                           from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'

/**
 * Expo
 */
import { AppLoading } from 'expo'

/**
 * Utils
 */
import { getDeck } from '../utils/api'
import { yellow }  from '../utils/constants'

/**
 * Components
 */
import DeckInfo from './DeckInfo'

/**
 * Class Component
 */
class Deck extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      ready: false,
      title: 'Agricola',
      cards: []
    }
  }

  componentDidMount() {
    const { title } = this.state

    getDeck({ title })
     .then(({ title, cards }) => this.setState({
       ready: true,
       title,
       cards
     }))
  }

  render() {
    const { ready, title, cards } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View>
        <Deck title={title} size={cards.length} />
        <TouchableHighlight style={styles.addCardButton}>
          <Text>Add Card</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.startQuizButton}>
          <Text>Start Quiz</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

/**
 * Styles
 */
const styles = StyleSheet.create({
  addCardButton: {
    backgroundColor: yellow
  },
  startQuizButton: {
    backgroundColor: yellow
  }
})

export default Deck
