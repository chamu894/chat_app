import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function Home() {
  const [loaded, error] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
        <Pressable style={styles.iconButton}>
          <Ionicons name="search" size={24} color="white" />
        </Pressable>
        <Pressable style={styles.iconButton} onPress={async () => {
            router.replace("/profile");
          }}>
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </Pressable>
      </View>

      {/* Chats List */}
      <ScrollView style={styles.chatList}>
        {Array(10).fill(0).map((_, index) => (
          <View style={styles.chatItem} key={index}>
            <View style={styles.avatar}>
              <FontAwesome name="user-circle" size={50} color="gray" />
            </View>
            <View style={styles.chatDetails}>
              <Text style={styles.chatName}>Contact {index + 1}</Text>
              <Text style={styles.chatMessage} numberOfLines={1}>
                Last message preview goes here...
              </Text>
            </View>
            <View style={styles.chatMeta}>
              <Text style={styles.chatTime}>10:00 AM</Text>
              <Ionicons name="checkmark-done" size={16} color="green" />
            </View>
          </View>
        ))}
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
