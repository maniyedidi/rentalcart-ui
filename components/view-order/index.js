import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, TextInput } from "react-native";
import { Card, Button } from "react-native-elements";
import { appStyles } from "../../appStyles";
import { orderCartStyles } from "./styles";
import Loader from "../../shared-components/loader";
import { retrieveData } from "../../services/storage.service";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../../constants/endpoints";
import { invokeApi } from "../../services/dataServices";

const ViewOrder = props => {
  const [orderedItems, setOrderedItems] = useState({});
  const [dataLoading, setDataLoading] = useState(true);
  const [billAmount, setBillAmount] = useState(0);

  const [customerdetails, setCustomerdetails] = useState({
    firstName: "",
    contact: ""
  });

  useEffect(() => {
    retrieveData("orderedItems").then(response => {
      if (response) {
        let items = JSON.parse(response || "{}");
        let amount = 0;
        Object.keys(items).forEach(id => {
          amount = amount + items[id].orderCount * items[id].amount;
        });
        setBillAmount(amount);
        setOrderedItems(items);
      }
      setDataLoading(false);
    });
  }, []);

  const createOrder = () => {
    let amount = 0;
    let items = [];
    setDataLoading(true);

    Object.keys(orderedItems).forEach(id => {
      amount = amount + orderedItems[id].orderCount * orderedItems[id].amount;
      items.push(orderedItems[id]);
    });
    customerdetails["id"] = customerdetails.contact;

    const payload = {
      id: Date.now(),
      customer: customerdetails,
      orderDate: Date.now(),
      orderStatus: "open",
      orderItems: items,
      paymentType: "CASH",
      amount: amount,
      discount: 0,
      updatedAt: Date.now(),
      createdAt: Date.now(),
      archive: false
    };

    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.CREATE_ORDER}`, "POST", payload)
      .then(data => {
        if (data.error) {
        } else {
          navToOrderScreen();
        }
        setDataLoading(false);
      })
      .catch(err => {
        setDataLoading(false);
      });
  };

  const navToOrderScreen = () => {
    props.navigation.navigate("Sell");
  };

  if (dataLoading) {
    return <Loader />;
  } else {
    return Object.keys(orderedItems || {}).length === 0 ? (
      <View style={appStyles.noRecord}>
        <Text>No Product found</Text>
        <Button
          buttonStyle={appStyles.primarybtn}
          onPress={navToOrderScreen}
          title="Add more items"
        />
      </View>
    ) : (
      <View style={orderCartStyles.cartContainer}>
        <ScrollView style={orderCartStyles.bodyContainer}>
          <View style={orderCartStyles.cusstomerDetails}>
            <Card containerStyle={{ margin: 0 }}>
              <TextInput
                placeholder="Customer name"
                style={appStyles.input}
                onChangeText={value =>
                  setCustomerdetails({
                    ...customerdetails,
                    firstName: value
                  })
                }
                value={customerdetails.firstName}
              />
              <TextInput
                placeholder="Customer number"
                style={appStyles.input}
                onChangeText={value =>
                  setCustomerdetails({
                    ...customerdetails,
                    contact: value
                  })
                }
                keyboardType="phone-pad"
                value={customerdetails.contact}
              />
              <TextInput
                placeholder="Address"
                style={appStyles.input}
                onChangeText={value =>
                  setCustomerdetails({
                    ...customerdetails,
                    address: value
                  })
                }
                value={customerdetails.address}
              />
            </Card>
          </View>
          <Card containerStyle={{ margin: 0 }}>
            <View style={orderCartStyles.tableRow}>
              <Text style={orderCartStyles.col1}>Name </Text>
              <Text style={orderCartStyles.col2}>Price </Text>
              <Text style={orderCartStyles.col3}>Qty </Text>
              <Text style={orderCartStyles.col4}>Total </Text>
            </View>
            {Object.keys(orderedItems || {}).map(id => {
              return (
                <View style={orderCartStyles.tableRow}>
                  <Text style={orderCartStyles.col1}>
                    {orderedItems[id].name}
                  </Text>
                  <Text style={orderCartStyles.col2}>
                    {orderedItems[id].amount || "0.00"}
                  </Text>
                  <Text style={orderCartStyles.col3}>
                    {orderedItems &&
                      orderedItems[id] &&
                      orderedItems[id].orderCount}
                  </Text>
                  <Text style={orderCartStyles.col4}>
                    {orderedItems &&
                      orderedItems[id] &&
                      orderedItems[id].orderCount * orderedItems[id].amount}
                  </Text>
                </View>
              );
            })}
            <View style={orderCartStyles.grandTotal}>
              <Text>Grand Total RS {billAmount}</Text>
            </View>
          </Card>
        </ScrollView>
        <View style={orderCartStyles.footerContainer}>
          <Button
            title="Create Order"
            buttonStyle={appStyles.primarybtn}
            onPress={() => createOrder()}
          />
        </View>
      </View>
    );
  }
};

export default ViewOrder;
