import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { Icon, Card, Header } from "react-native-elements";
import { invokeApi } from "../../services/dataServices";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../../constants/endpoints";
import { appStyles } from "../../appStyles";
import { sellStyles } from "./styles";
import Loader from "../../shared-components/loader";
import { storeData } from "../../services/storage.service";
import HeaderMenu from "../header/menu";

const Sell = props => {
  const [productsList, setProductsList] = useState([]);
  const [orderedItems, setOrderedItems] = useState({});
  const [dataLoading, setDataLoading] = useState({});

  useEffect(() => {
    getProductsList();
  }, []);

  const getProductsList = () => {
    setDataLoading(true);
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.ITEMS}`, "GET")
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
    setOrderedItems({ ...orderedItems });
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
    setOrderedItems({ ...orderedItems });
  };

  const navToDetailsScreen = () => {
    storeData("orderedItems", orderedItems).then(res => {
      props.navigation.navigate("OrderCart");
    });
  };

  const cartComponent = () => {
    return (
      <TouchableOpacity onPress={navToDetailsScreen}>
        <Icon
          name="shopping-cart"
          size={30}
          color="white"
          type="font-awesome"
        />
      </TouchableOpacity>
    );
  };

  if (dataLoading) {
    return <Loader />;
  } else {
    return (
      <View style={sellStyles.onlineContainer}>
        <Header
          backgroundColor="#3D6CB9"
          placement="left"
          leftComponent={<HeaderMenu navigation={props.navigation} />}
          centerComponent={{ text: "Sell", style: { color: "#fff" } }}
          rightComponent={cartComponent()}
        />
        <View>
          {productsList.length === 0 ? (
            <View style={appStyles.noRecord}>
              <Text>No Product found</Text>
            </View>
          ) : (
            <ScrollView>
              {productsList.map(product => {
                return (
                  <Card containerStyle={{ margin: 0 }} key={product.id}>
                    <View style={sellStyles.orderItemRow}>
                      <View style={sellStyles.itemdetails}>
                        <Text style={sellStyles.name}>{product.name}</Text>
                        <Text style={sellStyles.count}>
                          Available count{" "}
                          {product.availableCount -
                            ((orderedItems &&
                              orderedItems[product.id] &&
                              orderedItems[product.id].count) ||
                              0)}
                        </Text>
                        <Text style={sellStyles.price}>
                          Price per day RS {product.amount}
                        </Text>
                      </View>
                      <View style={sellStyles.addRemoveBtns}>
                        <TouchableOpacity onPress={() => addItem(product)}>
                          <Icon
                            name="plus-square"
                            size={30}
                            color="#00D1FF"
                            type="font-awesome"
                          />
                        </TouchableOpacity>
                        <Text>
                          {(orderedItems &&
                            orderedItems[product.id] &&
                            orderedItems[product.id].count) ||
                            0}{" "}
                        </Text>
                        <TouchableOpacity onPress={() => removeItem(product)}>
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
