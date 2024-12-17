import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState, useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function sendchat() {
  const [getText, setText] = useState("");

  const [getData, setData] = useState([]);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const [getUser, setUser] = useState({});

  async function GetChat() {
    try {
      let response = await fetch(`${apiUrl}GetChat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromUser: getUser.id,
          toUser: 2,
        }),
      });
  
      if (response.ok) {
        let json = await response.json();
        if (json.status) {
          if (JSON.stringify(json.chatList) !== JSON.stringify(getData)) {
            setData(json.chatList);
          }
        } else {
          console.log("Error 02");
        }
      } else {
        console.log("Error 01");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const parsedUser = JSON.parse(user || "{}");
        if (parsedUser.id !== getUser.id) {
          setUser(parsedUser);
          await GetChat();
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const intervalId = setInterval(() => {
        GetChat();
      }, 5000);

      return () => clearInterval(intervalId);
    }, [getUser])
  );

  return (
    <SafeAreaView style={stylesheet.container}>
      <View style={stylesheet.header}>
        <View style={stylesheet.view6}>
          {/* <Image source={require("../assets/images/main.jpeg")} style={stylesheet.profileImage} /> */}
          <FontAwesome name="user-circle" size={40} color="black" />
        </View>
        <Text style={stylesheet.text1}>Sahan</Text>
      </View>

      <View style={stylesheet.view1}>
        <FlashList
          contentContainerStyle={stylesheet.flashlist}
          data={getData}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          } // Use item.id if available
          renderItem={({ item }) => (
            <View
              style={
                item.fromUser === getUser.id
                  ? stylesheet.view5
                  : stylesheet.view3
              }
            >
              <Text style={stylesheet.text2}>{item.msg}</Text>
              <View style={stylesheet.view4}>
                <Text style={stylesheet.text3}>{item.time}</Text>
                {item.fromUser === getUser.id ? (
                  <FontAwesome5
                    name={item.status === 1 ? "check-double" : "check"}
                    size={12}
                    color={item.status === 1 ? "#34eb8c" : "#fff"}
                  />
                ) : null}
              </View>
            </View>
          )}
          estimatedItemSize={200}
        />
      </View>

      <View style={stylesheet.view2}>
        <TextInput
          placeholder="Text..."
          placeholderTextColor={"#ccc"}
          style={stylesheet.input1}
          onChangeText={(text) => setText(text)}
          value={getText}
        />

        <Pressable
          style={stylesheet.pressable}
          onPress={async () => {
            console.log(getText + "tetx ok");
            if (getText.trim().length !== 0) {
              console.log(getText);

              let response = await fetch(`${apiUrl}SaveChat`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  fromUser: 1,
                  toUser: 2,
                  msg: getText,
                }),
              });

              if (response.ok) {
                let json = await response.json();

                if (json.status) {
                  setText("");
                  console.log("Ok");
                } else {
                  console.log("Error 02");
                }
              } else {
                console.log("Error 01");
              }
            }
          }}
        >
          <Ionicons name="send" size={24} color="#fff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 70,
    backgroundColor: "#202121",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 10,
  },
  view6: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#edf0f5",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text1: {
    fontSize: 20,
    color: "#fff",
  },
  view1: {
    width: "100%",
    flex: 1,
    backgroundColor: "#edf0f5",
    padding: 10,
    gap: 10,
  },
  view2: {
    height: 70,
    backgroundColor: "#202121",
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  input1: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
    height: 50,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  pressable: {
    height: 50,
    width: 50,
    backgroundColor: "#0547b0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  // chat component

  flashlist: {
    padding: 10,
  },

  view3: {
    backgroundColor: "#202121",
    padding: 10,
    maxWidth: "100%",
    alignSelf: "flex-start",
    gap: 10,
    borderTopEndRadius: 15,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    marginBottom: 10,
  },

  view5: {
    backgroundColor: "#0547b0",
    padding: 10,
    maxWidth: "100%",
    alignSelf: "flex-end",
    gap: 10,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    borderBottomStartRadius: 15,
    marginBottom: 10,
  },

  text2: {
    fontSize: 18,
    color: "#fff",
  },

  text3: {
    color: "#fff",
  },
  view4: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
