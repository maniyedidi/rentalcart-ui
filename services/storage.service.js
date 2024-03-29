import { AsyncStorage } from 'react-native';

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(`rentalcartapp:${key}`, JSON.stringify(value));           
    } catch (error) {
        // Error saving data
    }
};


export const  retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(`rentalcartapp:${key}`);
        if (value !== null) {
            // We have data!!         
            return value;
        }
    } catch (error) {
        // Error retrieving data
    }
};