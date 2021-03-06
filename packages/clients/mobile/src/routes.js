import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/Home'

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ cardStyle: { backgroundColor: 'white' } }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}
