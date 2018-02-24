/**
 * React Native
 */
import React, { Component }             from 'react'
import { View }                         from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome }                  from '@expo/vector-icons'

/**
 * Utils
 */
import { white, darkGray }              from './utils/colors'

/**
 * Components
 */
import DeckList from './components/DeckList'
import DeckForm from './components/DeckForm'
import Quiz     from './components/Quiz'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'My Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='th-large' size={24} color={tintColor} />
    }
  },
  DeckForm: {
    screen: DeckForm,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus' size={24} color={tintColor} />
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      tabBarLabel: 'Quiz Me',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='question' size={24} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: darkGray,
    style: {
      backgroundColor: white
    }
  }
})

const Navigator = StackNavigator({
  Home: {
    screen: Tabs
  }
})

class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Navigator />
      </View>
    )
  }
}

export default App
