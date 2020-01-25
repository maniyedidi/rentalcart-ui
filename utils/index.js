import { retrieveData } from "../services/storage.service";
import React from 'react';

import { Text, Platform } from 'react-native';
export const authHeader = async () => {
    return retrieveData('user').then((user) => {
        if (user && user !== "undefined") {
            return 'Bearer ' + JSON.parse(user).access_token;
        } else {
            return '';
        }
    });
}

// utils.js
// One Plus Fix for Oxygen OS and its painful Slate font truncating on bold text
// https://github.com/facebook/react-native/issues/15114
export const textCutFix = () => {
    if (Platform.OS !== 'android') {
        return
    }

    const oldRender = Text.render
    Text.render = function (...args) {
        const origin = oldRender.call(this, ...args);
        return React.cloneElement(origin, {
            style: [{ fontFamily: 'Roboto' }, origin.props.style]
        })
    }
}