import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const MenuIcon = props => {
  return (
    <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
      <View>
        <Icon name="bars" size={25} type="font-awesome" color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default MenuIcon;
