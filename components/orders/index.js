import React, { Component, useState, useEffect } from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { invokeApi } from "../../services/dataServices";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../../constants/endpoints";
import { Card } from "react-native-elements";
import { appStyles } from "../../appStyles";
import { onlineOrderStyles } from "./styles";
import Loader from "../../shared-components/loader";
import moment from "moment";

const Orders = () => {
  const [dataLoading, setDataLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    setDataLoading(true);    
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.CATEGORIES}`, "GET")
      .then(data => {
        setDataLoading(false);
        if (data.error) {
        } else {
          setOrderList(data);
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
        {orderList.length === 0 ? (
          <View style={appStyles.noRecord}>
            <Text>No Categories found</Text>
          </View>
        ) : (
          <ScrollView>
            {orderList.map(order => {
              return (
                <Card containerStyle={{ margin: 0 }} key={order.id}>
                  <View style={onlineOrderStyles.orderItem}>
                    <View style={onlineOrderStyles.orderId}>
                      <Text>{order.id}</Text>
                      <Text>{moment(order.orderDate).fromNow()}</Text>
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

export default Orders;
