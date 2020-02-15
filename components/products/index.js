import React, { useState, useEffect } from "react";
import { Text, ScrollView, View } from "react-native";
import { Card } from "react-native-elements";
import { invokeApi } from "../../services/dataServices";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../../constants/endpoints";
import { appStyles } from "../../appStyles";
import { onlineOrderStyles } from "./styles";
import Loader from "../../shared-components/loader";

const Products = props => {
  const [itemList, setCategoryList] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  getProducts = () => {
    setDataLoading(true);
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.ITEMS}`, "GET")
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
        {itemList.length === 0 ? (
          <View style={appStyles.noRecord}>
            <Text>No Categories found</Text>
          </View>
        ) : (
          <ScrollView>
            {itemList.map(category => {
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

export default Products;
