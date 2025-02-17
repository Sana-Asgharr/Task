import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashOne from '../screens/newauthscreens/SplashScreens/SplashOne';
import SplashTwo from '../screens/newauthscreens/SplashScreens/SplashTwo';
import SignIn from '../screens/newauthscreens/LoginScreen/SignIn';
import SignUp from '../screens/newauthscreens/LoginScreen/SignUp';
import { CardStyleInterpolators } from '@react-navigation/stack';


const Stack = createStackNavigator();


const MainStackNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardStyle: { backgroundColor: 'white' },
        headerMode: 'screen',
        headerBackTitle: ' ',
      }}>
        <Stack.Screen name='SplashOne' component={SplashOne} />
        <Stack.Screen name='SplashTwo' component={SplashTwo} />
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='SignUp' component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
