import React, { useState } from "react";
import { SideMenuStyles } from "./style";
import { NavigationActions } from "react-navigation";
import {
  ScrollView,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { RIGHT_MENU } from "../../constants";
import { Icon } from "react-native-elements";
import { Avatar } from "react-native-elements";

const SideMenu = props => {
  const [selectednav, setSelectednav] = useState(RIGHT_MENU[1]);
  const [shopDetails, setShopDetails] = useState({});

  const navigateToScreen = menu => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: menu.title
    });
    setSelectednav(menu);
    props.navigation.dispatch(navigateAction);
  };

  const logOut = () => {
    AsyncStorage.clear().then(() => {
      const navigateAction = NavigationActions.navigate({
        routeName: "Login"
      });
      props.navigation.dispatch(navigateAction);
    });
  };

  return (
    <View style={SideMenuStyles.container}>
      <View
        style={{
          height: 60
        }}
      >
        <View style={SideMenuStyles.avatorContainer}>
          <Avatar
            size="medium"
            rounded
            title={(shopDetails.name || "").substring(0, 1)}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
          <Text style={SideMenuStyles.shopName}>{shopDetails.name || ""}</Text>
        </View>
      </View>
      <ScrollView>
        <View>
          {RIGHT_MENU.map(menu => {
            return (
              <TouchableOpacity
                key={menu.title}
                onPress={navigateToScreen(menu)}
              >
                <Text
                  style={
                    selectednav.title === menu.title
                      ? SideMenuStyles.selectedNavStyle
                      : SideMenuStyles.sectionHeadingStyle
                  }
                >
                  {menu.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={logOut}>
        <View style={SideMenuStyles.footerContainer}>
          <Icon name="sign-out" color="#FFF" type="font-awesome" />
          <Text style={SideMenuStyles.logoutBtn}> Logout</Text>
        </View>
      </TouchableOpacity>
      <View style={SideMenuStyles.version}>
        <Text>V1.0.0</Text>
      </View>
    </View>
  );
};

export default SideMenu;
