import { StyleSheet } from "react-native";
export const sellStyles = StyleSheet.create({
  onlineContainer: {
    fontSize: 12, 
  },
  orderItemRow: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  name:{
    fontWeight:"bold",
    fontSize:18
  },
  count:{
    fontSize:14,
    color:"green"
  },
  addRemoveBtns:{
    flexDirection: "column",
    alignItems:"center",
    justifyContent: "space-between",
  }
});