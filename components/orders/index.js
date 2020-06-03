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
import { Card, Badge } from "react-native-elements";
import { appStyles } from "../../appStyles";
import { ordersStyles } from "./styles";
import Loader from "../../shared-components/loader";
import { viewDateFormat, logout } from "../../utils";
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

  useEffect(() => {
    getOrders(dispatch);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getOrders(dispatch);
  }, [refreshing]);

  useEffect(() => {
    if (storeOrders) {
      setOrderList(storeOrders);
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

  return (
    <View style={ordersStyles.orderContainer}>
      <View>
        <AppHeader placement="right" navigation={navigation} />
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
    </View>
  );
};

export default Orders;
