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

export const getDeck = ({ deckKey }) => (
  AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results)
      return decks[deckKey]
    })
)

export const saveDeckTitle = ({ deckKey, title }) => (
  AsyncStorage.mergeItem(MOBILE_FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [deckKey]: {
      title,
      cards: []
    }
  }))
)

export const addCardToDeck = ({ key, question, answer }) => (
  key
)
