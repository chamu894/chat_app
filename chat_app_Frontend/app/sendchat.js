import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function sendchat() {
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

                <View style={stylesheet.view3}>
                    <Text style={stylesheet.text2}>Hello Sahan frgvefrd rerderv erfvcerdfv </Text>
                    <View style={stylesheet.view4}>
                        <Text style={stylesheet.text3}>2024/12/10 10:00 am</Text>
                        <FontAwesome name="check" size={12} color="#fff" />
                    </View>
                </View>

                <View style={stylesheet.view5}>
                    <Text style={stylesheet.text2}>Hello Sahan frgvefrd rerderv erfvcerdfv </Text>
                    <View style={stylesheet.view4}>
                        <Text style={stylesheet.text3}>2024/12/10 10:00 am</Text>
                        <FontAwesome name="check" size={12} color="#fff" />
                    </View>
                </View>

            </View>

            <View style={stylesheet.view2}>
                <TextInput
                    placeholder='Text...'
                    placeholderTextColor={"#ccc"}
                    style={stylesheet.input1}
                />
                <Pressable style={stylesheet.pressable}>
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        gap:10,
    },
    view6:{
        width: 50,
        height: 50,
        borderRadius: 25, 
        backgroundColor: "#edf0f5",
        justifyContent:"center",
        alignItems:"center",
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    text1: {
        fontSize: 20,
        color: '#fff',
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

    view3: {
        backgroundColor: "#202121",
        padding: 10,
        maxWidth: "100%",
        alignSelf: "flex-start",
        gap: 10,
        borderTopEndRadius: 15,
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
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
    },

    text2: {
        fontSize: 18,
        color: "#fff",
    },

    text3: {
        color: "#fff",
    },
    view4: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: "flex-end",
        alignItems: "center",
    },
});
