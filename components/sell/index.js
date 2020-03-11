import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  RefreshControl,
  TextInput
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Card, Header } from "react-native-elements";
import { appStyles } from "../../appStyles";
import { sellStyles } from "./styles";
import Loader from "../../shared-components/loader";
import { storeData } from "../../services/storage.service";
import MenuIcon from "../../shared-components/header-menu";
import { getItems } from "../../redux/actions";

const Sell = props => {
  const dispatch = useDispatch();
  const storeItems = useSelector(state => state.appStore.items || []);
  const storeDataLoading = useSelector(
    state => state.appStore.dataLoading || false
  );
  const [dataLoading, setDataLoading] = useState(storeDataLoading);
  const [productsList, setProductsList] = useState([]);
  const [orderedItems, setOrderedItems] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getItems(dispatch);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getItems(dispatch);
  }, [refreshing]);

  useEffect(() => {
    if (storeItems) {
      setProductsList(storeItems);
      setRefreshing(false);
    }
  }, [storeItems]);

  useEffect(() => {
    setDataLoading(storeDataLoading);
  }, [storeDataLoading]);

  const addItem = item => {
    if (
      item.count -
        ((orderedItems &&
          orderedItems[item.id] &&
          orderedItems[item.id].orderCount) ||
          0) <=
      0
    ) {
      return;
    }
    if (orderedItems && orderedItems[item.id]) {
      orderedItems[item.id]["orderCount"]++;
    } else {
      orderedItems[item.id] = item;
      orderedItems[item.id]["orderCount"] = 1;
    }
    setOrderedItems({ ...orderedItems });
  };

  const removeItem = item => {
    if (
      orderedItems &&
      orderedItems[item.id] &&
      orderedItems[item.id]["orderCount"] > 0
    ) {
      orderedItems[item.id]["orderCount"]--;
      if (orderedItems[item.id]["orderCount"] === 0) {
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

  const onInputChange = (value, item) => {
    if (orderedItems && orderedItems[item.id]) {
      orderedItems[item.id]["orderCount"] = value;
    } else {
      orderedItems[item.id] = item;
      orderedItems[item.id]["orderCount"] = value;
    }
    setOrderedItems({ ...orderedItems });
  };

  return (
    <View style={sellStyles.sellContainer}>
      <View style={{ flex: 1 }}>
        <Header
          backgroundColor="#3D6CB9"
          placement="left"
          leftComponent={<MenuIcon navigation={props.navigation} />}
          centerComponent={{ text: "Sell", style: { color: "#fff" } }}
          rightComponent={cartComponent()}
        />
      </View>

      {dataLoading ? (
        <Loader />
      ) : (
        <View style={{ flex: 9 }}>
          {productsList.length === 0 ? (
            <View style={appStyles.noRecord}>
              <Text>No Product found</Text>
            </View>
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {productsList.map(product => {
                let availableCount =
                  product.availableCount -
                  ((orderedItems &&
                    orderedItems[product.id] &&
                    orderedItems[product.id].orderCount) ||
                    0);
                return (
                  <Card containerStyle={{ margin: 0 }} key={product.id}>
                    <View style={sellStyles.orderItemRow}>
                      <View style={sellStyles.itemdetails}>
                        <Text style={sellStyles.name}>{product.name}</Text>
                        <Text
                          style={
                            availableCount > 0
                              ? sellStyles.count
                              : sellStyles.invalidCount
                          }
                        >
                          Available count {availableCount}
                        </Text>
                        <Text style={sellStyles.price}>
                          Price per day RS {product.amount}
                        </Text>
                      </View>
                      <View style={sellStyles.addRemoveBtns}>
                        <TouchableOpacity
                          style={sellStyles.countBtn}
                          onPress={() => addItem(product)}
                        >
                          <Icon
                            name="plus"
                            size={24}
                            color="white"
                            type="font-awesome"
                          />
                        </TouchableOpacity>
                        <TextInput
                          style={{ textAlign: "center", height: 25, width: 60 }}
                          placeholder="Count"
                          keyboardType="number-pad"
                          onChangeText={value => onInputChange(+value, product)}
                          value={
                            (orderedItems &&
                              orderedItems[product.id] &&
                              `${orderedItems[product.id].orderCount}`) ||
                            "0"
                          }
                        />

                        <TouchableOpacity
                          style={sellStyles.countBtn}
                          onPress={() => removeItem(product)}
                        >
                          <Icon
                            name="minus"
                            size={24}
                            color="white"
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
      )}
    </View>
  );
};

export default Sell;
