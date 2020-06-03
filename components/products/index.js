import React, { useState, useEffect, useCallback } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Text,
  ScrollView,
  View,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Card, Overlay } from "react-native-elements";
import { invokeApi } from "../../services/dataServices";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../../constants/endpoints";
import { appStyles } from "../../appStyles";
import { onlineOrderStyles } from "./styles";
import Loader from "../../shared-components/loader";
import CreateProduct from "../create-product";
import { getItems } from "../../redux/actions";

const Products = props => {
  const dispatch = useDispatch();
  const storeItems = useSelector(state => state.appStore.items || []);
  const [itemList, setItemList] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [editItem, setEditItem] = useState({});

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getItems(dispatch);
  }, [refreshing]);

  useEffect(() => {
    if (storeItems) {
      setItemList(storeItems);
      setRefreshing(false);
    }
  }, [storeItems]);

  const updateItem = itemDetails => {
    setEditFlag(false);
    invokeApi(
      `${DOMAIN_NAME}${SHOP_ENDPOINTS.UPDATE_ITEM}/${itemDetails._id}`,
      "PUT",
      itemDetails
    )
      .then(data => {
        if (data.msg == "updated") {
          getItems(dispatch);
        } else {
        }
      })
      .catch(() => {});
  };

  deleteProduct = item => {
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.ITEM}/${item._id}`, "DELETE")
      .then(data => {
        if (data.error) {
        } else {
          getItems(dispatch);
        }
      })
      .catch(err => {});
  };

  editProduct = item => {
    setEditFlag(true);
    setEditItem(item);
  };

  return (
    <View style={onlineOrderStyles.productsContainer}>
      <View>
        {dataLoading ? (
          <Loader />
        ) : itemList.length === 0 ? (
          <View style={appStyles.noRecord}>
            <Text>No Products found</Text>
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {itemList.map(item => {
              return (
                <Card
                  containerStyle={onlineOrderStyles.itemsCard}
                  key={item.id}
                >
                  <View style={onlineOrderStyles.itemRow}>
                    <View style={onlineOrderStyles.productDetails}>
                      <Text style={onlineOrderStyles.name}>{item.name}</Text>
                      <Text style={onlineOrderStyles.desc}>
                        {item.description}
                      </Text>
                    </View>
                    <View style={onlineOrderStyles.counts}>
                      <Text style={onlineOrderStyles.name}>
                        Count :{item.count}
                      </Text>
                      <Text style={onlineOrderStyles.name}>
                        Price : {item.amount}
                      </Text>
                      <Text style={onlineOrderStyles.name}>
                        Available : {item.availableCount}
                      </Text>
                    </View>
                    <View style={onlineOrderStyles.actions}>
                      <TouchableOpacity onPress={() => editProduct(item)}>
                        <FontAwesome5
                          name="edit"
                          size={20}
                          type="font-awesome"
                          color="#0A4BB5"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteProduct(item)}>
                        <FontAwesome5
                          name="trash"
                          size={20}
                          type="font-awesome"
                          color="red"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              );
            })}
          </ScrollView>
        )}
        <Overlay
          isVisible={editFlag}
          height={400}
          width={"100%"}
          onBackdropPress={() => setEditFlag(false)}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold"
                }}
              >
                Update Product
              </Text>
              <TouchableOpacity onPress={() => setEditFlag(false)}>
                <FontAwesome5
                  name="times"
                  size={25}                  
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <View>
              <CreateProduct
                mode="EDIT"
                item={editItem}
                updateItem={itemDetails => updateItem(itemDetails)}
              />
            </View>
          </View>
        </Overlay>
      </View>
    </View>
  );
};

export default Products;
