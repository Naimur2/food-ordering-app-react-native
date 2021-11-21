import React, { useContext,useState } from "react";
import { StyleSheet, Alert, View, Text } from "react-native";
import { Icon, Button } from "react-native-elements";
import AdminContext from "../../../../contexts/admin-context";
import CustomerContext from "../../../../contexts/customer-context";

export default function AcceptRejectButton({ order,role,orderStatus }) {
    const adminCtx = useContext(AdminContext);
  

    const statusHandler = async (ord, stat) => {
        await adminCtx.updateOrder(ord, stat);
        Alert.alert("Status Updated");
    };

   

    const orderId = order._id;

 
   

    switch (orderStatus) {
        case "pending":
            return (
                <View>
                    <View style={{ ...styles.status, marginTop: 10 }}>
                        <Button
                            icon={
                                <Icon
                                    style={{ marginRight: 10 }}
                                    name="times"
                                    type="font-awesome"
                                    color="white"
                                    size={15}
                                />
                            }
                            buttonStyle={{
                                paddingHorizontal: 50,
                                backgroundColor: "red",
                                borderRadius: 10,
                            }}
                            title="Decline"
                            onPress={() => statusHandler(order, "rejected")}
                        />

                        <Button
                            icon={
                                <Icon
                                    style={{ marginRight: 10 }}
                                    name="check"
                                    type="font-awesome"
                                    color="white"
                                    size={15}
                                />
                            }
                            buttonStyle={{
                                paddingHorizontal: 50,
                                backgroundColor: "blue",
                                borderRadius: 10,
                            }}
                            title="Accept"
                            onPress={() => statusHandler(order, "accepted")}
                        />
                    </View>
                </View>
            );

        case "processing":
            return (
                <View style={{ paddingHorizontal: 10 }}>
                    <Button
                        icon={
                            <Icon
                                style={{ marginRight: 10 }}
                                name="check"
                                type="font-awesome"
                                color="white"
                                size={15}
                            />
                        }
                        buttonStyle={{
                            paddingHorizontal: 50,
                            backgroundColor: "blue",
                            borderRadius: 10,
                        }}
                        title="Send to delivery."
                        onPress={() => statusHandler(order, "delivering")}
                    />
                </View>
            );
        case "delivering":
            return (
                <View style={{ paddingHorizontal: 10 }}>
                    <Button
                        icon={
                            <Icon
                                style={{ marginRight: 10 }}
                                name="check"
                                type="font-awesome"
                                color="white"
                                size={15}
                            />
                        }
                        buttonStyle={{
                            paddingHorizontal: 50,
                            backgroundColor: "blue",
                            borderRadius: 10,
                        }}
                        title="Mark as Delivered and Completed."
                        onPress={() => statusHandler(order, "completed")}
                    />
                </View>
            );

        default:
            return <></>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
    },
    status: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginBottom: 10,
    },
});
