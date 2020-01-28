import { StyleSheet, StatusBar } from "react-native";
export const onlineOrderStyles = StyleSheet.create({
  onlineContainer: {
    fontSize: 12,
    paddingTop: StatusBar.currentHeight
  },
  orderItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 12
  },
  orderId: {},
  amount: {},
  moreDetails: {
    color: "#1755F4"
  },
  orderBtns: {
    // flex: 1,
    // flexDirection: 'row-reverse',
    // alignItems: 'flex-end',
    // marginTop: 10,
  },
  positiveBtn: {
    width: 100,
    height: 35
  },
  grayItem: {
    color: "#C4C4C4"
  },
  filterItems: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  aggregatorImg: {
    width: 30,
    height: 30,
    opacity: 0.2,
    marginRight: 2
  },

  aggregatoricon: {
    width: 30,
    height: 30
  },
  selectedAggregatorImg: {
    borderColor: "#1755F4",
    borderWidth: 2,
    borderBottomWidth: 10,
    opacity: 1,
    width: 30,
    height: 30,
    marginRight: 2
  },
  filterChip: {
    borderColor: "#C4C4C4",
    borderWidth: 1,
    marginRight: 2,
    padding: 5,
    borderRadius: 5
  },
  activeFilterChip: {
    borderColor: "#C4C4C4",
    borderWidth: 1,
    marginRight: 2,
    padding: 5,
    backgroundColor: "#1755F4",
    color: "white",
    borderRadius: 5
  }
});
