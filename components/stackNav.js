import { createStackNavigator } from "react-navigation";
import HomeScreen from "./home";
import Login from "./login";
import AuthLoadingScreen from "./auth-loading-screen";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Sell from "./sell";
import OrderCart from "./order-cart";
import Orders from "./orders";
import CreateCategory from "./create-category";
import CreateProduct from "./create-product";
import Singup from "./signup";

const AppStack = createStackNavigator({
  Sell: {
    screen: Sell,
    navigationOptions: {
      header: null
    }
  },
  OrderCart: {
    screen: OrderCart,
    navigationOptions: () => ({
      title: "Order Detail",
      headerStyle: {
        backgroundColor: "#3D6CB9"
      },
      headerTintColor: "#fff"
    })
  },
  Orders: {
    screen: Orders,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  CreateCategory: {
    screen: CreateCategory,
    navigationOptions: () => ({
      title: "Create category",
      headerStyle: {
        backgroundColor: "#3D6CB9"
      },
      headerTintColor: "#fff"
    })
  },
  CreateProduct: {
    screen: CreateProduct,
    navigationOptions: () => ({
      title: "Create item",
      headerStyle: {
        backgroundColor: "#3D6CB9"
      },
      headerTintColor: "#fff"
    })
  },
  SignupScreen: {
    screen: Singup,
    navigationOptions: {
      header: null
    }
  }
});
const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
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
