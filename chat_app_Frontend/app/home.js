import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useState, useEffect,useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

export default function Home() {
  const [loaded, error] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [getUser, setUser] = useState({});
  const [getData, setData] = useEffect([]);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  async function GetData() {

    let response = await fetch(`${apiUrl}LoadHomeData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: getUser.id,
      }),
    });

    if (response.ok) {

      let json = await response.json();

      console.log(json);

      if (json.status) {

        setData(json.content);

      } else {
        console.log("Error 04");
      }


    } else {
      console.log("Error 03");
    }

  }

  useEffect(() => {

    async function Cheng() {

      let userObject = JSON.stringify(await AsyncStorage.getItem("user"));

      setUser(userObject);

      let response = await fetch(`${apiUrl}UserStatusCheng?id=1&st=2`);

      if (response.ok) {

        let json = await response.json();

        console.log(json);

        if (json.status) {
          console.log("Cheng ok");
        } else {
          console.log("Error 2");
        }

      } else {
        console.log("Error1")
      }

    }

    Cheng();
    GetData();

  }, [getUser]);

  useFocusEffect(
    useCallback(() => {
      const intervalId = setInterval(() => {
        GetData();
      }, 5000);

      return () => clearInterval(intervalId);
    }, [getUser])
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {isSearchActive ? (
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="gray"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            autoFocus
          />
        ) : (
          <Text style={styles.headerText}>Chats</Text>
        )}
        <Pressable
          style={styles.iconButton}
          onPress={() => setIsSearchActive((prev) => !prev)}
        >
          <Ionicons
            name={isSearchActive ? "close" : "search"}
            size={24}
            color="white"
          />
        </Pressable>
        <Pressable
          style={styles.iconButton}
          onPress={async () => {
            router.replace("/profile");
          }}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </Pressable>
      </View>

      {/* Chats List */}
      <ScrollView style={styles.chatList}>
        <View style={styles.chatItem}>
          <View style={styles.avatar}>
            <FontAwesome name="user-circle" size={50} color="gray" />
          </View>
          <Pressable
            style={styles.chatDetails}
            onPress={async () => {
              router.replace("/sendchat");
            }}
          >
            <Text style={styles.chatName}>Contact </Text>
            <Text style={styles.chatMessage} numberOfLines={1}>
              Last message preview goes here...
            </Text>
          </Pressable>
          <View style={styles.chatMeta}>
            <Text style={styles.chatTime}>10:00 AM</Text>
            <Ionicons name="checkmark-done" size={16} color="green" />
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <Pressable style={styles.fab}>
        <Ionicons name="chatbubble" size={28} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf0f5",
  },
  header: {
    height: 70,
    backgroundColor: "#202121",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Montserrat-Bold",
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontFamily: "Montserrat-Regular",
    color: "#202121",
  },
  iconButton: {
    padding: 10,
  },
  chatList: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#edf0f5",
    marginRight: 15,
  },
  chatDetails: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "#202121",
  },
  chatMessage: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    color: "gray",
  },
  chatMeta: {
    alignItems: "flex-end",
  },
  chatTime: {
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
    color: "gray",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0547b0",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
