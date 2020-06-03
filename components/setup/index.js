import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import Products from "../products";
import { homeStyles } from "./styles";
import { logout } from "../../utils";
import AppHeader from "../../shared-components/header";

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
      <AppHeader
        navigation={navigation}
        placement="right"
        centerComponent={goToCreateItems()}
      />
      <View style={{ flex: 9 }}>
        <Products />
      </View>
    </View>
  );
};

export default SetupScreen;
