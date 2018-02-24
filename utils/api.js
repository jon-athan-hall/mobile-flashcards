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

export const getDeck = ({ title }) => (
  AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results)
      return decks[title]
    })
)

export const saveDeckTitle = ({ title }) => (
  title
)

export const addCardToDeck = ({ title, question, answer }) => (
  title
)
