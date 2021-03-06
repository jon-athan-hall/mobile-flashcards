/**
 * React Native
 */
import React, { Component }             from 'react'
import { View, StatusBar }              from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'

/**
 * Expo
 */
import { Constants }   from 'expo'
import { FontAwesome } from '@expo/vector-icons'

/**
 * Utils
 */
import { white, darkGray, baseSize } from './utils/constants'
import { setLocalNotification }      from './utils/notifications'

/**
 * Components
 */
import DeckList from './components/DeckList'
import DeckForm from './components/DeckForm'
import Deck     from './components/Deck'
import CardForm from './components/CardForm'
import Quiz     from './components/Quiz'

const AppStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

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
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      title: 'Deck',
      headerTitle: navigation.state.params.deckKey,
      headerStyle: {
        backgroundColor: darkGray
      },
      headerTitleStyle: {
        color: white,
        fontSize: baseSize
      },
      headerTintColor: white
    })
  },
  CardForm: {
    screen: CardForm,
    navigationOptions: ({ navigation }) => ({
      title: 'New Card',
      headerStyle: {
        backgroundColor: darkGray
      },
      headerTitleStyle: {
        color: white,
        fontSize: baseSize
      },
      headerTintColor: white
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      title: 'Quiz',
      headerTitle: navigation.state.params.deckKey + ' Quiz',
      headerStyle: {
        backgroundColor: darkGray
      },
      headerTitleStyle: {
        color: white,
        fontSize: baseSize
      },
      headerTintColor: white
    })
  }
})

/**
 * Class Component
 */
class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <AppStatusBar backgroundColor={darkGray} barStyle='light-content' />
        <Navigator />
      </View>
    )
  }
}

export default App
