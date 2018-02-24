/**
 * React Native
 */
import { AsyncStorage } from 'react-native'

/**
 * Utils
 */
import { MOBILE_FLASHCARDS_STORAGE_KEY, formatFlashcardsResults } from './_flashcards'

export const getDecks = () => (
  AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY)
    .then(formatFlashcardsResults)
)

export const getDeck = ({ key }) => (
  AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results)
      return decks[key]
    })
)

export const saveDeckTitle = ({ key }) => (
  key
)

export const addCardToDeck = ({ key, question, answer }) => (
  key
)
