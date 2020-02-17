import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Button, Card } from "react-native-elements";
import { appStyles } from "../../appStyles";
import { SHOP_ENDPOINTS, DOMAIN_NAME } from "../../constants/endpoints";
import { invokeApi } from "../../services/dataServices";

const CreateProduct = props => {
  const navigation = props.navigation;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const createItem = () => {
    const payload = {
      id: Date.now(),
      name: name,
      description: description,
      count: count,
      amount: amount,
      categoryId: categoryId
    };
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.CREATE_ITEM}`, "POST", payload)
      .then(data => {
        if (data.id) {
          navigation.navigate("Home");
        } else {
        }
      })
      .catch(() => {});
  };

  return (
    <View>
      <Card>
        <TextInput
          style={appStyles.input}
          placeholder="Item Name"
          onChangeText={value => setName(value)}
          value={name}
        />
        <TextInput
          style={appStyles.input}
          placeholder="Item Description"
          onChangeText={value => setDescription(value)}
          value={description}
        />
        <TextInput
          style={appStyles.input}
          placeholder="Total items count"
          keyboardType="number-pad"
          onChangeText={value => setCount(+value)}
          value={count}
        />
        <TextInput
          style={appStyles.input}
          placeholder="Item Price"
          keyboardType="number-pad"
          onChangeText={value => setAmount(+value)}
          value={amount}
        />
        <View style={{ margin: 7 }} />
        <Button
          buttonStyle={appStyles.primarybtn}
          onPress={createItem}
          title="Create"
        />
        <Text style={{ color: "red" }}>{errorMsg}</Text>
      </Card>
    </View>
  );
};
export default CreateProduct;
