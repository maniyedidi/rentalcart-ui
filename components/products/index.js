import React, { Component } from "react";
import { Text, ScrollView, View, Switch, TouchableOpacity } from "react-native";
import Pusher from "pusher-js/react-native";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../../constants/endpoints";
import { invokeApi } from "../../services/dataServices";
import { Card, Icon } from "react-native-elements";
import { productStyles } from "./productStyles";
import Loader from "../../shared-components/loader";
import SpidleToast from "../../shared-components/toast";
import registerForPushNotificationsAsync from "../../services/push.notification";
import HeaderBar from "../header";
import { PUSHER_DETAILS_1, PUSHER_DETAILS } from "../../constants";

class ProductsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      categoriesList: [],
      dataLoading: false,
      openedCategory: {},
      shopDetails: {},
      activechip: "all",
      searchKey: "",
      updating: false
    };
    this.spiddlePusher = new Pusher(PUSHER_DETAILS_1.key, PUSHER_DETAILS_1);
    this.channel = "";
  }

  componentDidMount() {
    this.getCategoryList();
    this.getProductList();
    this.getShopDetails();
    registerForPushNotificationsAsync().then(res => {
      console.log("res", res);
    });
  }

  componentWillUnmount() {
    if (this.channel && this.channel.unbind) {
      this.channel.unbind();
    }
  }

  updateProductInstoreAndOnline = (productDetails, dataLabel) => {
    productDetails[dataLabel] = !productDetails[dataLabel];
    const payload = {
      [dataLabel]: productDetails[dataLabel],
      product_id: productDetails.product_id
    };
    if (dataLabel === "online") {
      const { shopDetails = {} } = this.state;
      const { enable_online_platforms = [] } = shopDetails;
      payload["enable_online_platforms"] = enable_online_platforms;
    }
    this.setState({ updating: true });
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.ADD_PRODUCT}`, "PUT", payload)
      .then(data => {
        if (data.message === "Product updated!") {
          this.getProductList();
          this.setState({
            updating: false
          });
        } else {
          this.setState({
            updating: false
          });
        }
      })
      .catch(() =>
        this.setState({
          updating: false
        })
      );
  };

  bulkUpdate = category => {
    const { shopDetails = {}, productList } = this.state;
    const { enable_online_platforms = [] } = shopDetails;
    const currentStatus = this.bulkUpdateOnlineStatus(
      this.getProductsByCategory(category),
      "online"
    );
    const payload = {
      platforms: enable_online_platforms,
      category: (category && category.id) || undefined,
      action: currentStatus ? "disable" : "enable",
      location: "online"
    };
    productList.map(product => {
      if (product.category && product.category.id === category.id) {
        product.online = !currentStatus;
      }
    });
    this.setState({ updating: true, productList: productList });
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.BULK_UPDATE}`, "POST", payload)
      .then(data => {
        if (data.message === "success") {
          this.getProductList();
          this.refs.spidletoast.callToast(data.message, "success");
          this.setState({
            updating: false
          });
        } else {
          this.refs.spidletoast.callToast("Update failed", "error");
          this.setState({
            updating: false
          });
        }
      })
      .catch(() =>
        this.setState({
          updating: false
        })
      );
  };

  getFilterProducts = () => {
    const { productList = [], productFilters = {} } = this.state;
    let filteredProducts = productList;
    if (productFilters.category && productFilters.category.id !== "All") {
      filteredProducts = productList.filter(product => {
        if (
          productFilters.category &&
          product.category &&
          product.category.id === productFilters.category.id
        ) {
          return product;
        }
      });
    }

    return filteredProducts || [];
  };

  bulkUpdateOnlineStatus = (filteredProducts, type = "") => {
    if (filteredProducts.length === 0) {
      return false;
    }
    if (filteredProducts.every(product => product[type.toLowerCase()])) {
      return true;
    } else if (
      filteredProducts.every(product => !product[type.toLowerCase()])
    ) {
      return false;
    } else if (filteredProducts.some(product => product[type.toLowerCase()])) {
      return false;
    }
    return false;
  };

  getProductList = () => {
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.GET_PRODUCT}`, "GET")
      .then(data => {
        if (data && data.length) {
          this.setState({
            productList: data || []
          });
        }
      })
      .catch(() => this.setState({ dataLoading: false }));
  };

  getCategoryList = () => {
    this.setState({ dataLoading: true });
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.CATEGORIES}`, "GET")
      .then(data => {
        this.setState({
          categoriesList: data.data || [],
          dataLoading: false
        });
      })
      .catch(() => this.setState({ dataLoading: false }));
  };

  productList = productList => {
    const { activechip } = this.state;
    let filteredProducts = productList;
    if (activechip !== "all") {
      filteredProducts = productList.filter(product => !product.online);
    }

    if (filteredProducts.length === 0) {
      return (
        <Card containerStyle={{ margin: 0 }}>
          <Text>No Products</Text>
        </Card>
      );
    }
    return filteredProducts.map(product => {
      return (
        <Card
          containerStyle={{ margin: 0, marginHorizontal: 5 }}
          key={product.product_id}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text>{product.item_name}</Text>
            <Switch
              trackColor={{ true: "#ED193A", false: "grey" }}
              thumbColor="white"
              value={product.online}
              onValueChange={switchValue =>
                this.updateProductInstoreAndOnline(product, "online")
              }
            />
          </View>
        </Card>
      );
    });
  };

  getShopDetails = () => {
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.GETSHOP}`, "GET").then(data => {
      if (data.data && data.data.ws_channel_id) {
        this.channel = this.spiddlePusher.subscribe(data.data.ws_channel_id);
        this.channel.bind(PUSHER_DETAILS.PRODUCT_TOGGLE, data =>
          this.toggleEvent(data)
        );
        this.setState({
          shopDetails: data.data || {}
        });
      }
    });
  };

  toggleEvent = data => {
    this.getProductList();
  };
  getProductsByCategory = category => {
    const { productList = [] } = this.state;
    return productList.filter(
      product => product.category && product.category.id === category.id
    );
  };

  selectCategory = category => {
    if (
      this.state.openedCategory &&
      this.state.openedCategory.id !== category.id
    ) {
      this.setState({ openedCategory: category });
    } else {
      this.setState({ openedCategory: {} });
    }
  };

  filterCategory = activechip => {
    this.setState({
      activechip: activechip
    });
  };

  getOutOfStockCount = () => {
    const { productList = [] } = this.state;
    return productList.filter(product => !product.online).length;
  };

  render() {
    const {
      dataLoading,
      categoriesList = [],
      openedCategory = {},
      activechip,
      productList = [],
      searchKey
    } = this.state;
    const { navigation } = this.props;
    let filterCategoryList = categoriesList;
    if (activechip !== "all") {
      filterCategoryList = categoriesList.filter(
        category =>
          this.bulkUpdateOnlineStatus(
            this.getProductsByCategory(category),
            "online"
          ) === false
      );
    }
    if (searchKey !== "") {
      filterCategoryList = categoriesList.filter(category =>
        category.name.toLowerCase().includes(searchKey.toLowerCase())
      );
    }
    return (
      <View style={productStyles.productListContainer}>
        <View style={productStyles.sections}>
          <HeaderBar
            navigation={navigation}
            showSearch={true}
            title="Products"
            searchKey={searchKey}
            onSearch={data => this.setState({ searchKey: data })}
          />
        </View>
        <View style={productStyles.sections}>
          <View style={productStyles.filterContainer}>
            <TouchableOpacity
              style={
                activechip === "all"
                  ? productStyles.activechip
                  : productStyles.filterChip
              }
              onPress={() => this.filterCategory("all")}
            >
              <Text
                style={
                  activechip === "all" ? { color: "white" } : { color: "black" }
                }
              >
                All items ({productList.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                activechip !== "all"
                  ? productStyles.activechip
                  : productStyles.filterChip
              }
              onPress={() => this.filterCategory("outOfStock")}
            >
              <Text
                style={
                  activechip !== "all" ? { color: "white" } : { color: "black" }
                }
              >
                {" "}
                Out of stock ({this.getOutOfStockCount()})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {dataLoading ? (
          <Loader />
        ) : (
          <View>
            <ScrollView style={productStyles.listContainer}>
              <SpidleToast ref="spidletoast" />
              {filterCategoryList.map(category => {
                let products = this.getProductsByCategory(category) || [];
                return (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => this.selectCategory(category)}
                  >
                    <View style={productStyles.categoryContainer}>
                      <Card containerStyle={productStyles.categoryCard}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between"
                          }}
                        >
                          <Text style={productStyles.categoryTitle}>
                            {category.name}
                          </Text>
                          {products.length > 0 && (
                            <Switch
                              trackColor={{ true: "#ED193A", false: "grey" }}
                              thumbColor="white"
                              value={this.bulkUpdateOnlineStatus(
                                products,
                                "online"
                              )}
                              onValueChange={() => this.bulkUpdate(category)}
                            />
                          )}
                        </View>
                        <View style={productStyles.itemCountContainer}>
                          <Text style={{ color: "#1755F4", paddingRight: 5 }}>
                            Products {products.length}
                          </Text>
                          <Icon
                            name={
                              openedCategory.id === category.id
                                ? "angle-right"
                                : "angle-down"
                            }
                            size={20}
                            color="#1755F4"
                            type="font-awesome"
                          />
                        </View>
                      </Card>
                      <View>
                        {openedCategory.id === category.id && (
                          <ScrollView>
                            {this.productList(
                              this.getProductsByCategory(category)
                            )}
                          </ScrollView>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

export default ProductsScreen;
