import AsyncStorage from '@react-native-async-storage/async-storage'
import { registerDevice } from '../api/auth'
import messaging from '@react-native-firebase/messaging';
// import Toast from 'react-native-simple-toast'
import {Platform} from 'react-native';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.info('Authorization status:', authStatus);
  }
  return authStatus;
}

const GetFCMToken = async doTask => {
  const isAuthorised = await requestUserPermission();
  const userUID = await AsyncStorage.getItem('token');
  console.info('isAuthorised:', typeof isAuthorised, 'userUID:', userUID);
  if (isAuthorised === 1) {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    console.info('Old FCM Token:', fcmtoken);
    if (!fcmtoken) {
      try {
        const token = await messaging().getToken();
        console.info('New FCM Token:', token);

        if (token) {
          await AsyncStorage.setItem('fcmtoken', token);

          const data = {
            registration_id: token,
            type: Platform.OS,
          };

          await registerDevice(data, userUID);
          console.info('Device registered successfully.');
        }
      } catch (error) {
        console.error('Error getting FCM token:', error);
      }
    }
    NotificationListner(doTask);
  }

  messaging().onTokenRefresh(async token => {
    console.info('Token refreshed:', token);
    await AsyncStorage.setItem('fcmtoken', token);

    const data = {
      registration_id: token,
      type: Platform.OS,
    };

    try {
      await registerDevice(data, userUID);
      console.info('Device re-registered on token refresh.');
    } catch (error) {
      console.error('Error re-registering device:', error);
    }
  });
};

const NotificationListner = doTask => {
  // messaging().setBackgroundMessageHandler(() => Promise.resolve());

  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage) {
      // Toast.show(`${}: ${info}`)
    // Toast.show(`${remoteMessage?.notification?.title}: ${remoteMessage?.notification?.body}`)
      console.info(
        'Notification caused app to open from background state:',
        remoteMessage?.notification,
        remoteMessage?.data,
      );
      doTask(remoteMessage?.data, remoteMessage?.notification);
    }
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
    // Toast.show(`${remoteMessage?.notification?.title}: ${remoteMessage?.notification?.body}`)
        console.info(
          'Notification caused app to open from quit state:',
          remoteMessage?.notification,
          remoteMessage?.data,
        );
        doTask(remoteMessage?.data, remoteMessage?.notification);
      }
    });
  messaging().onMessage(async remoteMessage => {
    // Toast.show(`${remoteMessage?.notification?.title}: ${remoteMessage?.notification?.body}`)
    console.info('all info', remoteMessage.notification, remoteMessage.data);
  });
};

export {requestUserPermission, GetFCMToken, NotificationListner};
