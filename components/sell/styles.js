import { StyleSheet } from "react-native";
export const sellStyles = StyleSheet.create({
  sellContainer: {    
    flex: 10,    
  },
  orderItemRow: {
    // flex: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  name: {
    fontWeight: "bold",
    fontSize: 18
  },
  count: {
    fontSize: 14,
    color: "green"
  },
  invalidCount: {
    fontSize: 14,
    color: "red"
  },
  addRemoveBtns: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  countBtn: {
    backgroundColor: "#349AF1",
    width: 60,
    height: 26,
    alignItems:"center",
    justifyContent:"center"
  }
});
