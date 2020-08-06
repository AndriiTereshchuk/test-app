// @flow
import axios from 'axios';
import { api } from '../constans';
import { getToken } from './500pxAPI';
import getAuthHeaders from './getAuthHeaders'

axios.defaults.baseURL = api.API_ENDPOINT;

axios.interceptors.response.use(
    r => r,
    err => {
        return new Promise( async (res, rej) => {
            const originalReq = err.config;
            if (err.response.status === 401) {
                try {
                    await getToken();
                    const headers = await getAuthHeaders();
                    originalReq.headers = {
                        ...originalReq.headers,
                        ...headers,
                    }
                    const data = await axios(originalReq);
                    res(data);
                } catch (e) {
                    rej(e);
                }
            }
            rej(err);
        })
    }
)


async function dataAction(
    method: string,
    url: string,
    data: any = null,
    headers: Object = {},
    params: Object = {},
    authHeader: boolean = true
): Promise<any> {
    const Headers = authHeader ? await getAuthHeaders(): {};
    const options = {
        method,
        url,
        params,
        data: method === 'put' || method === 'post' || method === 'path' || method === 'patch' ? data : null,
        headers: Object.assign({}, authHeader ? Headers : {}, headers),
    };
    return axios(options)
        .then(response => Promise.resolve(response))
        .catch(err => Promise.reject(err));
}

export function getDataAction(
    url: string,
    data: any = null,
    headers: Object = {},
    params: Object = {},
    authHeader: boolean = true
): Promise<any> {
    return dataAction('get', url, data, headers, params, authHeader);
}

export function postDataAction(
    url: string,
    data: any = null,
    headers: Object = {},
    params: Object = {},
    authHeader: boolean = true
) {
    return dataAction('post', url, data, headers, params, authHeader);
}
