import { useState } from "react";
import { Button, StyleSheet, View, Text } from "react-native";

export function Components1(props) {

  const [getName,setName] = useState(props.fname+""+props.lname);

  return (
    <View style={stylesheet.view1}>
      <Text style={[stylesheet.text,stylesheet.textGreen]}>{getName}</Text>
      <Button
        title="Change"
        onPress={
          ()=>{
            setName("Name");
          }
        }
      />
    </View>
  );
}

const stylesheet = StyleSheet.create({
  view1: {
    height: 50,
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
  textGreen:{
    color:"green",
  },
  textRed:{
    color:"red",
  },
});
