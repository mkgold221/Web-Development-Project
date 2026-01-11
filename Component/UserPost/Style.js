import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#EFF2F6",
    paddingBottom: 16,
    marginBottom: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  textContainer: {
    marginLeft: 10,
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#022150",
  },

  location: {
    fontSize: 12,
    color: "#79869F",
    marginTop: 2,
  },

  ellipsis: {
    padding: 8,
  },

  /* ✅ FIXED NAME */
  postImage: {
    alignItems: "center",
    marginVertical: 16,
    paddingHorizontal: 16,
  },

  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
  },

  /* ACTION BAR */
  actions: {
    flexDirection: "row",
    marginTop: 12,
  },

  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },

  actionText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#79869F",
  },
  icon: {
  color: "#79869F",
},

});

export default style;
