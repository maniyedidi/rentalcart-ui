import React, { useState } from "react";
import { Text, ScrollView, View } from "react-native";
import { Card } from "react-native-elements";
import { orderCartStyles } from "./styles";

const ViewOrder = props => {
  const navigation = props.navigation;
  const [orderDetails, setOrderDetails] = useState(
    navigation.getParam("order", {}) || {}
  );
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
              <View style={orderCartStyles.tableRow}>
                <Text style={orderCartStyles.col1}>{order.name}</Text>
                <Text style={orderCartStyles.col2}>
                  {order.amount || "0.00"}
                </Text>
                <Text style={orderCartStyles.col3}>{order.count || "0"}</Text>
                <Text style={orderCartStyles.col4}>{order.count * 1}</Text>
              </View>
            );
          })}
          <View style={orderCartStyles.grandTotal}>
            <Text>Grand Total RS {orderDetails.amount}</Text>
          </View>
        </Card>
        <Card containerStyle={{ margin: 0 }}>
         <View>
           <Text>Customer Name :{  }</Text>
         </View>
        </Card>
      </ScrollView>
    </View>
  );
};

export default ViewOrder;
