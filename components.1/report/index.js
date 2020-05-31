import React from "react";
import { View, Text } from "react-native";
import { Header } from "react-native-elements";
import MenuIcon from "../../shared-components/header-menu";
import { reportStyles } from "./styles";

const ReportsScreen = props => {
  const navigation = props.navigation;
  constonMenuClick = () => {};

  return (
    <View style={reportStyles.reportContainer}>
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor="#3D6CB9"
          placement="left"
          leftComponent={<MenuIcon navigation={navigation} />}
          centerComponent={{ text: "Reports", style: { color: "#fff" } }}
        />
      </View>

      <View style={{ flex: 9, justifyContent: "center", alignItems: "center" }}>
        <Text style={reportStyles.infomsg}>Only for PRO account</Text>
      </View>
    </View>
  );
};

export default ReportsScreen;
