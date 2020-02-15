import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Button, Header,Card } from "react-native-elements";
import { appStyles } from "../../appStyles";
import HeaderMenu from "../header/menu";
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
        props.navigation.navigate("Home");
      })
      .catch(() => {});
  };

  return (
    <View>
      <View>
        <Header
          backgroundColor="#3D6CB9"
          placement="left"
          leftComponent={<HeaderMenu navigation={navigation} />}
          centerComponent={{
            text: "Create Category",
            style: { color: "#fff" }
          }}
        />
      </View>
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
