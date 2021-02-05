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

  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }

    requestUserPermission()
  }, [])

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Routes />
    </NavigationContainer>
  );
};

export default App;
