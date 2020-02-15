import React, { Component, useState, useEffect } from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { invokeApi } from "../../services/dataServices";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../../constants/endpoints";
import { Card } from "react-native-elements";
import { appStyles } from "../../appStyles";
import { onlineOrderStyles } from "./styles";
import Loader from "../../shared-components/loader";

const Categories = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    setDataLoading(true);
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.CATEGORIES}`, "GET")
      .then(data => {
        if (data.error) {
        } else {
          setCategoryList(data || []);
          setDataLoading(false);
        }
      })
      .catch(() => setDataLoading(false));
  };

  if (dataLoading) {
    return <Loader />;
  }
  return (
    <View style={onlineOrderStyles.onlineContainer}>
      <View>
        {categoryList.length === 0 ? (
          <View style={appStyles.noRecord}>
            <Text>No Categories found</Text>
          </View>
        ) : (
          <ScrollView>
            {categoryList.map(category => {
              return (
                <Card containerStyle={{ margin: 0 }} key={category.id}>
                  <View style={onlineOrderStyles.orderItem}>
                    <View style={onlineOrderStyles.orderId}>
                      <Text>{category.name}</Text>
                      <Text>{category.description}</Text>
                    </View>
                    <View style={onlineOrderStyles.orderId}></View>
                  </View>
                </Card>
              );
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Categories;
