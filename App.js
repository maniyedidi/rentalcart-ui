import React, { Component } from "react";
import { Dimensions } from "react-native";
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import SideMenu from "./components/sidemenu/SideMenu";
import stackNav from "./components/stackNav";
import { MenuProvider } from "react-native-popup-menu";
import { textCutFix } from "./utils";
import configureStore from "./redux/store";
const store = configureStore();
import { Provider } from "react-redux";

const drawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: stackNav
    }
  },
  {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get("window").width - 150
  }
);

const AppContainer = createAppContainer(drawerNavigator);
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    textCutFix();
  }

  render() {
    return (
      <MenuProvider>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </MenuProvider>
    );
  }
}
