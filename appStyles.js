import { StyleSheet } from "react-native";

export const appStyles = StyleSheet.create({
  primarybtn: {
    backgroundColor: "#139EA7"
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderBottomWidth: 1,
    paddingLeft:5,
    paddingRight:5
  },
  noRecord: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  headerTitle: {
    fontWeight: "bold",
    paddingLeft: 10,
    fontSize: 16,
    color: "white"
  }, 
  link:{
    color:"#238DEF",
    fontSize:14,
    textDecorationLine:"underline"
  } 
});
