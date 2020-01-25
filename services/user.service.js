import { authHeader } from '../helpers';
import { DOMAIN_NAME, SHOP_ENDPOINTS } from '../constants/endpoints';

export const userService = {
    login,
    logout,
    loginWithToken
};

function login(username, password, userPin) {
    let reqBody = {};
    if (userPin) {
        reqBody = {
            "pin": userPin
        }
    } else {
        reqBody = {
            "email": username,
            "password": password,
            pin:'0000'
        }
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
    };

    return fetch(`${DOMAIN_NAME}${SHOP_ENDPOINTS.LOGIN}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.data));
            return user.data;
        });
}

function loginWithToken(token) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
        })
    };

    return fetch(`${DOMAIN_NAME}${SHOP_ENDPOINTS.LOGIN}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.data));
            return user.data;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}