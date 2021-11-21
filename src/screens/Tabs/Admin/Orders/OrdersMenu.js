import React from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Icon } from "react-native-elements";


const list = [
    {
        title: "All Orders",
        icon: "box-open",
        path: "AllOrder",
        type:'font-awesome-5'
    },
    {
        title: "Pending Order",
        icon: "spinner",
        path: "Products",
        type:'font-awesome-5'
    },
    {
        title: "Accepted Orders",
        icon: "thumbs-up",
        path: "AddFood",
        type:'font-awesome-5'
    },
    {
        title: "On Delivery Orders",
        icon: "truck",
        path: "AddCategory",
        type:'font-awesome-5'
    },
    {
        title: "Completed Orders",
        icon: "check",
        path: "AddCategory",
        type:'font-awesome-5'
    },
    {
        title: "Rejected Orders",
        icon: "exclamation-triangle",
        path: "AddCategory",
        type:'font-awesome-5'
    },
    {
        title: "Failed Orders",
        icon: "times-circle",
        path: "AddCategory",
        type:'font-awesome-5'
    },
    // more items
];

export default function OrdersMenu({ navigation }) {
  
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
