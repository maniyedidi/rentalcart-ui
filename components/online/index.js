import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, ScrollView, View, Image, TouchableOpacity } from "react-native";
import { invokeApi } from "../../services/dataServices";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../../constants/endpoints";
import { Card, Button } from "react-native-elements";
import { appStyles } from "../../appStyles";
import {
  subscribePushed,
  pusherNewOrder,
  pusherUpdateOrder,
  getRiderUpdate,
  getStoreUpdate,
  unBind
} from "../../services/pusher.services";
import { onlineOrderStyles } from "./styles";
import {
  ONLINE_ORDER_STATES,
  CHANNEL_TYPES,
  ORDER_ACTION_BUTTONS
} from "../../constants";
import moment from "moment";
import zomato from "../../assets/zomato.png";
import food_panda from "../../assets/food_panda.png";
import uber_eats from "../../assets/uber_eats.png";
import swiggy from "../../assets/swiggyicon.png";
import all from "../../assets/all.png";
import { storeData } from "../../services/storage.service";
import SpidleToast from "../../shared-components/toast";
import Loader from "../../shared-components/loader";
import OnlineStatus from "../online-status";
import HeaderBar from "../header";
import { Icon } from "react-native-elements";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import { Audio } from "expo-av";

const source = require("../../assets/sounds/ring.mp3");

import { getShopdetails } from "../../redux/actions";
class OnlineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectUrl: "",
      ordersList: [],
      channelTypes: [],
      dataLoading: false,
      openOrderDetails: false,
      openFilter: false,
      searchKey: "",
      selectedOrder: {},
      selectedAggregator: "",
      pastOrdersList: [],
      statusFilter: "action",
      onlineStatus: {},
      shopOpened: false,
      searchKey: "",
      playingStatus: "nosound"
    };
  }

  componentDidMount() {
    this.getShopStatus();
    this.getOnlineOrders();
    this.getShopDetails();
    this.getPastOnlineOrders();
  }
   // play sound start
  playMySound = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      staysActiveInBackground: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true
    });

    const { sound } = await Audio.Sound.create(
      source,
      {
        shouldPlay: true,
        isLooping: true
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      playingStatus: "playing"
    });
  };

  async _pauseAndPlayRecording() {
    if (this.sound != null) {
      if (this.state.playingStatus == "playing") {
        console.log("pausing...");
        await this.sound.pauseAsync();
        console.log("paused!");
        this.setState({
          playingStatus: "donepause"
        });
      } else {
        console.log("playing...");
        await this.sound.playAsync();
        console.log("playing!");
        this.setState({
          playingStatus: "playing"
        });
      }
    }
  }

  _syncPauseAndPlayRecording() {
    if (this.sound != null) {
      if (this.state.playingStatus == "playing") {
        this.sound.pauseAsync();
      } else {
        this.sound.playAsync();
      }
    }
  }

  _playAndPause = () => {
    switch (this.state.playingStatus) {
      case "nosound":
        this.playMySound();
        break;
      case "donepause":
      case "playing":
        this._pauseAndPlayRecording();
        break;
    }
  };

  // play sound end
  
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.shopDetails &&
      nextProps.shopDetails.name &&
      nextProps.shopDetails.name !== this.state.shopDetails.name
    ) {
      this.setState({
        shopDetails: nextProps.shopDetails
      });
    }
  }

  componentWillUnmount() {
    unBind();
  }

  componentWillReceiveProps(nextProps) {}

  getShopDetails = () => {
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.GETSHOP}`, "GET").then(data => {
      if (data.data && data.data.ws_channel_id) {
        subscribePushed(data.data.ws_channel_id);
        pusherNewOrder(this.handelNewOrder);
        pusherUpdateOrder(this.handelUpdateOrder);
        getRiderUpdate(this.handelRiderUpdate);
        getStoreUpdate(this.toggleEvent);
        this.setState({
          shopDetails: data.data || {}
        });
      }
    });
  };

  toggleEvent = data => {
    this.getShopStatus();
  };
  getShopStatus = () => {
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.ONLINE_STATUS}`, "GET").then(
      data => {
        if (data && data.data) {
          let shopOpened = true;
          for (var i in data.data) {
            if (!data.data[i]) {
              shopOpened = false;
            }
          }
          this.setState({
            shopOpened: shopOpened,
            onlineStatus: data.data || false
          });
        }
      }
    );
  };

  handelNewOrder = newOrder => {
    const { ordersList } = this.state;
    this.playMySound();
    const updatedOrderList = [newOrder, ...ordersList];
    if (
      newOrder.current_state === "Placed" ||
      newOrder.current_state === "Placed"
    ) {
      this.setState({ ordersList: updatedOrderList, playSound: true });
    } else {
      this.setState({ ordersList: updatedOrderList });
    }
  };

  handelRiderUpdate = (riderDetails = {}) => {
    let { ordersList, selectedOrder } = this.state;
    const updatedOrderList = [];
    ordersList.forEach(order => {
      if (order.display_id === riderDetails.channel_order_id) {
        selectedOrder = {
          ...order,
          ...riderDetails
        };
        updatedOrderList.push(selectedOrder);
      } else {
        updatedOrderList.push(order);
      }
    });
    this.setState({
      ordersList: updatedOrderList,
      selectedOrder: selectedOrder
    });
  };

  handelUpdateOrder = updatedOrder => {
    const { ordersList = [] } = this.state;
    ordersList.map(item => {
      if (item.urbanpiper_order_id === updatedOrder.channel_order_id) {
        item.current_state = updatedOrder.new_state;
      }
    });
    if (
      updatedOrder.new_state === "Completed" ||
      updatedOrder.new_state === "Cancelled"
    ) {
      this.setState({ ordersList: ordersList });
    } else {
      this.setState({ ordersList: ordersList });
    }
  };

  getOnlineOrders = () => {
    this.setState({ dataLoading: true });
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.ONLINE_ORDERS}`, "POST")
      .then(data => {
        this.setState({
          ordersList: data.data || [],
          dataLoading: false
        });
      })
      .catch(() => this.setState({ dataLoading: false }));
  };

  getPastOnlineOrders = () => {
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.PAST_ONLINE_ORDERS}`, "POST")
      .then(data => {
        if (data.data) {
          this.setState({
            pastOrdersList: data.data || []
          });
        }
      })
      .catch(() => this.setState({ dataLoading: false }));
  };

  positiveButtonClick = order => {
    this.updateOrder(order, this.getNextState(order.current_state));
  };

  negativeButtonClick = order => {
    this.updateOrder(order, "Cancelled");
  };

  getNextState = current_state => {
    return ONLINE_ORDER_STATES[ONLINE_ORDER_STATES.indexOf(current_state) + 1];
  };

  updateOrder = (order, newStatus) => {
    this._pauseAndPlayRecording();
    const payLoad = {
      message: "please process new state",
      new_status: newStatus
    };
    this.setState({ dataLoading: true });
    invokeApi(
      `${DOMAIN_NAME}${SHOP_ENDPOINTS.UPDATE_ONLINE_ORDER}${order.urbanpiper_order_id}/`,
      "PUT",
      payLoad
    )
      .then(data => {
        if (data.message === "success") {
          this.getOnlineOrders();
        } else {
          this.refs.spidletoast.callToast("Update failed", "error");
        }
        this.setState({ dataLoading: false });
      })
      .catch(() => this.setState({ dataLoading: false }));
  };

  onlineFilters = () => {
    const { selectedAggregator = "", statusFilter = "" } = this.state;

    return (
      <View style={onlineOrderStyles.filterItems}>
        <TouchableOpacity
          onPress={() => this.setState({ statusFilter: "action" })}
        >
          <Text
            style={
              statusFilter === "action"
                ? onlineOrderStyles.activeFilterChip
                : onlineOrderStyles.filterChip
            }
          >
            Action Required
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.setState({ statusFilter: "noaction" })}
        >
          <Text
            style={
              statusFilter === "noaction"
                ? onlineOrderStyles.activeFilterChip
                : onlineOrderStyles.filterChip
            }
          >
            No Action{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.setState({ statusFilter: "completed" })}
        >
          <Text
            style={
              statusFilter === "completed"
                ? onlineOrderStyles.activeFilterChip
                : onlineOrderStyles.filterChip
            }
          >
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Menu>
            <MenuTrigger>
              <View>
                <Icon name="filter" size={25} type="font-awesome" />
              </View>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                onSelect={() => this.setState({ selectedAggregator: "" })}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={all}
                    style={
                      selectedAggregator === ""
                        ? onlineOrderStyles.selectedAggregatorImg
                        : onlineOrderStyles.aggregatorImg
                    }
                  />
                  <Text
                    style={{ fontSize: 15, fontWeight: "bold", paddingLeft: 5 }}
                  >
                    {" "}
                    All
                  </Text>
                </View>
              </MenuOption>
              <MenuOption
                onSelect={() =>
                  this.setState({ selectedAggregator: CHANNEL_TYPES["swiggy"] })
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={swiggy}
                    style={
                      selectedAggregator === CHANNEL_TYPES["swiggy"]
                        ? onlineOrderStyles.selectedAggregatorImg
                        : onlineOrderStyles.aggregatorImg
                    }
                  />
                  <Text
                    style={{ fontSize: 15, fontWeight: "bold", paddingLeft: 5 }}
                  >
                    {" "}
                    Swiggy
                  </Text>
                </View>
              </MenuOption>
              <MenuOption
                onSelect={() =>
                  this.setState({ selectedAggregator: CHANNEL_TYPES["zomato"] })
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={zomato}
                    style={
                      selectedAggregator === CHANNEL_TYPES["zomato"]
                        ? onlineOrderStyles.selectedAggregatorImg
                        : onlineOrderStyles.aggregatorImg
                    }
                  />
                  <Text
                    style={{ fontSize: 15, fontWeight: "bold", paddingLeft: 5 }}
                  >
                    {" "}
                    Zomato
                  </Text>
                </View>
              </MenuOption>
              <MenuOption
                onSelect={() =>
                  this.setState({
                    selectedAggregator: CHANNEL_TYPES["food_panda"]
                  })
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={food_panda}
                    style={
                      selectedAggregator === CHANNEL_TYPES["food_panda"]
                        ? onlineOrderStyles.selectedAggregatorImg
                        : onlineOrderStyles.aggregatorImg
                    }
                  />
                  <Text
                    style={{ fontSize: 15, fontWeight: "bold", paddingLeft: 5 }}
                  >
                    {" "}
                    Food pands
                  </Text>
                </View>
              </MenuOption>
              <MenuOption
                onSelect={() =>
                  this.setState({
                    selectedAggregator: CHANNEL_TYPES["uber_eats"]
                  })
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={uber_eats}
                    style={
                      selectedAggregator === CHANNEL_TYPES["uber_eats"]
                        ? onlineOrderStyles.selectedAggregatorImg
                        : onlineOrderStyles.aggregatorImg
                    }
                  />
                  <Text
                    style={{ fontSize: 15, fontWeight: "bold", paddingLeft: 5 }}
                  >
                    {" "}
                    Uber eats
                  </Text>
                </View>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </TouchableOpacity>
      </View>
    );
  };

  filterByAggregator = (ordersList = []) => {
    const { selectedAggregator = "" } = this.state;
    if (selectedAggregator === "") {
      return ordersList;
    } else {
      return ordersList.filter(
        order => order.channel_id === selectedAggregator
      );
    }
  };

  filterByStatus = () => {
    const {
      statusFilter = "",
      pastOrdersList = [],
      ordersList = [],
      selectedAggregator
    } = this.state;
    switch (statusFilter) {
      case "action":
        return this.filterByAggregator(ordersList).filter(
          order =>
            order.current_state !== "Food Ready" &&
            order.current_state !== "Dispatched" &&
            order.current_state !== "Completed" &&
            order.current_state !== "Cancelled"
        );
      case "noaction":
        return this.filterByAggregator(ordersList).filter(
          order =>
            order.current_state === "Dispatched" ||
            order.current_state === "Food Ready"
        );
      case "completed":
        return this.filterByAggregator([
          ...ordersList,
          ...pastOrdersList
        ]).filter(
          order =>
            order.current_state === "Completed" ||
            order.current_state === "Cancelled"
        );
      default:
        return ordersList.filter(
          order => order.channel_id === selectedAggregator
        );
    }
  };

  navToDetailsScreen = order => {
    storeData("OrderDetails", order).then(() => {
      this.props.navigation.navigate("ProductDetails");
    });
  };

  orderButtons = order => {
    switch (order.current_state) {
      case "Completed":
        return (
          <Text style={{ color: "green", fontWeight: "bold" }}>Completed</Text>
        );
      case "Cancelled":
        return (
          <Text style={{ color: "red", fontWeight: "bold" }}>Cancelled</Text>
        );
      case "Dispatched":
        return null;
      case "Acknowledged":
        return (
          <Button
            title={ORDER_ACTION_BUTTONS[order.current_state]}
            buttonStyle={{
              ...appStyles.primarybtn,
              ...onlineOrderStyles.positiveBtn
            }}
            onPress={() => this.positiveButtonClick(order)}
          />
        );
      case "Food Ready":
        return null;
      default:
        return [
          <Button
            title={ORDER_ACTION_BUTTONS[order.current_state]}
            buttonStyle={{
              ...appStyles.primarybtn,
              ...onlineOrderStyles.positiveBtn
            }}
            onPress={() => this.positiveButtonClick(order)}
          />,
          <Button
            title="Decline"
            type="clear"
            onPress={() => this.negativeButtonClick(order)}
          />
        ];
    }
  };

  toggleOnline = (status, key) => {
    const payLoad = {
      action: status,
      platforms: [key]
    };
    this.setState({ dataLoading: true });
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.TOGGLE_ONLINE}`, "POST", payLoad)
      .then(data => {
        if (data && data.message === "success") {
          this.getShopStatus();
          this.setState({ dataLoading: false, shopOpened: true });
        } else {
          this.setState({ dataLoading: false });
        }
      })
      .catch(() => this.setState({ dataLoading: false }));
  };

  getImgae = channel_id => {
    switch (channel_id) {
      case "af4399a4-fdf3-4c51-8307-3e34740622fd":
        return swiggy;
      case "4cf9c608-9a2e-46d8-8e01-d4f49b57b1c9":
        return uber_eats;
      case "52e90028-a67a-4a8e-b9d2-845ccdd3e8be":
        return zomato;
      default:
        return null;
    }
  };

  render() {
    const { dataLoading, shopOpened, onlineStatus, searchKey } = this.state;
    const { navigation } = this.props;
    let filterList = this.filterByStatus();
    if (searchKey !== "") {
      filterList = filterList.filter(order =>
        (`${order.display_id}` || "").includes(searchKey)
      );
    }
    if (dataLoading) {
      return <Loader />;
    }
    if (!shopOpened) {
      return (
        <OnlineStatus
          callBack={status => this.setState({ shopOpened: status })}
          onlineStatus={onlineStatus}
          toggleOnline={this.toggleOnline}
          navigation={navigation}
          shopOpened={shopOpened}
        />
      );
    }
    return (
      <View style={onlineOrderStyles.onlineContainer}>
        <View
          style={{
            height: 55,
            padding: 10
          }}
        >
          <HeaderBar
            navigation={navigation}
            showSearch={true}
            title="Sell"
            searchKey={searchKey}
            onlineStatus={onlineStatus}
            toggleOnline={this.toggleOnline}
            onSearch={data => this.setState({ searchKey: data })}
            showEllipsis={true}
          />
        </View>
        <SpidleToast ref="spidletoast" />
        <View
          style={{
            height: 55,
            padding: 10
          }}
        >
          {this.onlineFilters()}
        </View>
        <View>
          {filterList.length === 0 ? (
            <View style={appStyles.noRecord}>
              <Text>No order found</Text>
            </View>
          ) : (
            <ScrollView>
              {filterList.map(order => {
                return (
                  <TouchableOpacity
                    onPress={() => this.navToDetailsScreen(order)}
                  >
                    <Card containerStyle={{ margin: 0 }}>
                      <View style={onlineOrderStyles.orderItem}>
                        <View style={onlineOrderStyles.orderId}>
                          <Image
                            source={this.getImgae(order.channel_order_id)}
                            style={onlineOrderStyles.aggregatoricon}
                          />
                        </View>
                        <View style={onlineOrderStyles.orderId}>
                          <Text>{order.display_id}</Text>
                          <Text style={onlineOrderStyles.grayItem}>
                            {moment(order.created_at * 1000).fromNow()}
                          </Text>
                        </View>
                        <View style={onlineOrderStyles.amount}>
                          <Text> Rs {order.total_amount}</Text>
                          <Text style={onlineOrderStyles.grayItem}>
                            {" "}
                            {order.payment_type}
                          </Text>
                        </View>
                        <View style={onlineOrderStyles.orderBtns}>
                          {this.orderButtons(order)}
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    shopDetails: (state.spidlepos && state.spidlepos.shopDetails) || {}
  };
};
const mapDispatchToProps = dispatch => ({
  getShopDetails: () => dispatch(getShopdetails())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnlineScreen);
