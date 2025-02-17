import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MainTabNav} from '.';
import {CustomDrawer} from '../components';
const Drawer = createDrawerNavigator();

function DrawerStackNav() {
  return (
    <Drawer.Navigator
      // edgeWidth={100}
      gestureEnabled
      // swipeEnabled={false}
      screenOptions={{
        headerShown: false,
        drawerStyle: {backgroundColor: 'transparent'},
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      {/* <Drawer.Screen name="SetupProfile" component={SetupProfile} /> */}
    </Drawer.Navigator>
  );
}

export default DrawerStackNav;
