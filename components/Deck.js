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
      deckKey: null,
      title: null,
      cards: []
    }

    /**
     * This crazy block of code helps trigger a state update
     * after the component comes into focus through navigation.
     * There was a bug with the StackNavigator pop function not
     * not updating this component.
     */
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      (payload) => {
        const { deckKey } = payload.state.params
        getDeck({ deckKey })
          .then(({ title, cards }) => this.setState({
            ready: true,
            deckKey,
            title,
            cards
          }))
      }
    )
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove()
  }

  toAddCard = () => {
    const { deckKey } = this.state
    this.props.navigation.push('CardForm', { deckKey })
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
        <SubmitButton text='Add Card' onPress={this.toAddCard} />
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
