import { StyleSheet } from "react-native";
export const onlineOrderStyles = StyleSheet.create({
  productsContainer: {
    flex: 9,
    fontSize: 14
  },
  itemsCard: {
    margin: 0
  },
  itemRow: {
    flex: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  productDetails: {
    fontSize: 12,
    flex: 6
  },
  counts: {
    flex: 3
  },
  actions: {
    flex: 1,
    alignItems:"center",
    justifyContent:"space-around"
  },
  name: {
    fontWeight: "700"
  },
  desc: {
    fontSize: 12,
    fontWeight: "400",
    color: "#CAC5C5"
  }
});
