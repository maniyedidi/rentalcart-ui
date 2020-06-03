import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { reportStyles } from "./styles";
import { logout } from "../../utils";
import AppHeader from "../../shared-components/header";

const ReportsScreen = props => {
  const navigation = props.navigation;

  return (
    <View style={reportStyles.reportContainer}>
      <AppHeader placement="right" navigation={navigation} />

      <View style={{ flex: 9, justifyContent: "center", alignItems: "center" }}>
        <Text style={reportStyles.infomsg}>Only for PRO account</Text>
      </View>
    </View>
  );
};

export default ReportsScreen;
