import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  ScrollView,
  View,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import { Card, Icon, Overlay } from "react-native-elements";
import { invokeApi } from "../../services/dataServices";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../../constants/endpoints";
import { appStyles } from "../../appStyles";
import { onlineOrderStyles } from "./styles";
import Loader from "../../shared-components/loader";
import CreateProduct from "../create-product";

const Products = props => {
  const [itemList, setItemList] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [editItem, setEditItem] = useState({});

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getProducts();
  }, [refreshing]);

  useEffect(() => {
    getProducts();
  }, []);

  getProducts = () => {
    setDataLoading(true);
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.ITEMS}`, "GET")
      .then(data => {
        if (data.error) {
        } else {
          setItemList(data || []);
          setDataLoading(false);
          setRefreshing(false);
        }
      })
      .catch(() => {
        setRefreshing(false);
        setDataLoading(false);
      });
  };

  const updateItem = itemDetails => {
    setEditFlag(false);
    invokeApi(
      `${DOMAIN_NAME}${SHOP_ENDPOINTS.UPDATE_ITEM}/${itemDetails._id}`,
      "PUT",
      itemDetails
    )
      .then(data => {
        if (data.msg == "updated") {
          getProducts();
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
          setDataLoading(false);
          setRefreshing(false);
          getProducts();
        }
      })
      .catch(err => {
        setRefreshing(false);
        setDataLoading(false);
      });
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
                    </View>

                    <View style={onlineOrderStyles.actions}>
                      <TouchableOpacity onPress={() => editProduct(item)}>
                        <Icon
                          name="edit"
                          size={25}
                          type="font-awesome"
                          color="#0A4BB5"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteProduct(item)}>
                        <Icon
                          name="trash"
                          size={30}
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
        <Overlay isVisible={editFlag} height={400}>
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
              <Icon name="close" size={25} type="font-awesome" color="#000" />
            </TouchableOpacity>
          </View>
          <View>
            <CreateProduct
              mode="EDIT"
              item={editItem}
              updateItem={itemDetails => updateItem(itemDetails)}
            />
          </View>
        </Overlay>
      </View>
    </View>
  );
};

export default Products;
