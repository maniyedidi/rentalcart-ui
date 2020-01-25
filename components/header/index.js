import PropTypes from "prop-types";
import React, { Component } from "react";
import { Text, View, TouchableOpacity, Switch } from "react-native";
import { Input, Icon } from "react-native-elements";
import { appStyles } from "../../appStyles";
import { headerStyles } from "./headerStyles";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

export const ToggleOnlineComponent = ({ toggleOnline, onlineStatus }) => {
  return (
    <View>
      <Menu>
        <MenuTrigger>
          <View>
            <Icon name="cog" size={25} type="font-awesome" />
          </View>
        </MenuTrigger>
        <MenuOptions>
          {Object.keys(onlineStatus).map(key => {
            return (
              <MenuOption key={key}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ textTransform: "capitalize" }}>{key}</Text>
                  <Switch
                    trackColor={{ true: "#ED193A", false: "grey" }}
                    thumbColor="white"
                    value={onlineStatus[key]}
                    onValueChange={() =>
                      toggleOnline(
                        onlineStatus[key] ? "disable" : "enable",
                        key
                      )
                    }
                  />
                </View>
              </MenuOption>
            );
          })}
        </MenuOptions>
      </Menu>
    </View>
  );
};

class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSearchInput: false
    };
  }

  render() {
    const {
      searchKey,
      onSearch,
      navigation,
      title,
      showSearch,
      showEllipsis,
      onlineStatus,
      toggleOnline
    } = this.props;
    const { openSearchInput } = this.state;
    return (
      <View style={headerStyles.headerBar}>
        <View style={headerStyles.menuIcon}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <View>
              <Icon name="bars" size={25} type="font-awesome" />
            </View>
          </TouchableOpacity>
          {openSearchInput ? (
            <Input
              onChangeText={data => onSearch(data)}
              placeholder="search"
              value={searchKey}
              leftIcon={
                <TouchableOpacity
                  onPress={() => {
                    onSearch("");
                    this.setState({ openSearchInput: false });
                  }}
                >
                  <View>
                    <Icon
                      name="chevron-right"
                      size={25}
                      color="black"
                      type="font-awesome"
                    />
                  </View>
                </TouchableOpacity>
              }
            />
          ) : (
            <Text style={appStyles.headerTitle}>{title}</Text>
          )}
        </View>
        <View style={{ flexDirection: "row" }}>
          {showSearch && (
            <TouchableOpacity
              onPress={() => this.setState({ openSearchInput: true })}
            >
              <View style={{ marginRight: 20 }}>
                <Icon name="search" size={25} type="font-awesome" />
              </View>
            </TouchableOpacity>
          )}
          {showEllipsis && (
            <ToggleOnlineComponent
              onlineStatus={onlineStatus}
              toggleOnline={toggleOnline}
            />
          )}
        </View>
      </View>
    );
  }
}

HeaderBar.propTypes = {
  navigation: PropTypes.object
};

export default HeaderBar;
