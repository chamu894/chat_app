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
import { useState, useEffect, useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";

SplashScreen.preventAutoHideAsync();

export default function Home() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [getUser, setUser] = useState({});
  const [getData, setData] = useState([]);

  const [loaded, error] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  // Hide Splash Screen once fonts are loaded
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  // Fetch user data and update status
  useEffect(() => {
    async function Cheng() {
      try {
        const userObject = JSON.parse(await AsyncStorage.getItem("user"));
        setUser(userObject);

        const response = await fetch(`${apiUrl}UserStatusCheng?id=1&st=2`);
        if (response.ok) {
          const json = await response.json();
          console.log(json);
        } else {
          console.log("Error updating status");
        }
      } catch (err) {
        console.log("Error fetching user data:", err);
      }
    }

    Cheng();
    GetData();
  }, []);

  // Fetch home data
  async function GetData() {
    try {
      const response = await fetch(`${apiUrl}LoadHomeData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: getUser.id }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.status) {
          setData(json.content);
        } else {
          console.log("Error fetching home data");
        }
      }
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  }

  // Periodically fetch data
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
          onPress={() => router.replace("/profile")}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </Pressable>
      </View>

      <View style={styles.chatList}>
      <FlashList data={getData}
          renderItem={({ item }) =>
            <Pressable style={styles.chatItem} onPress={() => router.replace("/sendchat")}>
              <View style={styles.avatar}>
                <FontAwesome name="user-circle" size={50} color="gray" />
              </View>

              <View style={styles.chatDetails}>
                <Text style={styles.chatName}>{item.name}</Text>
                {
                  item.lastChat !== null ? <Text style={styles.chatMessage} numberOfLines={1}>
                    {item.lastChat.msg}
                  </Text> : null
                }
              </View>
              {
                item.lastChat !== null ? <View style={styles.chatMeta}>
                  <Text style={styles.chatTime}>{item.lastChat.time}</Text>
                </View> : null}
            </Pressable>}
          estimatedItemSize={200}
        />
      </View>

      <Pressable style={styles.fab}>
        <Ionicons name="chatbubble" size={28} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#edf0f5" },
  header: {
    height: 70,
    backgroundColor: "#202121",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  headerText: { fontSize: 20, color: "white", fontFamily: "Montserrat-Bold" },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontFamily: "Montserrat-Regular",
    color: "#202121",
  },
  iconButton: { padding: 10 },
  chatList: { flex: 1, paddingHorizontal: 15, paddingTop: 10 },
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
  chatDetails: { flex: 1 },
  chatName: { fontSize: 18, fontFamily: "Montserrat-Bold", color: "#202121" },
  chatMessage: { fontSize: 14, fontFamily: "Montserrat-Regular", color: "gray" },
  chatMeta: { alignItems: "flex-end" },
  chatTime: { fontSize: 12, fontFamily: "Montserrat-Regular", color: "gray" },
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
