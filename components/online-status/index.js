import React, { Component } from "react";
import { View, Text, StatusBar } from "react-native";
import { Button } from "react-native-elements";
import { appStyles } from "../../appStyles";
import IOSIcon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
class OnlineStatus extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation, toggleOnline, onlineStatus } = this.props;
    return (
      <View
        style={{
          paddingTop: StatusBar.currentHeight
        }}
      >
        <View>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <View
              style={{
                paddingLeft: 15
              }}
            >
              <IOSIcon name="ios-menu" size={30} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20%"
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 5 }}>
            Closed
          </Text>
          <Text style={{ fontSize: 15, marginBottom: 5 }}>You are offline</Text>
          <Text style={{ fontSize: 15, marginBottom: 5 }}>
            You will go online on
          </Text>
          {Object.keys(onlineStatus).map(key => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Button
                  title={`Go online for ${key}`}
                  buttonStyle={appStyles.primarybtn}
                  onPress={() => toggleOnline("enable", key)}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default OnlineStatus;
