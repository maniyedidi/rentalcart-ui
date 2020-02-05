import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../../constants/endpoints";
import { storeData, retrieveData } from "../../services/storage.service";
import Loader from "../../shared-components/loader";
import { authHeader } from "../../utils";
import { RIGHT_MENU } from "../../constants";
import { appStyles } from "../../appStyles";
import { getShopDetails } from "../../redux/actions";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      submitted: false,
      redirectUrl: "",
      loggingIn: true,
      requiredPin: false,
      erroFlag: false,
      errorMsg: ""
    };
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const loginToken = await authHeader();
    if (loginToken) {
      this.props.navigation.navigate(RIGHT_MENU[0].title);
      this.setState({ loggingIn: false });
    } else {
      this.setState({ loggingIn: false });
    }
  };

  loginApp = () => {
    if (!this.state.username || !this.state.password) {
      this.setState({ errorMsg: "Please enter login details" });
      return;
    }
    let reqBody = {
      email: this.state.username,
      password: this.state.password,
    };
    const headers = { "Content-Type": "application/json" };
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(reqBody)
    };
    this.setState({ loggingIn: true });

    fetch(`${DOMAIN_NAME}${SHOP_ENDPOINTS.LOGIN}`, requestOptions)
      .then(this.handleResponse)
      .then(user => {
          storeData("user", user).then(token => {
            this.props.navigation.navigate("Home");
            this.props.getShopDetails();
            this.setState({ loggingIn: false });
          });
        })      
      .catch(() => this.setState({ loggingIn: false }));
  };

  handleResponse = response => {
    if (response.status === 401) {
      this.setState({ erroFlag: true });
    }
    return response.json();
  };

  render() {
    const { username, password, errorMsg, loggingIn, pin } = this.state;
    return (
      <ScrollView style={{ padding: 20 }}>
        {loggingIn ? (
          <Loader />
        ) : (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 27 }}>Login</Text>
            <TextInput
              style={appStyles.input}
              placeholder="Username"
              name="username"
              onChangeText={value => this.setState({ username: value })}
              value={username}
            />
            <TextInput
              style={appStyles.input}
              placeholder="Password"
              name="password"
              secureTextEntry={true}
              onChangeText={value => this.setState({ password: value })}
              value={password}
            />
            <View style={{ margin: 7 }} />
            <Button
              buttonStyle={appStyles.primarybtn}
              onPress={this.loginApp}
              title="Login"
            />
            <Text style={{ color: "red" }}>{errorMsg}</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  shopDetails: state.spidlepos.shopDetails
});

const mapDispatchToProps = dispatch => ({
  getShopdetails: () => dispatch(getShopDetails())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
