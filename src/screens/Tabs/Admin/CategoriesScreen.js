import React, { useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import AdminContext from "../../../contexts/admin-context";
import { Icon } from "react-native-elements";

export default function CategoriesScreen() {
    const { categories } = useContext(AdminContext);

    return (
        <ScrollView style={styles.container}>
            {categories.map((item) => (
                <View key={item._id} style={styles.product}>
                    <View>
                        <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                        <Text>{item.description}</Text>
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
