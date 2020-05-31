import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Header } from "react-native-elements";
import { reportStyles } from "./styles";
import { appStyles } from "../../appStyles";
import { logout } from "../../utils";

const ReportsScreen = props => {
  return (
    <View style={reportStyles.reportContainer}>
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor="#3D6CB9"          
          leftComponent={{ text: "Reports", style: appStyles.headerTitle }}
          rightComponent={
            <FontAwesome5
              name="sign-out-alt"
              size={25}
              color="white"
              onPress={logout}
            />
          }
        />
      </View>

      <View style={{ flex: 9, justifyContent: "center", alignItems: "center" }}>
        <Text style={reportStyles.infomsg}>Only for PRO account</Text>
      </View>
    </View>
  );
};

export default ReportsScreen;
