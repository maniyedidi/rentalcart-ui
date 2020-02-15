import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

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
    borderBottomColor: "white",
    borderBottomWidth: 5
  },
  tab: {
    flex: 1,
    height: 45,
    paddingTop: 10,    
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
