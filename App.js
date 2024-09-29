import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

const mainImagePath = require("./assets/images/main.jpeg")

export default function App() {
  const [loaded, error] = useFonts({
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={stylesheet.view1}>

      <Image style={stylesheet.image1} source={mainImagePath}/>
      
      <Text style={stylesheet.text1}>Sign In</Text>
      <Text style={stylesheet.text2}>
        Hello! Welcome to Smart Chat. Please fill your details to continue
      </Text>

      <Text style={stylesheet.text4}>Mobile</Text>
      <TextInput style={stylesheet.input1} inputMode={"tel"} />

      <Text style={stylesheet.text4}>Password</Text>
      <TextInput style={stylesheet.input1} secureTextEntry={true} />

      <Pressable
        style={stylesheet.pressable1}
        onPress={() => {
          Alert.alert("Testing", "Success");
        }}
      >
        <FontAwesome name={"paper-plane"} size={18} color={"white"}/>
        <Text style={stylesheet.text3}>Sign In</Text>
      </Pressable>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  view1: {
    flex: 1,
    rowGap: 15,
    paddingHorizontal: 25,
    justifyContent: "center",
  },

  text1: {
    fontSize: 28,
    color: "#023e8a",
    fontFamily: "Montserrat-Bold",
  },

  text2: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
  },

  input1: {
    width: "100%",
    height: 40,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor:"#0077b6",
    fontSize: 18,
    paddingStart: 10,
    borderRadius: 10,
    fontFamily: "Montserrat-Regular",
  },

  pressable1: {
    backgroundColor: "#023e8a",
    height: 50,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row",
    columnGap:10,
  },

  text3: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    color: "white",
  },

  text4: {
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    color: "#023e8a",
  },

  image1:{
    width:100,
    height:100,
    alignSelf:"center",
    marginBottom:15,
  }

});
