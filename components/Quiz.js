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
