import React, { useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import CustomerContext from "../../../../contexts/customer-context";
import { Icon, Button } from "react-native-elements";

export default function CategoriesScreen({ navigation }) {
    const { address } = useContext(CustomerContext);

    return (
        <ScrollView style={styles.container}>
            <Text
                style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "center",
                    paddingVertical: 10,
                }}
            >
                Addresses
            </Text>
            {address.map((item) => (
                <View key={item._id} style={styles.product}>
                    <View>
                        <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                        <Text style={{ fontWeight: "bold" }}>
                            {item.addressline1} {item.addressline2}
                        </Text>
                        <Text style={{ fontWeight: "bold" }}>{item.phone}</Text>
                        <Text>City: Dhaka</Text>
                    </View>
                    <View style={styles.updateContainer}>
                        <TouchableOpacity style={styles.btn} onPress={() => {}}>
                            <Icon name="edit" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => {}}>
                            <Icon name="delete" />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            <Button
                buttonStyle={{ marginVertical: 20 }}
                icon={
                    <Icon
                        name="plus"
                        type="font-awesome-5"
                        size={15}
                        style={{ marginRight: 10 }}
                        color="white"
                    />
                }
                title="Add New Address"
                onPress={() => navigation.navigate("AddAddress")}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    product: {
        width: "100%",
        padding: 10,
        backgroundColor: "#fff",
        borderWidth: 1,
        marginVertical: 5,
        borderRadius: 10,
        borderColor: "#ddd",
        borderBottomWidth: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    updateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    btn: {
        padding: 5,
    },
});
