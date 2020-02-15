import { createStackNavigator } from "react-navigation";
import OnlineScreen from "./online";
import HomeScreen from "./home";
import Login from "./login";
import ProductDetails from "./productdetails";
import AuthLoadingScreen from "./auth-loading-screen";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Sell from "./sell";
import OrderCart from "./order-cart";
import Orders from "./orders";
import CreateCategory from "./create-category";
import CreateProduct from './create-product';

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
      title: "Order Detail"
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
  Online: {
    screen: OnlineScreen,
    navigationOptions: {
      header: null
    }
  },
  CreateCategory: {
    screen: CreateCategory,
    navigationOptions: {
      header: null
    }
  },
  CreateProduct: {
    screen: CreateProduct,
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
