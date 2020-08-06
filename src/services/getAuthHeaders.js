import AsyncStorage from '@react-native-community/async-storage';

import { storageKeys } from '../constans';

export default async function f() {
    try {
        const token = await AsyncStorage.getItem(storageKeys.tokenAccess);
        return Promise.resolve({Authorization: `Bearer ${token}`})
    } catch (e) {
        return Promise.reject({})
    }
}