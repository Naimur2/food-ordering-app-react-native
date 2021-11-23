import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function Header({data,}) {
 
return (
    <>
        <View style={[styles.info]}>
            <Text style={styles.title}>{data.title}</Text>
        </View>
        <View style={[ styles.desc]}>
                {data.discount ? (
                    <Text
                        style={{
                            ...styles.price,
                            textDecorationLine: "line-through",
                            textDecorationStyle: "solid",
                            color: "#999",
                        }}
                    >
                        Tk:{data.discount} OFF!
                    </Text>
                ) : null}
                <Text style={styles.price}>Tk:{data.price} Only!</Text>
        </View>
    </>
    )
}

const styles = StyleSheet.create({
    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    desc: {
        marginTop: 10,
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: "white",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        paddingBottom: 5,
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#f00",
    },
});
