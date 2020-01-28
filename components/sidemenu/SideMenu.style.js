import { StyleSheet, StatusBar } from "react-native";
export const SideMenuStyles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#3D6CB9"
  },
  shopName: {
    color: "white",
    marginBottom: 3
  },
  avatorContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  menuContainer: {
    flexDirection: "row"
  },
  navItemStyle: {
    padding: 10,
    color: "white"
  },
  selectedNavStyle: {
    backgroundColor: "rgba(23, 85, 244, 0.25)",
    color: "white",
    paddingVertical: 10,
    borderLeftWidth: 3,
    borderColor: "#1655f4",
    paddingHorizontal: 10
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "white"
  },
  footerContainer: {
    // flex:1,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "rgba(23, 85, 244, 0.25)"
  },
  logoutBtn: {
    color: "white"
  }
});
