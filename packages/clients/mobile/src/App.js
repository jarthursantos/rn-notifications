import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { Alert, StatusBar, Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes'

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(
      async message => {
        Alert.alert('FCM Message', JSON.stringify(message))
      }
    )

    return unsubscribe
  }, [])

  return (
    <NavigationContainer
      linking={{
        prefixes: ['http://www.theveganbakesale.com', 'http://theveganbakesale.com'],
        config: { screens: { Home: '/share' } }
      }}
      fallback={<Text>Loading...</Text>}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Routes />
    </NavigationContainer>
  );
};

export default App;
