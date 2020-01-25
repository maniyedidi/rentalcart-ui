import React, { Component } from "react";
import { Text, ScrollView, View } from "react-native";
import { Card, Button } from "react-native-elements";
import { appStyles } from "../../appStyles";
import { orderDetailsStyles } from "./styles";
import { Icon } from "react-native-elements";
import { retrieveData } from "../../services/storage.service";
import { ORDER_STATUS_COLORS } from "../../constants";
import { pushDataChange } from "../../services/pusher.services";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoading: false,
      orderDetails: {}
    };
  }

  componentDidMount() {
    retrieveData("OrderDetails").then(order => {
      if (order) {
        this.setState({
          orderDetails: JSON.parse(order)
        });
      }
    });
  }

  printBill = order => {
    pushDataChange("print_bill", "print_bill", order)
      .then(data => {
        this.props.navigation.goBack();
      })
      .catch(() => this.props.navigation.goBack());
  };

  render() {
    const { orderDetails = {} } = this.state;
    const customer = orderDetails.customer || {};
    return (
      <View style={orderDetailsStyles.orderDetails}>
        <ScrollView>
          <Card containerStyle={{ margin: 0 }}>
            <Text style={orderDetailsStyles.subTitle}>Customer Details</Text>
            <View style={orderDetailsStyles.details}>
              <Text>{customer.name}</Text>
              <Text>{customer.contact}</Text>
              <Text>
                {customer.address &&
                  `${customer.address.line_1 || ""}, ${customer.address
                    .line_2 || ""}`}
              </Text>
              <Text>
                {customer.address &&
                  `${customer.address.sub_locality || ""}, ${customer.address
                    .pin || ""}`}
              </Text>
              {customer.address && customer.address.landmark && (
                <Text>
                  {customer.address && `${customer.address.landmark || ""}`}
                </Text>
              )}
            </View>
          </Card>
          <Card containerStyle={{ margin: 0 }}>
            <Text style={orderDetailsStyles.subTitle}>Order Status</Text>
            <View style={orderDetailsStyles.statusDetails}>
              <View style={orderDetailsStyles.status}>
                <Icon
                  name="circle"
                  size={12}
                  color={
                    ORDER_STATUS_COLORS[orderDetails.current_state] || "#FFF"
                  }
                  type="font-awesome"
                />
              </View>
              <Text>{orderDetails.current_state}</Text>
            </View>
          </Card>

          <Card containerStyle={{ margin: 0 }}>
            <Text style={orderDetailsStyles.subTitle}>Rider Details</Text>
            {!orderDetails.delivery_person_detail ? (
              <Text>Rider not allocated </Text>
            ) : (
              <View style={orderDetailsStyles.details}>
                <Text>
                  {orderDetails.rider_status_history &&
                    (orderDetails.rider_status_history || []).length > 0 &&
                    orderDetails.rider_status_history[
                      orderDetails.rider_status_history.length - 1
                    ]}
                </Text>
                <Text>
                  {orderDetails.delivery_person_detail &&
                    orderDetails.delivery_person_detail.name}
                </Text>
                <Text>
                  {orderDetails.delivery_person_detail &&
                    orderDetails.delivery_person_detail.phone}
                </Text>
              </View>
            )}
          </Card>
          <Card containerStyle={{ margin: 0 }}>
            <View style={orderDetailsStyles.itemsTableHeader}>
              <Text style={orderDetailsStyles.itemName}>Name</Text>
              <Text style={orderDetailsStyles.item}>Qty</Text>
              <Text style={orderDetailsStyles.item}>Price</Text>
              <Text style={orderDetailsStyles.item}>Amt</Text>
            </View>
            {orderDetails &&
              orderDetails.items &&
              orderDetails.items.map(item => {
                return (
                  <View style={orderDetailsStyles.itemsTable} key={item.id}>
                    <Text style={orderDetailsStyles.itemName}>{item.name}</Text>
                    <Text style={orderDetailsStyles.item}>{item.quantity}</Text>
                    <Text style={orderDetailsStyles.item}>{item.price}</Text>
                    <Text style={orderDetailsStyles.item}>
                      {item.quantity * item.price || 0}
                    </Text>
                  </View>
                );
              })}
            <View style={orderDetailsStyles.itemsTableFooter}>
              <Text style={orderDetailsStyles.footerItem}>Subtotal</Text>
              <Text style={orderDetailsStyles.footerItem}>
                Rs {orderDetails.order_subtotal}
              </Text>
            </View>
            <View style={orderDetailsStyles.itemsTableFooter}>
              <Text style={orderDetailsStyles.footerItem}>Other Charges</Text>
              <Text style={orderDetailsStyles.footerItem}>
                Rs {(orderDetails.total_charges || "0") + ".00"}
              </Text>
            </View>
            <View style={orderDetailsStyles.itemsTableFooter}>
              <Text style={orderDetailsStyles.footerItem}>Discount</Text>
              <Text style={orderDetailsStyles.footerItem}>
                Rs {parseFloat(orderDetails.discount || "0").toFixed(2)}
              </Text>
            </View>

            <View style={orderDetailsStyles.itemsTableFooter}>
              <Text style={orderDetailsStyles.footerItem}>CGST(2.5%)</Text>
              <Text style={orderDetailsStyles.footerItem}>
                Rs {parseFloat((orderDetails.total_tax || 0) / 2).toFixed(2)}
              </Text>
            </View>

            <View style={orderDetailsStyles.itemsTableFooter}>
              <Text style={orderDetailsStyles.footerItem}>SGST(2.5%)</Text>
              <Text style={orderDetailsStyles.footerItem}>
                Rs {parseFloat((orderDetails.total_tax || 0) / 2).toFixed(2)}
              </Text>
            </View>
            <View style={orderDetailsStyles.itemsTableFooter}>
              <ScrollView>
                <Text style={orderDetailsStyles.footerItem}>Instructions</Text>
                <Text style={orderDetailsStyles.footerTextArea}>
                  {orderDetails.instructions || ""}
                </Text>
              </ScrollView>
            </View>
            <View style={orderDetailsStyles.itemsTableFooter}>
              <Text style={orderDetailsStyles.footerItem}>Total</Text>
              <Text style={orderDetailsStyles.footerItem}>
                Rs {orderDetails.total_amount}
              </Text>
            </View>
          </Card>
        </ScrollView>
        <Button
          title="Print Bill"
          buttonStyle={appStyles.primarybtn}
          onPress={() => this.printBill(orderDetails)}
        />
      </View>
    );
  }
}

export default ProductDetails;
