import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { SideMenuStyles } from "./SideMenu.style";
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
import { getShopdetails } from "../../redux/actions";
class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectednav: RIGHT_MENU[1],
      shopDetails: {}
    };
  }
  componentDidMount() {
    // this.props.getShopDetails();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.shopDetails &&
      nextProps.shopDetails.name &&
      nextProps.shopDetails.name !== this.state.shopDetails.name
    ) {
      this.setState({
        shopDetails: nextProps.shopDetails
      });
    }
  }

  navigateToScreen = menu => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: menu.title
    });
    this.setState({
      selectednav: menu
    });
    this.props.navigation.dispatch(navigateAction);
  };

  logOut = () => {
    AsyncStorage.clear().then(() => {
      const navigateAction = NavigationActions.navigate({
        routeName: "Login"
      });
      this.props.navigation.dispatch(navigateAction);
    });
  };

  render() {
    const { selectednav } = this.state;
    const { shopDetails = {} } = this.props;
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
            <Text style={SideMenuStyles.shopName}>
              {shopDetails.name || ""}
            </Text>
          </View>
        </View>
        <ScrollView>
          <View>
            {RIGHT_MENU.map(menu => {
              return (
                <TouchableOpacity
                  key={menu.title}
                  onPress={this.navigateToScreen(menu)}
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
        <TouchableOpacity onPress={() => this.logOut()}>
          <View style={SideMenuStyles.footerContainer}>
            <Icon name="sign-out" color="#FFF" type="font-awesome" />
            <Text style={SideMenuStyles.logoutBtn}> Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

const mapStateToProps = state => {
  return {
    shopDetails: (state.spidlepos && state.spidlepos.shopDetails) || {}
  };
};
const mapDispatchToProps = dispatch => ({
  getShopDetails: () => dispatch(getShopdetails())
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
