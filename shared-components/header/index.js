import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Header } from "react-native-elements";
import { appStyles } from "../../appStyles";
import { logout } from "../../utils";

const AppHeader = ({ centerComponent, title, placement, navigation }) => {
  return (
    <Header
      backgroundColor="#3D6CB9"
      placement={placement}
      leftComponent={{ text: "Rentalcart", style: appStyles.headerTitle }}
      centerComponent={centerComponent}
      rightComponent={
        <FontAwesome5
          name="sign-out-alt"
          size={25}
          color="white"
          onPress={() => logout(navigation)}
        />
      }
    />
  );
};

export default AppHeader;
