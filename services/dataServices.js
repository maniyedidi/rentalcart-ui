
import { authHeader } from '../utils';

export const invokeApi = async (url, method, data, params, headers) => {
    let token = await authHeader();
    headers = new Headers({
        ['Content-Type']: 'application/json',
        Authorization: token || ''
    })
    return fetch(url, { method: method, body: JSON.stringify(data), headers: headers })
        .then(response => {
            if (response.ok && response.status === 500) {
                console.log("error api " + response);
            }
            return response.json();
        });
}