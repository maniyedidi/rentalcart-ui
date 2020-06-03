import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { Header } from "react-native-elements";
import Products from "../products";
import { homeStyles } from "./styles";
import { appStyles } from "../../appStyles";
import { logout } from "../../utils";

const SetupScreen = props => {
  const navigation = props.navigation;

  const goToCreateItems = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("CreateProduct")}>
        <FontAwesome5
          color="#fff"
          name="plus-square"
          size={24}
          type="font-awesome"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={homeStyles.homeContainer}>
      <Header
        backgroundColor="#3D6CB9"
        placement="right"
        leftComponent={{ text: "Setup", style: appStyles.headerTitle }}
        centerComponent={goToCreateItems()}
        rightComponent={
          <FontAwesome5
            name="sign-out-alt"
            size={25}
            color="white"
            onPress={() => logout(navigation)}
          />
        }
      />
      <View style={{ flex: 9 }}>
        <Products />
      </View>
    </View>
  );
};

export default SetupScreen;
