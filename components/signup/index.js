import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { Button, Header, Card } from "react-native-elements";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../../constants/endpoints";
import Loader from "../../shared-components/loader";
import { appStyles } from "../../appStyles";

const Singup = props => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [accountFlag, setAccountFlag] = useState(false);

  const [userDetails, setUserDetails] = useState({
    userId: Date.now().toString(),
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    shopName: "",
    accountType: "USER"
  });

  const [errorDetails, setErrorDetails] = useState({
    firstNameErr: false,
    contactErr: false,
    emailErr: false,
    passwordErr: false,
    shopNameErr: false,
    confirmPasswordErr: false
  });

  const onInputTextChange = (value, dataLabel) => {
    setUserDetails({
      ...userDetails,
      [dataLabel]: value
    });
    setErrorDetails({
      ...errorDetails,
      [dataLabel + "Err"]: false
    });
  };

  const isFormValid = () => {
    let errors = {
      firstNameErr: false,
      contactErr: false,
      emailErr: false,
      passwordErr: false,
      shopNameErr: false,
      confirmPasswordErr: false
    };
    if (!userDetails.firstName) {
      errors.firstNameErr = true;
    }
    if (!userDetails.contact) {
      errors.contactErr = true;
    }

    if (!userDetails.email) {
      errors.email = true;
    }

    if (!userDetails.password) {
      errors.passwordErr = true;
    }
    if (!userDetails.shopName) {
      errors.shopNameErr = true;
    }
    if (userDetails.password !== userDetails.confirmPassword) {
      errors.confirmPasswordErr = true;
    }

    if (
      errors.firstNameErr ||
      errors.contactErr ||
      errors.passwordErr ||
      errors.shopNameErr ||
      errors.confirmPasswordErr
    ) {
      setErrorDetails(errors);
      return;
    } else {
      createUser();
    }
  };

  const createUser = () => {    
    const headers = { "Content-Type": "application/json" };
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(userDetails)
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
          style: appStyles.headerTitle
        }}
      />
      {accountFlag ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 16
            }}
          >{`A verification email has been sent to ${userDetails.email}.`}</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
            <Text style={appStyles.link}> I hava account to login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Card>
          <TextInput
            style={appStyles.input}
            placeholder="First Name"
            onChangeText={value => onInputTextChange(value, "firstName")}
            value={userDetails.firstName}
          />
          {errorDetails.firstNameErr && (
            <Text style={{ color: "red" }}>Required</Text>
          )}
          <TextInput
            style={appStyles.input}
            placeholder="Last Name"
            onChangeText={value => onInputTextChange(value, "lastName")}
            value={userDetails.lastName}
          />
          <TextInput
            style={appStyles.input}
            placeholder="Contact"
            onChangeText={value => onInputTextChange(value, "contact")}
            value={userDetails.contact}
            keyboardType="number-pad"
          />
          {errorDetails.contactErr && (
            <Text style={{ color: "red" }}>Required</Text>
          )}
          <TextInput
            style={appStyles.input}
            placeholder="Shop Name"
            onChangeText={value => onInputTextChange(value, "shopName")}
            value={userDetails.shopName}
          />
          {errorDetails.shopNameErr && (
            <Text style={{ color: "red" }}>Required</Text>
          )}
          <TextInput
            style={appStyles.input}
            placeholder="Email Id"
            onChangeText={value => onInputTextChange(value, "email")}
            value={userDetails.email}
          />
          {errorDetails.emailErr && (
            <Text style={{ color: "red" }}>Required</Text>
          )}
          <TextInput
            style={appStyles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={value => onInputTextChange(value, "password")}
            value={userDetails.password}
          />
          {errorDetails.passwordErr && (
            <Text style={{ color: "red" }}>Required</Text>
          )}
          <TextInput
            style={appStyles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={value => onInputTextChange(value, "confirmPassword")}
            value={userDetails.confirmPassword}
          />
          {errorDetails.confirmPasswordErr && (
            <Text style={{ color: "red" }}>
              password and confirm password not same
            </Text>
          )}
          <View style={{ margin: 7 }} />
          <Button
            buttonStyle={appStyles.primarybtn}
            onPress={isFormValid}
            title="Create user"
          />
          <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
            <Text style={appStyles.link}> I hava account to login</Text>
          </TouchableOpacity>
        </Card>
      )}
    </View>
  );
};

export default Singup;
