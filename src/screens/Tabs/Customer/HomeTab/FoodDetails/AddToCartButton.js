import React from "react";
import { View,TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";

const AddToCartButton = ({ style: styles, onPress }) => {
    return (
        <View >
            <Button
                titleStyle={{ fontSize: 18, textTransform: "uppercase" }}
                buttonStyle={styles.addToCartButton}
                title="Add to Cart"
                onPress={onPress}
            />
        </View>
    );
};

export default AddToCartButton;
