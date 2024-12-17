import { DevSettings, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function ProfileUI() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={async () => {
            router.replace("/home");
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <FontAwesome name="user-circle" size={100} color="gray" />
        </View>
        <Text style={styles.profileName}>Sahan</Text>
        <Text style={styles.profileStatus}>Hey there! I am using ChatApp.</Text>
      </View>

      {/* Options Section */}
      <View style={styles.optionsSection}>
        <Pressable style={styles.optionItem}>
          <Ionicons name="pencil" size={24} color="black" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </Pressable>

        <Pressable style={styles.optionItem}>
          <Ionicons name="key" size={24} color="black" />
          <Text style={styles.optionText}>Change Password</Text>
        </Pressable>

        <Pressable
          style={styles.optionItem}
          onPress={async () => {
            await AsyncStorage.setItem("user", "");
            router.replace("/");
          }}
        >
          <Ionicons name="log-out" size={24} color="black" />
          <Text style={styles.optionText}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
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
    paddingHorizontal: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    color: "white",
  },
  profileSection: {
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#edf0f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#202121",
    marginBottom: 5,
  },
  profileStatus: {
    fontSize: 16,
    color: "gray",
  },
  optionsSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 18,
    marginLeft: 15,
    color: "#202121",
  },
});
