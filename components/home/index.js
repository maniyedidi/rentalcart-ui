import React, { useState } from "react";
import { Text, View } from "react-native";
import HeaderBar from "../header";
import HomeTabs from "./home-tabs";
import Categories from "../categories";
import Products from "../products";
import { homeStyles } from "./styles";

const HomeScreen = props => {
  const [activeTab, setActiveTab] = useState(0);
  const navigation = props.navigation;

  return (
    <View style={homeStyles.homeContainer}>
      <View
        style={{
          height: 70,
          backgroundColor: "#3D6CB9",
          paddingTop: 5
        }}
      >
        <HeaderBar navigation={navigation} title="Home">         
        </HeaderBar>
      </View>
      <HomeTabs
        activeTab={activeTab}
        setActiveTab={index => setActiveTab(index)}
      />
      <View>{activeTab === 0 ? <Categories /> : <Products />}</View>
    </View>
  );
};

export default HomeScreen;
