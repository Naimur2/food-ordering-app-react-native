import React,{useContext} from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import DataContext from "../../../../contexts/data-context";

export default function HomeScreen({navigation}) {

const dataCtx=useContext(DataContext);
const showAlert = () =>
        Alert.alert(
            "Warning",
            "Are you sure to log out?",
            [
                {
                    text: "Cancel",  // or do something,
                    style: "cancel",
                },
                { text: "OK", onPress: dataCtx.onLogOut  }
            ],
            {
                cancelable: true,
                onDismiss: () => null ,
            }
        );
    
    const list = [
        {
            title: "My Account",
            icon: "person",
            onPress:()=> Alert.alert("My Account")
        },
        {
            title: "Track Order",
            icon: "bicycle",
            onPress:()=> Alert.alert("Track")
        },
        {
            title: "Order History",
            icon: "timer",
            onPress:()=> Alert.alert("History")
        },
        {
            title: "Address Book",
            icon: "book",
            onPress:()=> Alert.alert("Address")
        },
        {
            title: "Logout",
            icon: "log-out",
            onPress:showAlert
        },
    ];

    return (
        <View >
            {list.map((item, i) => (
                <ListItem onPress={item.onPress} key={i} bottomDivider>
                    <Icon type="ionicon" name={item.icon} />
                    <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            ))}

        </View>
    );
}

const styles = StyleSheet.create({
    
});
