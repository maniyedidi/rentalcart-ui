import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { DOMAIN_NAME, SHOP_ENDPOINTS } from '../constants/endpoints';
import { retrieveData } from './storage.service';
import { invokeApi } from './dataServices';
import { Platform } from 'react-native';


export default async function registerForPushNotificationsAsync() {

    if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('spidleorders', {
            name: 'spidleapp',
            sound: true,
            vibrate: [0, 250, 250, 250],
            priority: 'max',
        });
    }

    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    return retrieveData('user').then((user) => {
        return invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.PUSH_TOKENS}`, 'POST', {
            userid:user.user && user.user._id || "",
            token: token.substring(token.indexOf('[') + 1, token.indexOf(']'))
        });
    })
    // POST the token to your backend server from where you can retrieve it to send push notifications.

}