import { View, Text } from 'react-native'
import React from 'react'
import MainStackNavigator from './src/routers/StackNavigator'
import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import Toast from 'react-native-toast-message';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
const App = () => {
  return (
    <PaperProvider>
      <Provider store={store}>
        <MainStackNavigator />
      </Provider>
      <Toast ref={ref => Toast.setRef(ref)} />
    </PaperProvider>
  )
}

export default App