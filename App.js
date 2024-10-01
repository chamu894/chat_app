import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [getImage, setImage] = useState(null);

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

  const logoPath = require("./assets/images/main.jpeg");

  return (
    <LinearGradient colors={["#4c669f", "#3b5998"]} style={stylesheet.view1}>
      <Button
        title="Select Image"
        onPress={async () => {
          let result = await ImagePicker.launchImageLibraryAsync(
            {

            }
          );

          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
        }}
      />

      <Image style={stylesheet.image1} source={getImage} contentFit="contain" />

      <Text style={stylesheet.text1}>Create Account</Text>

      <Text style={stylesheet.text2}>Hello! Welcome to Smart Chat</Text>

      <Text style={stylesheet.text3}>Mobile</Text>
      <TextInput style={stylesheet.input1} inputMode={"tel"} />

      <Text style={stylesheet.text3}>First Name</Text>
      <TextInput style={stylesheet.input1} inputMode={"text"} />

      <Text style={stylesheet.text3}>Last Name</Text>
      <TextInput style={stylesheet.input1} inputMode={"text"} />

      <Text style={stylesheet.text3}>Password</Text>
      <TextInput
        style={stylesheet.input1}
        secureTextEntry={true}
        inputMode={"text"}
      />

      <Pressable style={stylesheet.Pressable1}>
        <FontAwesome6 name={"right-to-bracket"} color={"white"} size={20} />
        <Text style={stylesheet.text4}>Sign Up</Text>
      </Pressable>

      <Pressable
        style={stylesheet.Pressable2}
        onPress={() => {
          Alert.alert("Message", "Go To Sign In");
        }}
      >
        <Text style={stylesheet.text5}>Already Registered? Go To Sign In</Text>
      </Pressable>
    </LinearGradient>
  );
}

const stylesheet = StyleSheet.create({
  view1: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    rowGap: 10,
  },

  text1: {
    fontSize: 32,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
  },

  text2: {
    fontSize: 20,
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
  },

  text3: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    marginTop: 10,
  },

  image1: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },

  input1: {
    width: "100%",
    height: 50,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 15,
    paddingStart: 10,
  },

  text4: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    color: "white",
  },

  Pressable1: {
    height: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    flexDirection: "row",
    columnGap: 10,
  },

  Pressable2: {
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },

  text5: {
    fontSize: 15,
    fontFamily: "Montserrat-Bold",
  },
});
