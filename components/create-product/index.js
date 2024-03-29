import React, { useState, useEffect } from "react";
import { Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { Button, Card } from "react-native-elements";
import { appStyles } from "../../appStyles";
import { SHOP_ENDPOINTS, DOMAIN_NAME } from "../../constants/endpoints";
import { invokeApi } from "../../services/dataServices";
import { getItems } from "../../redux/actions";

const MODES = {
  edit: "EDIT"
};
const CreateProduct = props => {
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const [itemDetails, setItemDetails] = useState({
    id: Date.now(),
    name: "",
    description: "",
    count: "",
    amount: "",
    categoryId: ""
  });

  const [errors, setErrors] = useState({
    nameErr: false,
    countErr: false,
    amountErr: false
  });

  const saveItem = () => {
    let error = {
      nameErr: false,
      countErr: false,
      amountErr: false
    };

    if (!itemDetails.name) {
      error.nameErr = true;
    }

    if (!itemDetails.count) {
      error.countErr = true;
    }

    if (!itemDetails.amount) {
      error.amountErr = true;
    }

    if (error.nameErr || error.amountErr || error.countErr) {
      setErrors(error);
    } else {
      if (props.mode === MODES.edit) {
        updateItem();
      } else {
        createItem();
      }
    }
  };

  const createItem = () => {
    let payload = {
      ...itemDetails,
      availableCount: itemDetails.count
    };
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.CREATE_ITEM}`, "POST", payload)
      .then(data => {
        if (data.id) {
          navigation.navigate("Home");
          getItems(dispatch);
        } else {
        }
      })
      .catch(() => {});
  };

  const updateItem = () => {
    props.updateItem(itemDetails);
  };

  const onInputChange = (value, dataLable) => {
    setItemDetails({
      ...itemDetails,
      [dataLable]: value
    });
    setErrors({
      ...errors,
      [dataLable + "Err"]: false
    });
  };

  useEffect(() => {
    if (props.item && props.mode === MODES.edit) {
      setItemDetails(props.item);
    }
  }, [props.item]);

  return (
    <View style={{
      padding:10,
      backgroundColor:"#fff"
    }}>
      <TextInput
        style={appStyles.input}
        placeholder="Item Name"
        onChangeText={value => onInputChange(value, "name")}
        value={itemDetails.name}
      />
      <Text style={{ color: "red" }}>{errors.nameErr && "Required"}</Text>
      <TextInput
        style={appStyles.input}
        placeholder="Item Description"
        onChangeText={value => onInputChange(value, "description")}
        value={itemDetails.description}
      />
      <TextInput
        style={appStyles.input}
        placeholder="Total items count"
        keyboardType="number-pad"
        onChangeText={value => onInputChange(+value, "count")}
        value={`${itemDetails.count}`}
      />
      <Text style={{ color: "red" }}>{errors.countErr && "Required"}</Text>
      <TextInput
        style={appStyles.input}
        placeholder={`Item Price`}
        keyboardType="number-pad"
        onChangeText={value => onInputChange(+value, "amount")}
        value={`${itemDetails.amount}`}
      />
      <Text style={{ color: "red" }}>{errors.amountErr && "Required"}</Text>
      <View style={{ margin: 7 }} />
      <Button
        buttonStyle={appStyles.primarybtn}
        onPress={saveItem}
        title={props.mode === MODES.edit ? "Update" : "Create"}
      />
    </View>
  );
};
export default CreateProduct;
