import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { invokeApi } from "../../services/dataServices";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../../constants/endpoints";
import { Card } from "react-native-elements";
import { appStyles } from "../../appStyles";
import { sellStyles } from "./styles";
import Loader from "../../shared-components/loader";
import HeaderBar from "../header";
import { Icon } from "react-native-elements";
import { storeData } from "../../services/storage.service";

const Sell = props => {
  const [productsList, setProductsList] = useState([]);
  const [orderedItems, setOrderedItems] = useState({});
  const [dataLoading, setDataLoading] = useState({});

  useEffect(() => {
    getProductsList();
  }, []);

  const getProductsList = () => {
    setDataLoading(true);
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.PRODUCTS}`, "GET")
      .then(data => {
        if (data.error) {
        } else {
          setDataLoading(false);
          setProductsList(data || []);
        }
      })
      .catch(() => setDataLoading(false));
  };

  const addItem = item => {
    if (orderedItems && orderedItems[item.id]) {
      orderedItems[item.id]["count"]++;
    } else {
      orderedItems[item.id] = item;
      orderedItems[item.id]["count"] = 1;
    }
    setOrderedItems({...orderedItems});
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
    setOrderedItems({...orderedItems});
  };

  const navToDetailsScreen = () => {
    console.log(orderedItems);
    
    storeData("orderedItems", orderedItems).then((res) => {
      props.navigation.navigate("OrderCart");
    });
  };

  if (dataLoading) {
    return <Loader />;
  } else {
    return (
      <View style={sellStyles.onlineContainer}>
        <View
          style={{
            height: 70,
            backgroundColor: "#3D6CB9",
            paddingTop: 5
          }}
        >
          <HeaderBar navigation={props.navigation} title="Sell">
            <TouchableOpacity onPress={navToDetailsScreen}>
              <Icon
                name="shopping-cart"
                size={30}
                color="white"
                type="font-awesome"
              />
            </TouchableOpacity>
          </HeaderBar>
        </View>
        <View>
          {productsList.length === 0 ? (
            <View style={appStyles.noRecord}>
              <Text>No Product found</Text>
            </View>
          ) : (
            <ScrollView>
              {productsList.map(poroduct => {
                return (
                  <Card containerStyle={{ margin: 0 }} key={poroduct.id}>
                    <View style={sellStyles.orderItemRow}>
                      <View style={sellStyles.itemdetails}>
                        <Text style={sellStyles.name}>{poroduct.name}</Text>
                        <Text style={sellStyles.count}>
                          Available count{" "}
                          {poroduct.availableCount -
                            ((orderedItems &&
                              orderedItems[poroduct.id] &&
                              orderedItems[poroduct.id].count) ||
                              0)}
                        </Text>
                        <Text style={sellStyles.price}>
                          Price per day RS {poroduct.amount}
                        </Text>
                      </View>
                      <View style={sellStyles.addRemoveBtns}>
                        <TouchableOpacity onPress={() => addItem(poroduct)}>
                          <Icon
                            name="plus-square"
                            size={30}
                            color="#00D1FF"
                            type="font-awesome"
                          />
                        </TouchableOpacity>
                        <Text>
                          {(orderedItems &&
                            orderedItems[poroduct.id] &&
                            orderedItems[poroduct.id].count) ||
                            0}{" "}
                        </Text>
                        <TouchableOpacity onPress={() => removeItem(poroduct)}>
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

export default Sell;
