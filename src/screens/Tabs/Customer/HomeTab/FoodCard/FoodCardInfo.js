import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DeliveryCharge from '../../components/DeliveryCharge';


export default function FoodCardInfo({propData}) {
return (
        <View style={styles.textContainer}>
            <Text style={styles.header}>{propData.title}</Text>
            <Text style={styles.details}>{propData.description}</Text>
            <View style={styles.takaDetails}>
                <View style={styles.iconContainer}>
                    <Text style={styles.taka}>Tk {propData.price}</Text>
                    {propData.discount ? (
                        <Text style={styles.off}>Tk {propData.discount}</Text>
                    ) : null}
                </View>
                <DeliveryCharge value={propData.deliveryCharge} />
            </View>
        </View>
);
}

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 5,
    },
    details: {
        fontSize: 15,
        color: "rgba(0,0,0,0.5)",
        paddingBottom: 5,
    },
    takaDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        alignItems: "center",
    },
    taka: { paddingRight: 5 },
    off: {
        color: "red",
        textDecorationLine: "line-through",
    },
});