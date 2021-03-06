import { AppRegistry } from 'react-native';

import messaging from '@react-native-firebase/messaging';

import App from './src/App';
import { name as appName } from './app.json';

messaging().setBackgroundMessageHandler(
  async message => {
    console.log({ message })
  }
)

AppRegistry.registerComponent(appName, () => App);
