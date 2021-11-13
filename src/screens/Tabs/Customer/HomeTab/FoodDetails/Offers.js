import React from 'react';
import { Text, View} from 'react-native';
import DeliveryCharge from "../../components/DeliveryCharge";
import { Icon } from "react-native-elements";

export default function Offers({data,style:styles}) {

return (
    <View style={[{ ...styles.info, paddingVertical: 5 }, styles.desc]}>
        <DeliveryCharge value={data.deliveryCharge} />
        <View style={styles.iconContainer}>
            <Icon
                style={styles.icon}
                name="timer"
                type="material"
                color="#517fa4"
            />
            <Text style={styles.iconText}>
                {!data.deliveryTime ? "15m" : data.deliveryTime}
            </Text>
        </View>
    </View>
);

}
