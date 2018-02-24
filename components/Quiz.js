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
        <View style={styles.deck}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text>{questions.length} card{questions.length !== 1 ? 's' : ''}</Text>
        </View>
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
  deck: {
    alignItems: 'center',
    marginTop: baseSize,
    marginLeft: baseSize,
    marginBottom: baseSize,
    marginRight: baseSize,
    paddingTop: baseSize * 2,
    paddingBottom: baseSize * 2,
    borderRadius: baseSize / 4,
    borderColor: darkGray,
    borderWidth: 1
  },
  deckTitle: {
    fontSize: baseSize * phi,
    fontWeight: 'bold'
  },
  addCardButton: {
    backgroundColor: yellow
  },
  startQuizButton: {
    backgroundColor: yellow
  }
})

export default Quiz
