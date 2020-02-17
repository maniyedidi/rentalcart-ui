import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Button, Card } from "react-native-elements";
import { appStyles } from "../../appStyles";
import { invokeApi } from "../../services/dataServices";
import { SHOP_ENDPOINTS, DOMAIN_NAME } from "../../constants/endpoints";

const CreateCategory = props => {
  const navigation = props.navigation;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const createCategory = () => {
    invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.CREATE_CATEGORY}`, "POST", {
      id: Date.now(),
      name: name,
      description: description
    })
      .then(data => {
        navigation.navigate("Home");
      })
      .catch(() => {});
  };

  return (
    <View>
      <Card>
        <TextInput
          style={appStyles.input}
          placeholder="Category Name"
          onChangeText={value => setName(value)}
          value={name}
        />
        <TextInput
          style={appStyles.input}
          placeholder="Category Description"
          onChangeText={value => setDescription(value)}
          value={description}
        />
        <View style={{ margin: 7 }} />
        <Button
          buttonStyle={appStyles.primarybtn}
          onPress={createCategory}
          title="Create"
        />
        <Text style={{ color: "red" }}>{errorMsg}</Text>
      </Card>
    </View>
  );
};
export default CreateCategory;
