import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { reportStyles } from "./styles";
import AppHeader from "../../shared-components/header";

const ReportsScreen = props => {
  const navigation = props.navigation;

  return (
    <View style={reportStyles.reportContainer}>
      <AppHeader placement="right" navigation={navigation} />

      <View style={{ flex: 9, justifyContent: "center", alignItems: "center" }}>
        <TouchableHighlight
          // onPress={() => {
          //   console.log("we are here");

          //   navigation.navigate("Payment");
          // }}
        >
          <Text style={reportStyles.infomsg}>Only for PRO account</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ReportsScreen;
