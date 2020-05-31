import { retrieveData } from "../services/storage.service";
import React from "react";
import { Text, Platform, AsyncStorage } from "react-native";

export const authHeader = async () => {
  return retrieveData("user").then(user => {
    if (user && user !== "undefined") {
      return "Bearer " + JSON.parse(user).token;
    } else {
      return "";
    }
  });
};

// utils.js
// One Plus Fix for Oxygen OS and its painful Slate font truncating on bold text
// https://github.com/facebook/react-native/issues/15114
export const textCutFix = () => {
  if (Platform.OS !== "android") {
    return;
  }

  const oldRender = Text.render;
  Text.render = function(...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: ["Roboto", origin.props.style]
    });
  };
};

export const viewDateFormat = inputDate => {
  const date = new Date(inputDate);
  return `${appendZero(date.getDate())}/${appendZero(
    date.getMonth() + 1
  )}/${date.getFullYear()}`;
};

const appendZero = num => {
  if (num < 10 && num > 0) {
    return `0${num}`;
  }
  return num;
};

export const viewDateFormat2 = inputDate => {
  if (inputDate) {
    const date = new Date(inputDate).toISOString().slice(0, 10);
    return date;
  }
  return inputDate;
};

export const logout = navigation => {
  AsyncStorage.clear().then(() => {
    navigation.navigate("Login");
  });
};
