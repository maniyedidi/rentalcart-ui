import { StyleSheet } from "react-native";
export const orderCartStyles = StyleSheet.create({
  cartContainer: {
    fontSize: 12,
  },
  bodyContainer:{
    backgroundColor:"grey"
  },
  footerContainer:{  
      
  },
  tableRow: {
    flex: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    height:20,
    fontSize:10
  },
  col1: {
    flex: 5,
  },
  col2: {
    flex: 1
  },
  col3: {
    flex: 1
  },
  col4: {
    flex: 1,
    flexDirection: "row",
    justifyContent:"flex-end"
  },
  grandTotal:{
    margin:15,
    flexDirection: "row",
    justifyContent:"flex-end"
  },
  customerDetails:{
  }
});
