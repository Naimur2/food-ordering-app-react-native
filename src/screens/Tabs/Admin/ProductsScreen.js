import React, { useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import AdminContext from "../../../contexts/admin-context";
import { Icon, Image } from "react-native-elements";

export default function ProductsScreen() {
    const { items, categories } = useContext(AdminContext);

    const getCategory = (id) => {
        let cat = categories.filter((c) => c._id === id);
        return cat[0].name;
    };

    return (
        <ScrollView style={styles.container}>
            {items.map((item) => (
                <View key={item._id} style={styles.product}>
                    <View style={{ height: 50, width: 50 }}>
                        <Image
                            style={{ height: 50, width: 50 }}
                            source={{
                                uri:
                                    "http://192.168.0.105:5000/uploads/"+item.images[0],
                            }}
                           
                        />
                    </View>
                    <View>
                        <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Text>{item.price} Tk</Text>
                        <Text>Category: {getCategory(item.category)}</Text>
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
