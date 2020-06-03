import { StyleSheet } from "react-native";

export const appStyles = StyleSheet.create({
  primarybtn: {
    backgroundColor: "#0A4BB5"
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderBottomWidth: 1,
    paddingLeft: 5,
    paddingRight: 5
  },
  noRecord: {
    paddingTop: "50%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  headerTitle: {
    fontSize: 22,
    color: "white",
    fontFamily: "Roboto-Bold",
    minWidth: 100
  },
  link: {
    color: "#238DEF",
    fontSize: 14,
    textDecorationLine: "underline"
  },
  dateIcon: {
    position: "absolute",
    left: 0,
    top: 12,
    marginLeft: 0
  },
  dateInput: {
    marginLeft: 36,
    flex: 1,
    height: 40,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "#ddd",
    borderBottomWidth: 1,
    marginTop: 15
  }
});
