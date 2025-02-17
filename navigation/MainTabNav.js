import React, {useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import WorldGlobe from '../screens/SearchMap/customGlobe';
import {useDispatch} from 'react-redux';
import {numberToScrollFun} from '../store/user/userSlice';
import HomeStack from './HomeStack';

// assets
import HomeIcon from '../assets/svg/tabs/Home.svg';
import HomeFillIcon from '../assets/svg/tabs/HomeFill.svg';
import NavigationIcon from '../assets/svg/tabs/Navigation.svg';
import NavigationFillIcon from '../assets/svg/tabs/NavigationFill.svg';
import ProfileIcon from '../assets/svg/userBlack.svg';
import ProfileFillIcon from '../assets/svg/userFillRed.svg';
import OrderIcon from '../assets/svg/tabs/Orders.svg';
import OrderFillIcon from '../assets/svg/tabs/orderFill.svg';
import AddFill from '../assets/svg/tabs/AddFill.svg';
import Add from '../assets/svg/tabs/Add.svg';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
      }}>
    <></>
    </Stack.Navigator>
  );
}
function CookbookStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
      }}>
     <></>
    </Stack.Navigator>
  );
}
function GlobeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
      }}>
      <Stack.Screen name="WorldGlobe" component={WorldGlobe} />
    </Stack.Navigator>
  );
}



function MainTabNav({navigation}) {
  const [isCreatePost, setIsCreatePost] = useState(false);
  const tabConfig = [
    {
      name: 'home',
      component: HomeStack,
      focusedIcon: (
        <View style={styles.activeIconContainer}>
          <HomeFillIcon width={24} height={24} style={{opacity: 1}} />
        </View>
      ),
      defaultIcon: (
        <View style={styles.defaultIcon}>
          <HomeIcon width={24} height={24} style={{opacity: 0.8}} />
        </View>
      ),
    },
    {
      name: 'Navigation',
      component: GlobeStack,
      focusedIcon: (
        <View style={styles.activeIconContainer}>
          <NavigationFillIcon width={24} height={24} style={{opacity: 1}} />
        </View>
      ),
      defaultIcon: (
        <View style={[styles.defaultIcon, {}]}>
          <NavigationIcon width={24} height={24} style={{opacity: 0.8}} />
        </View>
      ),
    },
  ];

  const tabConfig1 = [
    {
      name: 'Cookbook',
      component: CookbookStack,
      focusedIcon: (
        <View style={styles.activeIconContainer}>
          <OrderFillIcon width={24} height={24} style={{opacity: 1}} />
        </View>
      ),
      defaultIcon: (
        <View style={[styles.defaultIcon, {}]}>
          <OrderIcon width={24} height={24} style={{opacity: 0.8}} />
        </View>
      ),
    },
    {
      name: 'Profile',
      component: ProfileStack,
      focusedIcon: (
        <View style={styles.activeIconContainer}>
          <ProfileFillIcon width={24} height={24} style={{opacity: 1}} />
        </View>
      ),
      defaultIcon: (
        <View style={styles.defaultIcon}>
          <ProfileIcon width={24} height={24} style={{opacity: 0.8}} />
        </View>
      ),
    },
  ];

  const TabBarIcon = ({route, focused}) => {
    const tab =
      tabConfig.find(tab => tab.name === route.name) ||
      tabConfig1.find(tab1 => tab1.name === route.name);

    if (!tab) {
      return null;
    }
    return <>{focused ? tab.focusedIcon : tab.defaultIcon}</>;
  };

  const dispatch = useDispatch();
  const handleHomeTabPress = () => {
    dispatch(numberToScrollFun());
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={({route}) => ({
          tabBarPressColor: 'none',
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 50 : 64,
            backgroundColor: '#FFFFFF',
            borderTopColor: '#FFFFFF',
            borderTopWidth: 1,
          },
          tabBarIconStyle: {
            alignContent: 'center',
            top: 10,
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarButton: [
            'home',
            'Navigation',
            'CreatePost',
            'Cookbook',
            'Profile',
          ].includes(route.name)
            ? undefined
            : () => {
                return null;
              },
          tabBarIcon: ({focused}) => (
            <TabBarIcon route={route} focused={focused} />
          ),
          // tabBarIndicatorStyle: { display: 'none' },
        })}>
        {tabConfig.map(tab => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            listeners={{
              tabPress: e => {
                if (tab.name === 'home') {
                  handleHomeTabPress();
                }
              },
            }}
          />
        ))}

        <Tab.Screen
          name="CreatePost"
          component={() => null}
          listeners={{
            tabPress: e => {
              e.preventDefault(); // Prevent navigation
              setIsCreatePost(true); // Open modal
            },
          }}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <AddFill width={40} height={40} style={{opacity: 1}} />
              ) : (
                <Add width={40} height={40} style={{opacity: 0.8}} />
              ),
          }}
        />

        {tabConfig1.map(tab1 => (
          <Tab.Screen
            key={tab1.name}
            name={tab1.name}
            component={tab1.component}
          />
        ))}
      </Tab.Navigator>

    </>
  );
}

const styles = StyleSheet.create({
  activeIconContainer: {
    width: 84,
    alignItems: 'center',
    height: 49,
    borderRadius: 24,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  defaultIcon: {
    width: 55,
    alignItems: 'center',
    height: 55,
    justifyContent: 'center',
  },
});
export default MainTabNav;
