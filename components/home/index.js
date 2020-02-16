import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Header, Icon } from "react-native-elements";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import Products from "../products";
import { homeStyles } from "./styles";
import MenuIcon from "../../shared-components/header-menu";

const HomeScreen = props => {
  const navigation = props.navigation;
  constonMenuClick = () => {};

  const productsMenuComponent = () => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <Menu>
          <MenuTrigger>
            <View>
              <Icon
                color="#fff"
                name="plus-square"
                size={30}
                type="font-awesome"
              />
            </View>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => navigation.navigate("CreateProduct")}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", paddingLeft: 5 }}
                >
                  Create Items
                </Text>
              </View>
            </MenuOption>
            <MenuOption onSelect={() => navigation.navigate("CreateCategory")}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", paddingLeft: 5 }}
                >
                  Create Category
                </Text>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </TouchableOpacity>
    );
  };

  const goToCreateItems = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("CreateProduct")}>
        <Icon color="#fff" name="plus-square" size={30} type="font-awesome" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={homeStyles.homeContainer}>
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor="#3D6CB9"
          placement="left"
          leftComponent={<MenuIcon navigation={navigation} />}
          centerComponent={{ text: "Home", style: { color: "#fff" } }}
          rightComponent={goToCreateItems()}
        />
      </View>

      <View style={{ flex: 9 }}>
        <Products />
      </View>
    </View>
  );
};

export default HomeScreen;
