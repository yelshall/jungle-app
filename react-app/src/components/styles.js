import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  container1: {
    flex: 1,
    backgroundColor: "grey",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    flex: 10,
    backgroundColor: "#90ee90",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    padding: 20,
  },
  preference: {
    flex: 1,
    backgroundColor: "grey",
    padding: 5,
    borderRadius: 10,
  },

  texterView: {
    flexDirection: "row",
    width: "90%",
    marginTop: 10,
    paddingBottom: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  image: {
    marginBottom: 40,
  },
  inputView: {
    flexDirection: "row",
    width: "90%",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },

  TextInput: {
    flex: 1,
    marginTop: 5,
    color: "#05375a",
    paddingLeft: 0,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  forgot_view: {
    borderBottomWidth: 1,
    paddingTop: 10,
  },
  loginBtn: {
    width: "90%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#006400",
  },
});

export { styles };
