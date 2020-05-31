import React from "react";
import {View,Text} from 'react-native';
import { MenuProvider } from "react-native-popup-menu";
import configureStore from "./redux/store";
const store = configureStore();
import { Provider } from "react-redux";


const App = () => {
  return (
    <MenuProvider>
      <Provider store={store}>
       <View>
         <Text>Hello world</Text>
       </View>
      </Provider>
    </MenuProvider>
  );
};

export default App;
