import { registerRootComponent } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import { FontAwesome6 } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

function Home() {
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
    <LinearGradient colors={["#C5CACF", "#C5CACF"]} style={stylesheet.view1}>
      <View style={stylesheet.view2}>
        <View style={stylesheet.view3}></View>

        <View style={stylesheet.view4}>
          <Text style={stylesheet.text1}>Chamudith Bandara</Text>
          <Text style={stylesheet.text2}>0764733894</Text>
          <Text style={stylesheet.text3}>Since, 10/07/2024</Text>
        </View>
      </View>

      <ScrollView style={stylesheet.scrollview1}>

        <View style={stylesheet.view5}>
          <View style={stylesheet.view6}></View>

          <View style={stylesheet.view4}>
            <Text style={stylesheet.text1}>Kavii Ekanayake</Text>
            <Text style={stylesheet.text4} numberOfLines={1}>Hello! Kavii...</Text>

            <View style={stylesheet.view7}>
              <Text style={stylesheet.text5}>10/07/2024 08:50.am</Text>
              <FontAwesome6 name={"check"} color={"white"} size={20} />
            </View>
          </View>
        </View>

        <View style={stylesheet.view5}>
          <View style={stylesheet.view6}></View>

          <View style={stylesheet.view4}>
            <Text style={stylesheet.text1}>Kumudi Bandara</Text>
            <Text style={stylesheet.text4} numberOfLines={1}>Hello! Kumudi...</Text>

            <View style={stylesheet.view7}>
              <Text style={stylesheet.text5}>10/07/2024 08:50.am</Text>
              <FontAwesome6 name={"check"} color={"white"} size={20} />
            </View>
          </View>
        </View>

        <View style={stylesheet.view5}>
          <View style={stylesheet.view6}></View>

          <View style={stylesheet.view4}>
            <Text style={stylesheet.text1}>Oshadi Bandara</Text>
            <Text style={stylesheet.text4} numberOfLines={1}>Hello! Oshadi...</Text>

            <View style={stylesheet.view7}>
              <Text style={stylesheet.text5}>10/07/2024 08:50.am</Text>
              <FontAwesome6 name={"check"} color={"green"} size={20} />
            </View>
          </View>
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

registerRootComponent(Home);

const stylesheet = StyleSheet.create({
  view1: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },

  view2: {
    flexDirection: "row",
    columnGap: 20,
    alignItems: "center",
  },

  view3: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 40,
  },

  view4: {
    flex: 1,
  },

  text1: {
    fontFamily: "Montserrat-Bold",
    fontSize: 22,
  },

  text2: {
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
  },

  text3: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    alignSelf: "flex-end",
  },

  view5: {
    flexDirection: "row",
    marginVertical: 10,
    columnGap: 20,
  },

  view6: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    borderStyle: "dotted",
    borderWidth: 5,
    borderColor: "blue",
  },

  text4: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
  },

  text5: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    alignSelf: "flex-end",
  },

  scrollview1: {
    marginTop: 30,
  },

  view7:{
    flexDirection:"row",
    columnGap:10,
    alignSelf:"flex-end",
    alignItems:"center",
  },

});
