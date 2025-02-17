import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging"
import { registerDevice } from "../api/auth";
import { Platform } from "react-native";


export const setItem = async (key, value) => {
  try {
    if (typeof value === 'object') {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } else {
      await AsyncStorage.setItem(key, value);
      return true;
    }
  } catch (e) {
    return false;
  }
};

export const getItem = async key => {
  try {
    if (typeof value === 'object') {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } else {
      const value = await AsyncStorage.getItem(key);
      return value ? value : null;
    }
  } catch (e) {
    console.log('AsyncStorage getting error', e);
  }
};

async function registerAppWithFCM(user) {
  await messaging().deleteToken()
  const token = await messaging().getToken()
  const tokenA = await getItem("token")
  await messaging().registerDeviceForRemoteMessages()
  const payload = {
    name: user?.name,
    registration_id: token,
    device_id: token,
    active: true,
    type: Platform.OS
  }
  await registerDevice(payload, tokenA)
}

export const requestUserPermission = async (user) => {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    registerAppWithFCM(user)
  }
}