import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, StyleSheet} from 'react-native';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
      }}>
      {/* <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} /> */}
    </Stack.Navigator>
  );
}

export default HomeStack;
