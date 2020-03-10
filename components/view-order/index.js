import React, { useState } from "react";
import { Text, ScrollView, View } from "react-native";
import { Card, Button } from "react-native-elements";
import { orderCartStyles } from "./styles";
import { appStyles } from "../../appStyles";
import { invokeApi } from "../../services/dataServices";
import { SHOP_ENDPOINTS, DOMAIN_NAME } from "../../constants/endpoints";

const ViewOrder = props => {
  const navigation = props.navigation;
  const [orderDetails, setOrderDetails] = useState(
    navigation.getParam("order", {}) || {}
  );

  const completeOrder = () => {
    invokeApi(
      `${DOMAIN_NAME}${SHOP_ENDPOINTS.ORDER}/${orderDetails._id}`,
      "POST",
      {
        orderStatus: "Completed"
      }
    )
      .then(data => {
        console.log("data", data);
        if (data.error) {
        } else {
          navigation.goBack();
        }
      })
      .catch(() => {
        navigation.goBack();
      });
  };

  return (
    <View style={orderCartStyles.cartContainer}>
      <ScrollView style={orderCartStyles.bodyContainer}>
        <Card containerStyle={{ margin: 0 }}>
          <View style={orderCartStyles.tableRow}>
            <Text style={orderCartStyles.col1}>Name </Text>
            <Text style={orderCartStyles.col2}>Price </Text>
            <Text style={orderCartStyles.col3}>Qty </Text>
            <Text style={orderCartStyles.col4}>Total </Text>
          </View>
          {(orderDetails.orderItems || []).map(order => {
            return (
              <View style={orderCartStyles.tableRow} key={order.id}>
                <Text style={orderCartStyles.col1}>{order.name}</Text>
                <Text style={orderCartStyles.col2}>
                  {order.amount || "0.00"}
                </Text>
                <Text style={orderCartStyles.col3}>
                  {order.orderCount || "0"}
                </Text>
                <Text style={orderCartStyles.col4}>
                  {order.orderCount * order.amount}
                </Text>
              </View>
            );
          })}
          <View style={orderCartStyles.grandTotal}>
            <Text>Grand Total RS {orderDetails.amount}</Text>
          </View>
        </Card>
        <Card containerStyle={{ margin: 0 }}>
          {(orderDetails.customerdetails || []).length > 0 && (
            <View>
              <Text>Customer Details</Text>
              <Text>Name : {orderDetails.customerdetails[0].firstName}</Text>
              <Text>Mobile : {orderDetails.customerdetails[0].contact}</Text>
              <Text>Address: {orderDetails.customerdetails[0].address}</Text>
            </View>
          )}
        </Card>
        <View style={orderCartStyles.footerContainer}>
          <Button
            title="Completed"
            buttonStyle={appStyles.primarybtn}
            onPress={() => completeOrder()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewOrder;
