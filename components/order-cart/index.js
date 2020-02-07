import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { Card, Button } from "react-native-elements";
import { appStyles } from "../../appStyles";
import { sellStyles } from "./styles";
import Loader from "../../shared-components/loader";
import { Icon } from "react-native-elements";
import { retrieveData } from "../../services/storage.service";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../../constants/endpoints";
import { invokeApi } from "../../services/dataServices";

const OrderCart = props => {
  const [orderedItems, setOrderedItems] = useState({});
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    retrieveData("orderedItems").then(items => {
      if (items) {
        setOrderedItems(JSON.parse(items));
      }
      setDataLoading(false);
    });
  }, []);

  const addItem = item => {
    if (orderedItems && orderedItems[item.id]) {
      orderedItems[item.id]["count"]++;
    } else {
      orderedItems[item.id] = item;
      orderedItems[item.id]["count"] = 1;
    }
    setOrderedItems(orderedItems);
  };

  const removeItem = item => {
    if (
      orderedItems &&
      orderedItems[item.id] &&
      orderedItems[item.id]["count"] > 0
    ) {
      orderedItems[item.id]["count"]--;
      if (orderedItems[item.id]["count"] === 0) {
        delete orderedItems[item.id];
      }
    }
    setOrderedItems(orderedItems);
  };

  const createOrder = () => {
    let amount = 0;
    let items = [];
    setDataLoading(true);
    Object.keys(orderedItems).forEach(id => {
      amount = amount + orderedItems[id].count * orderedItems[id].price;
      items.push(orderedItems[id]);
    });
    const payload = {
      id: new Date().getTime(),
      customerId: "",
      orderDate: new Date().getTime(),
      orderStatus: "open",
      orderItems: items,
      paymentType: "CASH",
      amount: amount,
      discount: 0,
      updatedAt: new Date().getTime(),
      createdAt: new Date().getTime(),
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
      .catch(() => setDataLoading(false));
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
      <View style={sellStyles.onlineContainer}>
        <ScrollView>
          {Object.keys(orderedItems || {}).map(id => {
            return (
              <Card containerStyle={{ margin: 0 }} key={id}>
                <View style={sellStyles.orderItemRow}>
                  <View style={sellStyles.itemdetails}>
                    <Text style={sellStyles.name}>{orderedItems[id].name}</Text>
                    <Text style={sellStyles.count}>
                      Available count{" "}
                      {orderedItems[id].availableCount -
                        ((orderedItems &&
                          orderedItems[id] &&
                          orderedItems[id].count) ||
                          0)}
                    </Text>
                    <Text style={sellStyles.price}>
                      Price per day RS {orderedItems[id].amount}
                    </Text>
                  </View>
                  <View style={sellStyles.addRemoveBtns}>
                    <TouchableOpacity onPress={() => addItem(orderedItems[id])}>
                      <Icon
                        name="plus-square"
                        size={30}
                        color="#00D1FF"
                        type="font-awesome"
                      />
                    </TouchableOpacity>
                    <Text>
                      {(orderedItems &&
                        orderedItems[id] &&
                        orderedItems[id].count) ||
                        0}{" "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => removeItem(orderedItems[id])}
                    >
                      <Icon
                        name="minus-square"
                        size={30}
                        color="#00D1FF"
                        type="font-awesome"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            );
          })}
        </ScrollView>
        <Button
          title="create order"
          buttonStyle={appStyles.primarybtn}
          onPress={() => createOrder()}
        />
      </View>
    );
  }
};

export default OrderCart;
