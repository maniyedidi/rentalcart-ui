import React, { useState, useEffect } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { Button, Header, Card } from "react-native-elements";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../../constants/endpoints";
import { storeData, retrieveData } from "../../services/storage.service";
import Loader from "../../shared-components/loader";
import { authHeader } from "../../utils";
import { RIGHT_MENU } from "../../constants";
import { appStyles } from "../../appStyles";
const Login = props => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(true);
  const [erroFlag, setErroFlag] = useState(false);
  const [errorMsg, setErrorMessage] = useState("");

  useEffect(() => {
    _bootstrapAsync();
  }, []);

  const _bootstrapAsync = async () => {
    const loginToken = await authHeader();
    if (loginToken) {
      props.navigation.navigate(RIGHT_MENU[0].title);
      setLoggingIn(false);
    } else {
      setLoggingIn(false);
    }
  };

  const loginApp = () => {
    if (!username || !password) {
      setErrorMessage("Please enter login details");
      return;
    }
    let reqBody = {
      email: username,
      password: password
    };
    const headers = { "Content-Type": "application/json" };
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(reqBody)
    };
    setLoggingIn(true);

    fetch(`${DOMAIN_NAME}${SHOP_ENDPOINTS.LOGIN}`, requestOptions)
      .then(handleResponse)
      .then(user => {
        storeData("user", user).then(token => {
          props.navigation.navigate("Sell");
          setLoggingIn(false);
        });
      })
      .catch(() => setLoggingIn(false));
  };

  const handleResponse = response => {
    if (response.status === 401) {
      setErroFlag(true);
    }
    if (response.status === 404) {
      setErroFlag(true);
      setErrorMessage("Invalid username and password")
    }
    if (response.status === 403) {
      setErroFlag(true);
      setErrorMessage("Your email id is not verified")
    }
    return response.json();
  };

  return loggingIn ? (
    <Loader />
  ) : (
    <View>
      <Header
        backgroundColor="#3D6CB9"
        placement="left"
        leftComponent={{
          text: "Rentalcart",
          style: { color: "#fff", fontSize:16 }
        }}
      />
      <Card>
        <TextInput
          style={appStyles.input}
          placeholder="Username"
          name="username"
          onChangeText={value => setUserName(value)}
          value={username}
        />
        <TextInput
          style={appStyles.input}
          placeholder="Password"
          name="password"
          secureTextEntry={true}
          onChangeText={value => setPassword(value)}
          value={password}
        />
        <View style={{ margin: 7 }} />
        <Button
          buttonStyle={appStyles.primarybtn}
          onPress={loginApp}
          title="Login"
        />
        <Text style={{ color: "red" }}>{errorMsg}</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("SignupScreen")}
        >
          <Text style={appStyles.link}>Create an account for login</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default Login;
