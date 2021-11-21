import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import DataContext from "../../../../contexts/data-context";

export default function MyAccountScreen() {
    const { container } = styles;
    const dataCtx = React.useContext(DataContext);

    const { name, email } = dataCtx.user;
    // console.log(Object.entries(user));
    return (
        <View>
           <Text style={{padding:10,textAlign:'center',fontWeight:'bold',fontSize:18}}>Press Any Item to Edit</Text>
            <ListItem bottomDivider>
                <Icon type="font-awesome" name="user" />
                <ListItem.Content>
                    <ListItem.Title>{name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
                <Icon type="font-awesome" name="envelope" />
                <ListItem.Content>
                    <ListItem.Title>{email}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
                <Icon type="font-awesome" name="key" />
                <ListItem.Content>
                    <ListItem.Title>**************</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
                <Icon type="font-awesome" name="plus-circle" />
                <ListItem.Content>
                    <ListItem.Title>Add New Email</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider>
                <Icon type="font-awesome" name="unlock-alt" />
                <ListItem.Content>
                    <ListItem.Title>Forget Password?</ListItem.Title>
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
