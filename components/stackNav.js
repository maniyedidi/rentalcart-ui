import { createStackNavigator } from "react-navigation";
import OnlineScreen from "./online";
import HomeScreen from "./home";
import ProductsScreen from "./products";
import Login from "./login";
import ProductDetails from "./productdetails";
import AuthLoadingScreen from "./auth-loading-screen";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Online: {
    screen: OnlineScreen,
    navigationOptions: {
      header: null
    }
  },
  Products: {
    screen: ProductsScreen,
    navigationOptions: {
      header: null
    }
  },
  ProductDetails: {
    screen: ProductDetails,
    navigationOptions: () => ({
      title: "Order Detail"
    })
  }
});
const AuthStack = createStackNavigator({
  Login: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  }
});

const stackNav = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
export default stackNav;
