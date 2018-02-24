/**
 * React Native
 */
import { AsyncStorage } from 'react-native'

export const MOBILE_FLASHCARDS_STORAGE_KEY = 'MobileFlashcards:flashcards' 

const setDummyData = () => {
  const dummyData  = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

  AsyncStorage.setItem(MOBILE_FLASHCARDS_STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}

export const formatFlashcardsResults = (results) => {
  return (
    results === null
      ? setDummyData()
      : JSON.parse(results)
  )
}
