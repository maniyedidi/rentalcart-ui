import { StyleSheet, StatusBar } from "react-native";

export const productStyles = StyleSheet.create({
  categoryCard: {
    margin: 0,
    marginBottom: 5
  },
  sections: {
    height: 50,
    padding: 10
  },
  categoryContainer: {},
  categoryTitle: {
    fontWeight: "bold"
  },
  filterContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  productListContainer: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: "column"
  },
  listContainer: {
    flexDirection: "column"
  },
  filterChip: {
    borderWidth: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "#C4C4C4"
  },
  activechip: {
    backgroundColor: "#1755F4",
    borderWidth: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "#C4C4C4"
  },
  headerBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  itemCountContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});
