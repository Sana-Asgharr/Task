import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import MainStackNav from './MainStackNav'
import Splash from '../screens/Splash'
import AuthStack from './AuthStack'
import { getItem } from '../utils/Functions'
import { useSelector } from 'react-redux'

const SplashStack = createStackNavigator();


const linking = {
  prefixes: ['app://'],
  config: {
    screens: {
      Main: {
        screens: {
          Home: 'home',
          PostDetail: {
            path: 'post/:postId',
          },

        },
      },
    },
  },
}

function RootNav() {
  const [loading, setLoading] = useState(true);
  const [splash, setSplash] = useState(true);
  const { loginUser } = useSelector(state => state.loginUser)
  useEffect(() => {
    const interval = setInterval(() => setSplash(false), 2000);
    return () => clearInterval(interval);
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      await getItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);


  const renderLoading = () => <Splash />;

  const SplashNavigator = () => (
    <SplashStack.Navigator screenOptions={{ headerShown: false }}>
      <SplashStack.Screen name="splash" component={Splash} />
    </SplashStack.Navigator>
  );

  const renderApp = () => (
    <NavigationContainer linking={linking}>
      <>
        {splash ? (
          <SplashNavigator />
        ) : loginUser?.id ? (
          <MainStackNav />
        ) : (
          <AuthStack />
        )}
      </>
    </NavigationContainer>
  )

  return renderApp();
}

export default RootNav
