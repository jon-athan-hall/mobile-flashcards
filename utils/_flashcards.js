/**
 * React Native
 */
import { AsyncStorage } from 'react-native'

export const MOBILE_FLASHCARDS_STORAGE_KEY = 'MobileFlashcards:flashcards' 

const setDummyData = () => {
  const dummyData  = {
    Agricola: {
      title: 'Agricola',
      cards: [
        {
          question: 'How much food does the first player start with?',
          answer: 'Zero.'
        },
        {
          question: 'What does the arrow mean on certain action spaces?',
          answer: 'Resources added during the preparation phase are cumulative.'
        }
      ]
    },
    TheCastlesOfBurgundy: {
      title: 'The Castles of Burgundy',
      cards: [
        {
          question: 'How many total knowledge tiles are there?',
          answer: 'Twenty six.'
        }
      ]
    }
  }

  AsyncStorage.setItem(MOBILE_FLASHCARDS_STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}

export const formatFlashcardsResults = (results) => {
  //AsyncStorage.removeItem(MOBILE_FLASHCARDS_STORAGE_KEY)
  return (
    results === null
      ? setDummyData()
      : JSON.parse(results)
  )
}
