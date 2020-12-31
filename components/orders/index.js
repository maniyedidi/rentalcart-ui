import React, { useState, useEffect, useCallback } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Card, Badge, Overlay } from "react-native-elements";
import { appStyles } from "../../appStyles";
import { ordersStyles } from "./styles";
import Loader from "../../shared-components/loader";
import { viewDateFormat } from "../../utils";
import { getOrders } from "../../redux/actions";
import AppHeader from "../../shared-components/header";

const Orders = props => {
  const dispatch = useDispatch();
  const navigation = props.navigation;
  const storeOrders = useSelector(state => state.appStore.orders || []);
  const storeDataLoading = useSelector(
    state => state.appStore.dataLoading || false
  );
  const [dataLoading, setDataLoading] = useState(storeDataLoading);
  const [orderList, setOrderList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [filters, setFilter] = useState({ status: ["open"] });

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    getOrders(dispatch);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getOrders(dispatch);
  }, [refreshing]);

  useEffect(() => {
    if (storeOrders && Array.isArray(storeOrders)) {
      setOrderList(
        storeOrders.filter(
          order => filters.status.indexOf(order.orderStatus) !== -1
        )
      );
      setRefreshing(false);
    }
  }, [storeOrders]);

  useEffect(() => {
    setDataLoading(storeDataLoading);
  }, [storeDataLoading]);

  const viewOrder = order => {
    navigation.navigate("ViewOrder", {
      order: order
    });
  };

  const filterComponent = () => {
    return (
      <TouchableOpacity onPress={toggleOverlay}>
        <FontAwesome5 name="filter" size={22} color="white" />
      </TouchableOpacity>
    );
  };

  const updatedFilters = () => {
    let newfilters = {
      status: ["open"]
    };
    if (filters.status.indexOf("Completed") === -1) {
      newfilters.status.push("Completed");
    }
    setOrderList(
      storeOrders.filter(
        order => newfilters.status.indexOf(order.orderStatus) !== -1
      )
    );
    setFilter(newfilters);
    toggleOverlay();
  };

  return (
    <View style={ordersStyles.orderContainer}>
      <View>
        <AppHeader
          placement="right"
          navigation={navigation}
          centerComponent={filterComponent()}
        />
      </View>

      {dataLoading ? (
        <Loader />
      ) : (
        <View style={{ flex: 9 }}>
          {orderList.length === 0 ? (
            <View style={appStyles.noRecord}>
              <Text>No Orders found</Text>
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {orderList.map(order => {
                let customer =
                  (order.customerdetails &&
                    order.customerdetails.length > 0 &&
                    order.customerdetails[0]) ||
                  {};
                return (
                  <Card containerStyle={{ margin: 0 }} key={order.id}>
                    <View>
                      <View style={ordersStyles.orderItem}>
                        <Text style={ordersStyles.itemCol1}>
                          {(customer && customer.firstName) || " - "}{" "}
                          <Text style={ordersStyles.orderDate}>
                            ({viewDateFormat(order.orderDate)})
                          </Text>
                        </Text>
                        <Badge
                          containerStyle={ordersStyles.itemCol2}
                          status={
                            order.orderStatus === "open" ? "warning" : "success"
                          }
                          value={order.orderStatus || "-"}
                        />
                        <TouchableOpacity style={ordersStyles.itemCol3}>
                          <FontAwesome5
                            name="share-alt"
                            size={25}
                            type="font-awesome"
                            color="#3D6CB9"
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={ordersStyles.orderview}>
                        <Text style={ordersStyles.amount}>
                          Amount {order.amount || "0"}
                        </Text>
                        <TouchableOpacity onPress={() => viewOrder(order)}>
                          <Text style={appStyles.link}>View more</Text>
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

      <Overlay
        onBackdropPress={() => setVisible(false)}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <View
          style={{
            width: 300,
            height: 100
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              paddingBottom: 20
            }}
          >
            Filter Orders by status
          </Text>
          <View>
            <TouchableOpacity onPress={updatedFilters}>
              <Text style={appStyles.link}>
                Click here to add/remove completed orders
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
    </View>
  );
};

export default Orders;
