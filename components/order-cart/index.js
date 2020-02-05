import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { appStyles } from "../../appStyles";
import { sellStyles } from "./styles";
import Loader from "../../shared-components/loader";
import { Icon } from "react-native-elements";
import { retrieveData } from "../../services/storage.service";

const OrderCart = props => {
  const [orderedItems, setOrderedItems] = useState({});
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {

    retrieveData("orderedItems").then(items => {
      console.log("items", items);
      
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

  if (dataLoading) {
    return <Loader />;
  } else {
    return (
      <View style={sellStyles.onlineContainer}>       
        <View>
          {Object.keys(orderedItems || {}).length === 0 ? (
            <View style={appStyles.noRecord}>
              <Text>No Product found</Text>
            </View>
          ) : (
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
                        <TouchableOpacity onPress={() => removeItem(orderedItems[id])}>
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
          )}
        </View>
      </View>
    );
  }
};

export default OrderCart;
