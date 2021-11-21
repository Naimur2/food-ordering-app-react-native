import React, { useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Pressable,
} from "react-native";
import CustomerContext from "../../../../contexts/customer-context";
import { Icon, Button } from "react-native-elements";

export default function CategoriesScreen({ navigation }) {
    const customerCtx = useContext(CustomerContext);

    const [selected, setSelected] = React.useState({_id:null});

    const selectAddress = (address) => {
       if (address._id === selected._id) {
          setSelected({_id:null});
         } else {
            setSelected(address);
        }
    };

    const goNextPageHander = () => {
         if (selected && selected._id) {
            navigation.navigate("Order", {address: selected});
         }
         else {
            alert("Please select an address");
         }
      };

    const cardStyle = (id) => {
        if (id === selected._id) {
            return { ...styles.card, ...styles.selectedCard };
        }
        return styles.card;
    };

    return (
        <View>
            <ScrollView
                onPress={() => console.log("object")}
                style={styles.container}
            >
                <Text
                    style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        padding: 10,
                        fontSize: 18,
                    }}
                >
                    Press To Select Address
                </Text>
                {customerCtx.address.map((item,index) => (
                    <Pressable
                        onPress={() => selectAddress(item)}
                        key={item._id}
                        style={() => cardStyle(item._id || index)}
                    >
                        <View>
                            <Text style={{ fontWeight: "bold" }}>
                                Name:{item.name}
                            </Text>
                            <Text style={{ fontWeight: "bold" }}>
                                Address: {item.addressline1} {item.addressline2}
                            </Text>
                            <Text style={{ fontWeight: "bold" }}>
                                Phone: {item.phone}
                            </Text >
                            <Text style={{ fontWeight: "bold" }}>City: Dhaka</Text>
                        </View>
                        <View style={styles.updateContainer}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => {}}
                            >
                                <Icon name="edit" />
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                ))}
                <View
                    style={{
                        marginVertical: 5,
                        position: "relative",
                        paddingHorizontal: 10,
                        paddingTop: 20,
                    }}
                >
                    <Button
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
                </View>
                <View
                    style={{
                        marginVertical: 5,
                        position: "relative",
                        padding: 10,
                    }}
                >
                    <Button
                    buttonStyle={{ backgroundColor: "#A78B00" }}
                    titleStyle={{ color: "white" }}
                        icon={
                            <Icon
                                name="arrow-right"
                                type="font-awesome-5"
                                size={15}
                                style={{ marginRight: 10 }}
                                color="white"
                            />
                        }
                        title="Next"
                        onPress={goNextPageHander}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    selectedCard: {
        backgroundColor: "#ccc",
    },
    container: {
        paddingHorizontal: 10,
    },
    card: {
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
