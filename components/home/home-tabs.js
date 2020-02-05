import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export default function HomeTabs(props) {
  const [index, setIndex] = React.useState(0);

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={
          index === 0
            ? {
                ...styles.tab,
                ...styles.activeTab
              }
            : styles.tab
        }
        onPress={() => {
          setIndex(0);
          props.setActiveTab(0);
        }}
      >
        <Text style={styles.tabTitle}>Category</Text>
        {index === 0 && (
          <Icon name="plus" size={20} color="white" type="font-awesome" />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={
          index === 1
            ? {
                ...styles.tab,
                ...styles.activeTab
              }
            : styles.tab
        }
        onPress={() => {
          setIndex(1);
          props.setActiveTab(1);
        }}
      >
        <Text style={styles.tabTitle}>Products</Text>
        {index === 1 && (
          <Icon name="plus-circle" size={20} color="white" type="font-awesome" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  tabTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600"
  },
  activeTab: {
    borderBottomColor: "#0A4BB5",
    borderBottomWidth: 5
  },
  tab: {
    flex: 1,
    height: 45,
    paddingTop: 10,
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
