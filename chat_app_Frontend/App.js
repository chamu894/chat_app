import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { useState,useEffect } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [getImage, setImage] = useState(null);
  const [getMobile, setMobile] = useState("");
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getPassword, setPassword] = useState("");

  const [loaded, error] = useFonts({
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  useEffect(
    () => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const logoPath = require("./assets/images/main.jpeg");

  return (
    <LinearGradient colors={["#fff", "#fff"]} style={stylesheet.view1}>
      <ScrollView style={stylesheet.scrollview1}>
        <View style={stylesheet.view2}>
          <Image
            style={stylesheet.image1}
            source={logoPath}
            contentFit="contain"
          />

          <Text style={stylesheet.text1}>Create Account</Text>

          <Text style={stylesheet.text2}>Hello! Welcome to Smart Chat</Text>

          <Pressable
            onPress={async () => {
              let result = await ImagePicker.launchImageLibraryAsync({});

              if (!result.canceled) {
                setImage(result.assets[0].uri);
              }
            }}
            style={stylesheet.avatar1}
          >
            <Image
              style={stylesheet.avatar1}
              source={getImage}
              contentFit="contain"
            />
          </Pressable>

          <Text style={stylesheet.text3}>Mobile</Text>
          <TextInput
            style={stylesheet.input1}
            inputMode={"tel"}
            onChangeText={
              (text) => {
              setMobile(text);
            }}
          />

          <Text style={stylesheet.text3}>First Name</Text>
          <TextInput
            style={stylesheet.input1}
            inputMode={"text"}
            onChangeText={
              (text) => {
              setFirstName(text);
            }}
          />

          <Text style={stylesheet.text3}>Last Name</Text>
          <TextInput
            style={stylesheet.input1}
            inputMode={"text"}
            onChangeText={
              (text) => {
              setLastName(text);
            }}
          />

          <Text style={stylesheet.text3}>Password</Text>
          <TextInput
            style={stylesheet.input1}
            secureTextEntry={true}
            inputMode={"text"}
            onChangeText={
              (text) => {
              setPassword(text);
            }}
          />

          <Pressable
            style={stylesheet.Pressable1}
            onPress={async () => {

              let formData = new FormData();
              formData.append("mobile",getMobile);
              formData.append("firstName",getFirstName);
              formData.append("lastName",getLastName);
              formData.append("password",getPassword);

              if(getImage !=null){
                formData.append("avatarImage",{name:"avatar.png",type:"image/png",uri:getImage});
              }

              let response = await fetch(
                "https://815a-2402-4000-b240-4a24-e498-adfe-3778-46e9.ngrok-free.app/chat_app_backend/SignUp",
                {
                  method: "POST",
                  body: formData,
                }
              );

              if (response.ok) {
                let json = await response.json();
                
                if(json.success){
                  Alert.alert("Success", json.message);
                }else{
                  Alert.alert("Error", json.message);
                }

              }
            }}
          >
            <FontAwesome6 name={"right-to-bracket"} color={"white"} size={20} />
            <Text style={stylesheet.text4}>Sign Up</Text>
          </Pressable>

          <Pressable
            style={stylesheet.Pressable2}
            onPress={() => {
              Alert.alert("Message", "Go To Sign In");
            }}
          >
            <Text style={stylesheet.text5}>
              Already Registered? Go To Sign In
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const stylesheet = StyleSheet.create({
  view1: {
    flex: 1,
    justifyContent: "center",
    marginTop: 50,
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
    // borderRadius:100,
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

  avatar1: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#D1D1D1",
    justifyContent: "center",
    alignSelf: "center",
  },

  view2: {
    flex: 1,
    paddingHorizontal: 18,
    rowGap: 5,
  },
});
