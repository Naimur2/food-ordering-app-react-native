import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Icon, Image, Button } from "react-native-elements";

const Item = () => (
    <View style={styles.item}>
        <View style={styles.imageContainer}>
            <Image
                source={{
                    uri: "http://192.168.0.105:5000/uploads/burger-1636770727589.jpg",
                }}
                style={styles.image}
            />
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.title}>Burger</Text>
            <Text style={styles.price}>100 Tk </Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity
                    style={styles.quantityDecrementButton}
                    onPress={() => {}}
                >
                    <Icon
                        name="minus"
                        type="font-awesome"
                        color="#000"
                        size={20}
                    />
                </TouchableOpacity>
                <Text style={styles.quantity}>1</Text>
                <TouchableOpacity
                    style={styles.quantityIncrementButton}
                    onPress={() => {}}
                >
                    <Icon
                        name="plus"
                        type="font-awesome"
                        color="#000"
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.deleteContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => {}}>
                <Icon name="trash" type="font-awesome" color="#000" size={20} />
            </TouchableOpacity>
        </View>
    </View>
);

export default function CartScreen() {
    return (
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                <Item />
                <Item />
                <Item /> 
                <Item /> 
             
            </ScrollView>
            <View style={styles.totalContainer}>
                <View style={styles.total}>
                    <Text style={styles.totalText}>Total:</Text>
                    <Text style={styles.totalTextValue}>10000 Tk</Text>
                </View>
                <View style={styles.checkoutButtonContainer}>
                    <Button
                        titleStyle={{
                            fontSize: 18,
                            textTransform: "uppercase",
                            color: "white",
                        }}
                        buttonStyle={styles.addToCartButton}
                        title="Checkout"
                        onPress={() => {}}
                        
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingBottom: 80,
    },
    imageContainer: {
        height: "100%",
        width: "30%",
        overflow: "hidden",
        marginRight: 10,
    },
    item: {
        width: "100%",
        backgroundColor: "#fff",
        height: 120,
        borderRadius: 10,
        padding: 5,
        flexDirection: "row",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    infoContainer: {
        //   flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: "50%",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "green",
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: "#000",
    },
    quantityContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        alignSelf: "flex-start",
    },
    quantityIncrementButton: {
        width: 30,
        height: 30,
        backgroundColor: "#cca",
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    quantityDecrementButton: {
        width: 30,
        height: 30,
        backgroundColor: "#cca",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    quantity: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        minWidth: 25,
        height: 30,
        textAlign: "center",
        backgroundColor: "red",
        paddingVertical: 2,
    },
    deleteContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: "20%",
    },
    deleteButton: {
        width: 30,
        height: 30,
        backgroundColor: "#cca",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    totalContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingVertical: 5,
        width: "100%",
        position: "absolute",
        bottom: 0,
        top: "auto",
        zIndex: 1,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    total: {
        width: "50%",
        paddingVertical: 5,
    },
    totalText: {
        fontSize: 20,
        fontWeight: "bold",
        width: "100%",
        color: "green",
        paddingHorizontal: 5,
    },
    totalTextValue:{
        fontSize: 20,
        fontWeight: "bold",
        width: "100%",
        paddingHorizontal: 5,
        color: "darkblue",
    },
  
    checkoutButtonContainer: {
        width: "50%",
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    addToCartButton:{
        backgroundColor: "red",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#ccc",
    }
});
