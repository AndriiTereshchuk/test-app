import AsyncStorage from '@react-native-community/async-storage';

import { api, storageKeys } from '../constans';
import { getDataAction, postDataAction } from './API';

export async function getToken() {
    try {
        const res = await postDataAction('/auth', {apiKey: api.API_KEY}, {}, {}, false);
        if (res.data.auth) {
            AsyncStorage.setItem(storageKeys.tokenAccess, res.data.token)
            return res.data.token
        }
        return data
    } catch (e) {
        return Promise.reject(e)
    }
}

export async function getPictures (page: number = 1): Array<Object> {
    const url = `/images?page=${page}`;
    try {
        const data = await getDataAction(url)
        console.log(data, 'getPictures')
        return Promise.resolve(data.data)
    } catch (e) {
        console.dir(e)
        return Promise.reject(e)
    }
}

export async function getPictureDetails (id: number): Object {
    const url = `/images/${id}`
    // "f31cac1e86ed7f2a9e2a7356dc10507271d1ac7d"
    try {
        const data = await getDataAction(url);
        console.log(data, 'getPictureDetails')
        return Promise.resolve(data.data)
    } catch (e) {
        console.dir(e)
        return Promise.reject(e)
    }
}
