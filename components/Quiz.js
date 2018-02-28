/**
 * React Native
 */
import React, { Component }               from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

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
import SubmitButton from './SubmitButton'

/**
 * Class Component
 */
class Quiz extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      ready: false,
      deckKey: null,
      cards: [],
      currentNumber: 1,
      showQuestion: true,
      numberCorrect: 0
    }
  }

  componentDidMount() {
    const { deckKey } = this.props.navigation.state.params

    getDeck({ deckKey })
      .then(({ title, cards }) => this.setState({
        ready: true,
        deckKey,
        cards
      }))
  }

  toggleQuestion = () => {
    this.setState((prevState) => ({
      showQuestion: !prevState.showQuestion
    }))
  }

  registerCorrect = () => {
    console.log('correct!')
    this.setState((prevState) => ({
      currentNumber: prevState.currentNumber + 1,
      showQuestion: true,
      numberCorrect: prevState.numberCorrect + 1
    }))
  }

  registerIncorrect = () => {
    console.log('incorrect!')
    this.setState((prevState) => ({
      currentNumber: prevState.currentNumber + 1,
      showQuestion: true
    }))
  }

  restartQuiz = () => {
    this.setState({
      currentNumber: 1,
      showQuestion: true,
      numberCorrect: 0
    })
  }

  toDeck = () => {
    this.restartQuiz()
    this.props.navigation.pop()
  }

  render() {
    const { ready, cards, currentNumber, showQuestion, numberCorrect } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    if (currentNumber > cards.length) {
      return (
        <View style={styles.quiz}>
          <Text>{(numberCorrect / cards.length * 100).toFixed(2)}%</Text>
          <SubmitButton text='Restart Quiz' onPress={this.restartQuiz} />
          <SubmitButton text='Back to Deck' onPress={this.toDeck} />
        </View>
      )
    }

    return (
      <View style={styles.quiz}>
        <View>
          <Text>#{currentNumber} out of {cards.length}</Text>
        </View>
        {showQuestion
          ? <View>
              <Text>{cards[currentNumber - 1].question}</Text>
              <Button title='Reveal Answer' onPress={this.toggleQuestion} />
            </View>
          : <View>
              <Text>{cards[currentNumber - 1].answer}</Text>
              <Button title='Show Question' onPress={this.toggleQuestion} />
            </View>
        }
        <View>
          <SubmitButton text='Correct' onPress={this.registerCorrect} />
          <SubmitButton text='Incorrect' onPress={this.registerIncorrect} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  quiz: {
    flex: 1,
    padding: baseSize
  }
})

export default Quiz
