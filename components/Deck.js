/**
 * React Native
 */
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

/**
 * Expo
 */
import { AppLoading } from 'expo'

/**
 * Utils
 */
import { getDeck }  from '../utils/api'
import { baseSize } from '../utils/constants'

/**
 * Components
 */
import DeckInfo     from './DeckInfo'
import SubmitButton from './SubmitButton'

/**
 * Class Component
 */
class Deck extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      ready: false,
      title: null,
      cards: []
    }
  }

  componentDidMount() {
    const { key } = this.props.navigation.state.params

    getDeck({ key })
     .then(({ title, cards }) => this.setState({
       ready: true,
       title,
       cards
     }))
  }

  addCard = () => {
    console.log('Add Card')
  }

  startQuiz = () => {
    console.log('Start Quiz')
  }

  render() {
    const { ready, title, cards } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.deck}>
        <DeckInfo title={title} size={cards.length} />
        <SubmitButton text='Add Card' onPress={this.addCard} />
        <SubmitButton text='Start Quiz' onPress={this.startQuiz} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    paddingTop: baseSize,
    paddingRight: baseSize,
    paddingBottom: baseSize,
    paddingLeft: baseSize
  }
})

export default Deck
