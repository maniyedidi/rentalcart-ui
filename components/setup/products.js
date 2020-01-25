import React, { Component } from "react";
import { Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { DOMAIN_NAME, SHOP_ENDPOINTS } from "../../constants/endpoints";
import { invokeApi } from "../../services/dataServices";
import { Card } from "react-native-elements";

class ProductsSetupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      productList: [],
      addOnList: [],
      variantList: [],
      noteList: [],
      categoriesList: [],
      dataLoading: false,
      activeSubTab: "Products",
      editCategoryFlag: false,
      searchKey: "",
      productFilters: {
        category: { name: "Category", id: "All" },
        searchKey: ""
      },
      addNewRecordFlag: false,
      categoryDetails: {
        name: "",
        description: ""
      }
    };
  }

  componentDidMount() {
    this.getProductList();
    this.getCategoryList();
  }

  updateProductInstoreAndOnline = (productDetails, dataLabel) => {
    productDetails[dataLabel] = !productDetails[dataLabel];
    const payload = {
      [dataLabel]: productDetails[dataLabel],
      product_id: productDetails.product_id
    };

    this.setState({ dataLoading: true });
    invoke(`${DOMAIN_NAME}${SHOP_ENDPOINTS.ADD_PRODUCT}`, "PUT", payload)
      .then(response => response.json())
      .then(data => {
        if (data.message === "Product updated!") {
          toast.info(data.message);
          this.setState({
            dataLoading: false
          });
        } else {
          toast.error("Updated Failed");
          this.setState({
            dataLoading: false
          });
        }
      });
  };

  bulkUpdate = () => {
    const { productFilters, bulkLocation } = this.state;
    const { shopDetails = {} } = this.props;
    const { enable_online_platforms = [] } = shopDetails;
    const category =
      productFilters.category && productFilters.category.id === "All"
        ? "ALL"
        : productFilters.category.id;
    const payload = {
      platforms: enable_online_platforms,
      category: category || undefined,
      action: this.bulkUpdateOnlineStatus(
        bulkLocation === "instore" ? "available" : bulkLocation
      )
        ? "disable"
        : "enable",
      location: bulkLocation
    };
    this.setState({ dataLoading: true });
    invokeApi(
      `${DOMAIN_NAME}${SHOP_ENDPOINTS.BULK_UPDATE}`,
      "POST",
      payload
    ).then(data => {
      if (data.message === "success") {
        toast.info(`Bulk update successfull`);
        this.getProductList();
        this.setState({
          dataLoading: false,
          openBulkUpdate: false
        });
      } else {
        toast.error("Updated Failed");
        this.setState({
          dataLoading: false,
          openBulkUpdate: false
        });
      }
    });
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

  bulkUpdateOnlineStatus = (type = "") => {
    let filteredProducts = this.getFilterProducts();
    if (filteredProducts && filteredProducts.length === 0) {
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
    this.setState({ dataLoading: true });
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.GET_PRODUCT}`, "GET").then(
      data => {
        if (data && data.length) {
          this.setState({
            productList: data,
            dataLoading: false
          });
        } else {
          this.setState({
            dataLoading: false
          });
        }
      }
    );
  };

  getCategoryList = () => {
    invoke(`${DOMAIN_NAME}${SHOP_ENDPOINTS.CATEGORIES}`, "GET")
      .then(response => response.json())
      .then(data => {
        this.setState({
          categoriesList: data.data || []
        });
      });
  };

  render() {
    const { productList, dataLoading } = this.state;
    return (
      <ScrollView>
        {dataLoading && <ActivityIndicator size="large" color="#1755F4" />}
        {productList.map(product => {
          return (
            <Card containerStyle={{ margin: 0 }}>
              <Text>Name: {product.item_name}</Text>
              <Text>Price: {product.price}</Text>
            </Card>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProductsSetupScreen;
