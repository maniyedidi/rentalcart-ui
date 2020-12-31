import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { HTML } from "./html";

const Payment = props => {
  const PaymentHTML = require("../../htmls/payment.html");
  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html: HTML }}
      style={{ marginTop: 40 }}
    />
  );
};

export default Payment;
