import React from "react";
import { View, Text } from "react-native";
import { reportStyles } from "./styles";
import AppHeader from "../../shared-components/header";

const CustomersScreen = props => {
  const navigation = props.navigation;
  return (
    <View style={reportStyles.reportContainer}>
      <View style={{ flex: 1 }}>
        <AppHeader placement="right" navigation={navigation} />
      </View>

      <View style={{ flex: 9, justifyContent: "center", alignItems: "center" }}>
        <Text style={reportStyles.infomsg}>Only for PRO account</Text>
      </View>
    </View>
  );
};

export default CustomersScreen;
