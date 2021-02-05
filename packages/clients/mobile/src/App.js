import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { Alert, StatusBar } from 'react-native';
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
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Routes />
    </NavigationContainer>
  );
};

export default App;
