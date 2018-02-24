/**
 * React Native
 */
import React, { Component }                         from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

/**
 * Expo
 */
import { AppLoading } from 'expo'

/**
 * Utils
 */
import { getDeck }                         from '../utils/api'
import { baseSize, darkGray, phi, yellow } from '../utils/constants'

/**
 * Components
 */
import Deck from './Deck'

class Quiz extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      ready: false,
      title: 'React',
      questions: []
    }
  }

  componentDidMount() {
    const { title } = this.state

    getDeck({ title })
     .then(({ title, questions }) => this.setState({
       ready: true,
       title,
       questions
     }))
  }

  render() {
    const { ready, title, questions } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View>
        <Deck title={title} size={questions.length} />
        <TouchableOpacity style={styles.addCardButton}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startQuizButton}>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  addCardButton: {
    backgroundColor: yellow
  },
  startQuizButton: {
    backgroundColor: yellow
  }
})

export default Quiz
