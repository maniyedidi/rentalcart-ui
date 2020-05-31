import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./home";
import Login from "./login";
import AuthLoadingScreen from "./auth-loading-screen";
import Sell from "./sell";
import OrderCart from "./order-cart";
import Orders from "./orders";
import CreateCategory from "./create-category";
import CreateProduct from "./create-product";
import Singup from "./signup";
import ReportsScreen from "./report";
import ViewOrder from "./view-order";
import { createSwitchNavigator,createAppContainer } from "react-navigation";

const AppStack = createStackNavigator({
  Sell: {
    screen: Sell,
    navigationOptions: {
       headerShown:false
    }
  },
  OrderCart: {
    screen: OrderCart,
    navigationOptions: () => ({
      title: "Order Cart",
      headerStyle: {
        backgroundColor: "#3D6CB9"
      },
      headerTintColor: "#fff"
    })
  },
  Orders: {
    screen: Orders,
    navigationOptions: {
       headerShown:false
    }
  },
  ViewOrder: {
    screen: ViewOrder,
    navigationOptions: () => ({
      title: "Order Detail",
      headerStyle: {
        backgroundColor: "#3D6CB9"
      },
      headerTintColor: "#fff"
    })
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
       headerShown:false
    }
  },
  Reports: {
    screen: ReportsScreen,
    navigationOptions: {
       headerShown:false
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
       headerShown:false
    }
  }
});

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown:false
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
