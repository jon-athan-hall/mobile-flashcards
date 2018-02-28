/**
 * React Native
 */
import React, { Component } from 'react'
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native'

/**
 * Utils
 */
import { saveDeckTitle }   from '../utils/api'
import { baseSize, white } from '../utils/constants'

/**
 * Components
 */
import SubmitButton from './SubmitButton'

class DeckForm extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      deckKey: null,
      title: null
    }
  }

  handleChange = (title) => {
    const deckKey = title.replace(/[^A-Za-z0-9]/ig, '')

    this.setState({ deckKey, title })
  }

  handleSubmit = () => {
    const { deckKey, title } = this.state

    saveDeckTitle({ deckKey, title })
    this.props.navigation.navigate('Deck', { deckKey })
  }

  render() {
    const { title } = this.state

    return (
      <KeyboardAvoidingView style={styles.deckForm}>
        <TextInput onChangeText={(text) => this.handleChange(text)} defaultValue='Deck Title' value={title} style={styles.deckFormTextInput} />
        <SubmitButton text='Create Deck' onPress={this.handleSubmit} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  deckForm: {
    flex: 1,
    justifyContent: 'center',
    padding: baseSize
  },
  deckFormTextInput: {
    padding: baseSize,
    backgroundColor: white,
    fontSize: baseSize
  }
})

export default DeckForm
