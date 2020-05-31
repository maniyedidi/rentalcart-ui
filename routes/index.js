import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "../components/login";
import SetupScreen from "../components/setup";
import ReportsScreen from "../components/report";
import Orders from "../components/orders";
import Sell from "../components/sell";
import CustomersScreen from "../components/customers";
import CreateProduct from "../components/create-product";
import OrderCart from "../components/order-cart";
import ViewOrder from "../components/view-order";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Sell">
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarLabel: "Orders",
          tabBarIcon: ({ color }) => {
            return <FontAwesome5 name="truck-pickup" size={25} color={color} />;
          }
        }}
      />
      <Tab.Screen
        name="Customers"
        component={CustomersScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="users" size={25} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Sell"
        component={Sell}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="rupee-sign" size={25} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Setup"
        component={SetupScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="cog" size={25} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="receipt" size={25} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Home"
          component={MyTabs}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="CreateProduct" component={CreateProduct} />
        <Stack.Screen name="OrderCart" component={OrderCart} />
        <Stack.Screen
          name="ViewOrder"
          component={ViewOrder}
          options={{
            title: "Order details"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
