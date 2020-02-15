import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { appStyles } from "../../appStyles";
import { headerStyles } from "./headerStyles";

const HeaderMenu = (props) => {
  return (
    <View style={headerStyles.headerBar}>
      <View style={headerStyles.menuIcon}>
        <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <View>
            <Icon name="bars" size={25} type="font-awesome" color="white" />
          </View>
        </TouchableOpacity>        
      </View>
    </View>
  );
};

export default HeaderMenu;
