import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { Components1 } from "./components/Components1";

export default function App() {

  return (
    <View style={styleSheet.view1}>
      
      <Components1 fname={"Chamudith"} lname={"Bandara"}/>

      <Components1 fname={"Buddima"} lname={"Bandara"}/>

    </View>
  );
}

const styleSheet = StyleSheet.create({
  view1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap:20,
  },

});
