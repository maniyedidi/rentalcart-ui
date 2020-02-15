import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { invokeApi } from "../../services/dataServices";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../../constants/endpoints";
import { Card, Icon, Header } from "react-native-elements";
import { appStyles } from "../../appStyles";
import { ordersStyles } from "./styles";
import Loader from "../../shared-components/loader";
import { viewDateFormat } from "../../utils";
import HeaderMenu from "../header/menu";

const Orders = props => {
  const [dataLoading, setDataLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const navigation = props.navigation;

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    setDataLoading(true);
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.ORDERS}`, "GET")
      .then(data => {
        setDataLoading(false);
        if (data.error) {
        } else {
          setOrderList(data);
        }
      })
      .catch(() => setDataLoading(false));
  };

  if (dataLoading) {
    return <Loader />;
  }
  return (
    <View style={ordersStyles.orderContainer}>
      <Header
        backgroundColor="#3D6CB9"
        placement="left"
        leftComponent={<HeaderMenu navigation={navigation} />}
        centerComponent={{ text: "Orders", style: { color: "#fff" } }}
      />
      <View>
        {orderList.length === 0 ? (
          <View style={appStyles.noRecord}>
            <Text>No Categories found</Text>
          </View>
        ) : (
          <ScrollView>
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

                    <Text style={ordersStyles.itemCol2}>
                      Status {order.orderStatus || "-"}
                    </Text>
                    <TouchableOpacity style={ordersStyles.itemCol3}>
                      <Icon
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
                    <TouchableOpacity>
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
    </View>
  );
};

export default Orders;
