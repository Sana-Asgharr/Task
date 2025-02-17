import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerStackNav} from '.';

import MainTabNav from './MainTabNav';

const Stack = createStackNavigator();
function MainStackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name="AuthLoading" component={AuthLoading} /> */}     
    </Stack.Navigator>
  );
}

export default MainStackNav;
