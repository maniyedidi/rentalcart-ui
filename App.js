import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { useFonts } from "@use-expo/font";
import configureStore from "./redux/store";
import AppRoutes from "./routes";

const store = configureStore();

import { Provider } from "react-redux";
import Loader from "./shared-components/loader";
import { textCutFix } from "./utils";

const App = () => {
  let [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf")
  });

  useEffect(() => {
    textCutFix();
  }, []);

  if (!fontsLoaded) {
    return <Loader />;
  } else {
    return (
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    );
  }
};

export default App;
