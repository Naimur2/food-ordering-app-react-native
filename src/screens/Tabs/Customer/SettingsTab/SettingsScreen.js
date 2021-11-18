import React, { useContext } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import DataContext from "../../../../contexts/data-context";
import CustomerContext from "../../../../contexts/customer-context";

export default function HomeScreen({ navigation }) {
    const dataCtx = useContext(DataContext);
    const customerCtx = useContext(CustomerContext);
    const showAlert = () =>
        Alert.alert(
            "Warning",
            "Are you sure to log out?",
            [
                {
                    text: "Cancel", // or do something,
                    style: "cancel",
                },
                { text: "OK", onPress: customerCtx.logOutHandler },
            ],
            {
                cancelable: true,
                onDismiss: () => null,
            }
        );

    const list = [
        {
            title: "My Account",
            icon: "person",
            onPress: () => Alert.alert("My Account"),
        },
        {
            title: "Track Order",
            icon: "bicycle",
            onPress: () => Alert.alert("Track"),
        },
        {
            title: "Order History",
            icon: "timer",
            onPress: () => Alert.alert("History"),
        },
        {
            title: "Address Book",
            icon: "book",
            onPress: () => Alert.alert("Address"),
        },
        {
            title: "Logout",
            icon: "log-out",
            onPress: showAlert,
        },
    ];
    const userImage = `http://192.168.0.105:5000/avatar/${dataCtx.user.avatar}`;
    const RenderAvatar = ({ title, source }) => (
        <Avatar
            size="large"
            title={title}
            source={{
                uri: source,
            }}
        />
    );

    return (
        <>
            <ListItem style={{alignItems:'center'}}>
                <RenderAvatar
                    title={dataCtx.user.name}
                    source="http://192.168.0.105:5000/avatar/user.jpg"
                />
                <ListItem.Content>
                    <ListItem.Title>{dataCtx.user.name}</ListItem.Title>
                    <ListItem.Subtitle>{dataCtx.user.email}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>

            <View>
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
        </>
    );
}

const styles = StyleSheet.create({});
