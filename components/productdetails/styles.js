import { StyleSheet } from "react-native";
export const orderDetailsStyles = StyleSheet.create({
  orderDetails: {
    flex: 1,
    flexDirection: "column"
  },
  itemsTableHeader: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontWeight: "bold"
  },
  itemsTable: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  itemName: {
    width: "61%"
  },
  item: {
    width: "13%",
    height: 30
  },
  itemsTableFooter: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    justifyContent: "space-between"
  },
  footerItem: {
    height: 30
  },
  footerTextArea: {
    minHeight: 30
  },
  subTitle: {
    fontWeight: "bold"
  },
  statusDetails: {
    flexDirection: "row",
    alignItems: "center"
  },
  status: {
    paddingRight: 5
  },
  details: {
    fontSize: 12,
    color: "#C4C4C4"
  }
});
