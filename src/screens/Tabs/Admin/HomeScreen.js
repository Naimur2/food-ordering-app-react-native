import React,{useContext} from "react";
import { StyleSheet, Alert, View } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import AdminContext from "../../../contexts/admin-context";

const list = [
    {
        title: "All Orders",
        icon: "av-timer",
        path: "Orders",
        type:'material'
    },
    {
        title: "Products",
        icon: "box-open",
        path: "Products",
        type:'font-awesome-5'
    },
    {
        title: "Categories",
        icon: "list",
        path: "Categories",
        type:'font-awesome-5'
    },
    {
        title: "Add New Food",
        icon: "plus-circle",
        path: "AddFood",
        type:'font-awesome-5'
    },
    {
        title: "Add New Category",
        icon: "plus-circle",
        path: "AddCategory",
        type:'font-awesome-5'
    },
    // {
    //     title: "Manage Delivery Mans",
    //     icon: "user-alt",
    //     path: "DeliveryMan",
    //     type:'font-awesome-5'
    // },
    {
        title: "Manage Profile Settings",
        icon: "user-cog",
        path: "ManageProfile",
        type:'font-awesome-5'
    },
    // more items
];

export default function HomeScreen({ navigation }) {
  const adminCtx = useContext(AdminContext);

    const showAlert = () =>
    Alert.alert(
        "Warning",
        "Are you sure to log out?",
        [
            {
                text: "Cancel", // or do something,
                style: "cancel",
            },
            { text: "OK", onPress: adminCtx.logOutHandler },
        ],
        {
            cancelable: true,
            onDismiss: () => null,
        }
    );

    const navigateToScreen = (route) => () => {
        navigation.navigate(route);
    };

    return (
        <View>
            {list.map((item, i) => (
                <ListItem
                    onPress={()=> navigation.navigate(item.path)}
                    key={i}
                    bottomDivider
                >
                    <Icon type={item.type} name={item.icon} />
                    <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            ))}
            <ListItem onPress={showAlert} bottomDivider>
                <Icon name="exit-to-app" />
                <ListItem.Content>
                    <ListItem.Title>Logout</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
    },
});
