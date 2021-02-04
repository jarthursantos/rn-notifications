import React, { useEffect } from 'react';
import { Alert, View, Text, StatusBar } from 'react-native';
import messaging from '@react-native-firebase/messaging';

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
    <React.Fragment>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View>
        <Text>Hello World!</Text>
      </View>
    </React.Fragment>
  );
};

export default App;
