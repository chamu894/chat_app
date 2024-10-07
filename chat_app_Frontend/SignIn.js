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
import { useState, useEffect } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { registerRootComponent } from "expo";

SplashScreen.preventAutoHideAsync();

function SignIn() {
  const [getMobile, setMobile] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getName, setName] = useState("");

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
    <LinearGradient colors={["#fff", "#fff"]} style={stylesheet.view1}>
      <ScrollView style={stylesheet.scrollview1}>
        <View style={stylesheet.view2}>
          <Image
            style={stylesheet.image1}
            source={logoPath}
            contentFit="contain"
          />

          <Text style={stylesheet.text1}>Sign In</Text>

          <Text style={stylesheet.text2}>Hello! Welcome to Smart Chat</Text>

          <View style={stylesheet.avatar1}>
            <Text style={stylesheet.text6}>{getName}</Text>
          </View>

          <Text style={stylesheet.text3}>Mobile</Text>
          <TextInput
            style={stylesheet.input1}
            inputMode={"tel"}
            onChangeText={(text) => {
              setMobile(text);
            }}
            onEndEditing={async () => {
              if (getMobile.length == 10) {
                let response = await fetch(
                  "https://ee6f-2402-4000-20c2-f6ad-2949-d2ad-3704-6898.ngrok-free.app/chat_app_backend/GetLetters?mobile=" +
                    getMobile
                );

                if (response.ok) {
                  let json = await response.json();
                  setName(json.letters);
                }
              }
            }}
          />

          <Text style={stylesheet.text3}>Password</Text>
          <TextInput
            style={stylesheet.input1}
            secureTextEntry={true}
            inputMode={"text"}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />

          <Pressable
            style={stylesheet.Pressable1}
            onPress={async () => {
              let response = await fetch(
                "https://ee6f-2402-4000-20c2-f6ad-2949-d2ad-3704-6898.ngrok-free.app/chat_app_backend/SignIn",
                {
                  method: "POST",
                  body: JSON.stringify({
                    mobile: getMobile,
                    password: getPassword,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              if (response.ok) {
                let json = await response.json();

                if (json.success) {
                  let user = json.user;
                  Alert.alert(
                    "Success",
                    "Hi " + user.frist_name + ", " + json.message
                  );
                } else {
                  Alert.alert("Error", json.message);
                }
              }
            }}
          >
            <FontAwesome6 name={"right-to-bracket"} color={"white"} size={20} />
            <Text style={stylesheet.text4}>Sign In</Text>
          </Pressable>

          <Pressable
            style={stylesheet.Pressable2}
            onPress={() => {
              Alert.alert("Message", "Go To Sign Up");
            }}
          >
            <Text style={stylesheet.text5}>New User? Go To Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

registerRootComponent(SignIn);

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

  text6: {
    fontSize: 50,
    fontFamily: "Montserrat-Bold",
    color: "blue",
    alignSelf: "center",
  },
});
