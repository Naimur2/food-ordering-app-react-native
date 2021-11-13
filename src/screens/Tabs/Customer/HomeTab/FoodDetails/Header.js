import React from 'react';
import {Text, View} from 'react-native';

export default function Header({data,style:styles}) {
 
return (
    <View style={[styles.info, styles.desc]}>
        <Text style={styles.title}>{data.title}</Text>
        <View>
            {data.discount ? (
                <Text
                    style={{
                        ...styles.price,
                        textDecorationLine: "line-through",
                        textDecorationStyle: "solid",
                        color: "#999",
                    }}
                >
                    Tk:{data.discount}
                </Text>
            ) : null}
            <Text style={styles.price}>Tk:{data.price}</Text>
        </View>
    </View>
    )
}
