import { StyleSheet } from "react-native";
export const ordersStyles = StyleSheet.create({
  orderContainer: {
    fontSize: 12, 
  },
  orderItem: {
    flex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 12
  },
  orderDate:{
    fontSize: 10,
    color:"#B9B3B3"
  },
  itemCol1:{
    flex:6
  },
  itemCol2:{
    flex:3
  },
  itemCol3:{
    flex:1
  },
  orderview:{
    marginTop:15,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  amount:{
    fontSize:14,
    color:"#4DA008",
    paddingRight:10
  }
});
