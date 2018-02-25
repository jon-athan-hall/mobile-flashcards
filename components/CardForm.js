/**
 * React Native
 */
import React, { Component }  from 'react'
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native'

/**
 * Utils
 */
import { addCardToDeck }   from '../utils/api'
import { baseSize, white } from '../utils/constants'

/**
 * Components
 */
import SubmitButton from './SubmitButton'

class CardForm extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      deckKey: this.props.navigation.state.params.deckKey,
      question: null,
      answer: null
    }
  }

  handleQuestionChange = (question) => {
    this.setState({ question })
  }

  handleAnswerChange = (answer) => {
    this.setState({ answer })
  }

  handleSubmit = () => {
    const { deckKey, question, answer } = this.state

    addCardToDeck({ deckKey, question, answer })
    this.props.navigation.pop()
  }

  render() {
    const { question, answer } = this.state

    return (
      <KeyboardAvoidingView style={styles.cardForm}>
        <TextInput onChangeText={(text) => this.handleQuestionChange(text)} defaultValue='Question' value={question} style={styles.cardFormTextInput} />
        <TextInput onChangeText={(text) => this.handleAnswerChange(text)} defaultValue='Answer' value={answer} style={styles.cardFormTextInput} />
        <SubmitButton text='Add Card' onPress={this.handleSubmit} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  cardForm: {
    flex: 1,
    justifyContent: 'center',
    padding: baseSize
  },
  cardFormTextInput: {
    marginTop: baseSize,
    marginBottom: baseSize,
    padding: baseSize,
    backgroundColor: white,
    fontSize: baseSize
  }
})

export default CardForm
