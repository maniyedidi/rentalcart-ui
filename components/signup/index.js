import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { Button, Header, Card } from "react-native-elements";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../../constants/endpoints";
import Loader from "../../shared-components/loader";
import { appStyles } from "../../appStyles";

const Singup = props => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shopName, setShopname] = useState("");

  const [loggingIn, setLoggingIn] = useState(false);
  const [erroFlag, setErroFlag] = useState(false);
  const [errorMsg, setErrorMessage] = useState("");
  const [accountFlag, setAccountFlag] = useState(false);

  const createUser = () => {
    let reqBody = {
      userId: Date.now().toString(),
      firstName: firstName,
      lastName: lastName,
      contact: contact,
      email: email,
      password: password,
      accountType: "USER",
      shopName: shopName
    };
    const headers = { "Content-Type": "application/json" };
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(reqBody)
    };
    setLoggingIn(true);

    fetch(`${DOMAIN_NAME}${SHOP_ENDPOINTS.CREATE_USER}`, requestOptions)
      .then(handleResponse)
      .then(response => {
        console.log(response);
        if (response.msg) {
          setAccountFlag(true);
          setLoggingIn(false);
        }
      })
      .catch(() => setLoggingIn(false));
  };

  const handleResponse = response => {
    if (response.status === 401) {
      setErroFlag(true);
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
          text: "Create rentalcart account",
          style: { color: "#fff", fontSize:16 }
        }}
      />
      {accountFlag ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{
            fontSize:16
          }}>{`A verification email has been sent to ${email}.`}</Text>
         <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
            <Text style={appStyles.link}> I hava account to login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Card>
          <TextInput
            style={appStyles.input}
            placeholder="First Name"
            onChangeText={value => setFirstName(value)}
            value={firstName}
          />
          <TextInput
            style={appStyles.input}
            placeholder="Last Name"
            onChangeText={value => setLastName(value)}
            value={lastName}
          />
          <TextInput
            style={appStyles.input}
            placeholder="Contact"
            onChangeText={value => setContact(value)}
            value={contact}
            keyboardType="number-pad"
          />
          <TextInput
            style={appStyles.input}
            placeholder="Shop Name"
            onChangeText={value => setShopname(value)}
            value={shopName}
          />
          <TextInput
            style={appStyles.input}
            placeholder="Email Id"
            onChangeText={value => setEmail(value)}
            value={email}
          />
          <TextInput
            style={appStyles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={value => setPassword(value)}
            value={password}
          />
          <TextInput
            style={appStyles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={value => setConfirmPassword(value)}
            value={confirmPassword}
          />
          <View style={{ margin: 7 }} />
          <Button
            buttonStyle={appStyles.primarybtn}
            onPress={createUser}
            title="Create user"
          />
          <Text style={{ color: "red" }}>{errorMsg}</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
            <Text style={appStyles.link}> I hava account to login</Text>
          </TouchableOpacity>
        </Card>
      )}
    </View>
  );
};

export default Singup;
