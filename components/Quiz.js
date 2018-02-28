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
import { getDeck }               from '../utils/api'
import { baseSize, phi, yellow } from '../utils/constants'
import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/notifications'

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
      numberCorrect: 0,
      showResult: false
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

  registerAnswer = (correct) => {
    this.setState((prevState) => {
      const currentNumber = prevState.currentNumber + 1
      const showQuestion = true
      const numberCorrect = correct ? prevState.numberCorrect + 1 : prevState.numberCorrect
      let showResult = false

      if (currentNumber > this.state.cards.length) {
        showResult = true
        clearLocalNotification().then(setLocalNotification)
      }

      return {
        currentNumber,
        showQuestion,
        numberCorrect,
        showResult
      }
    })
  }

  restartQuiz = () => {
    this.setState({
      currentNumber: 1,
      showQuestion: true,
      numberCorrect: 0,
      showResult: false
    })
  }

  toDeck = () => {
    this.restartQuiz()
    this.props.navigation.pop()
  }

  render() {
    const { ready, cards, currentNumber, showQuestion, numberCorrect, showResult } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    if (showResult) {
      return (
        <View style={styles.result}>
          <Text style={styles.resultScore}>{(numberCorrect / cards.length * 100).toFixed(2)}%</Text>
          <SubmitButton text='Restart Quiz' onPress={this.restartQuiz} />
          <SubmitButton text='Back to Deck' onPress={this.toDeck} />
        </View>
      )
    }

    return (
      <View style={styles.quiz}>
        <View style={styles.quizCount}>
          <Text style={styles.quizCountValue}>#{currentNumber} out of {cards.length}</Text>
        </View>
        {showQuestion
          ? <View style={styles.quizCard}>
              <Text style={styles.quizCardText}>{cards[currentNumber - 1].question}</Text>
              <Button title='Reveal Answer' color={yellow} onPress={this.toggleQuestion} />
            </View>
          : <View style={styles.quizCard}>
              <Text style={styles.quizCardText}>{cards[currentNumber - 1].answer}</Text>
              <Button title='Show Question' color={yellow} onPress={this.toggleQuestion} />
            </View>
        }
        <View>
          <SubmitButton text='Correct' onPress={() => this.registerAnswer(true)} />
          <SubmitButton text='Incorrect' onPress={() => this.registerAnswer(false)} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  quiz: {
    flex: 1,
    justifyContent: 'space-between',
    padding: baseSize
  },
  quizCount: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  quizCountValue: {
    fontWeight: 'bold'
  },
  quizCard: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  quizCardText: {
    marginBottom: baseSize,
    fontSize: baseSize * phi,
    textAlign: 'center'
  },
  result: {
    flex: 1,
    justifyContent: 'center',
    padding: baseSize
  },
  resultScore: {
    marginBottom: baseSize * phi,
    fontSize: baseSize * phi * phi,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default Quiz
