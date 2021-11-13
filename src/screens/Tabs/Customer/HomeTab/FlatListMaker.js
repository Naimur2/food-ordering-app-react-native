import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FoodCard from "./FoodCard/FoodCard";

const List = ({ foods, navigation }) => {
    return (
        <View>
            <Text style={styles.header}>{foods.title}</Text>
            <View>
                {foods.data.map((item, index) => {
                    return (
                        <FoodCard
                            propData={item}
                            key={item._id}
                            navigation={navigation}
                        />
                    );
                })}
            </View>
        </View>
    );
};

const FlatListMaker = ({ data, navigation }) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.sectionListItem}
        >
            {data.map((item, index) => {
                return (
                    <List
                        key={item.title + index}
                        foods={item}
                        navigation={navigation}
                    />
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        paddingVertical: 5,
        marginVertical: 5,
        fontWeight: "bold",
        color: "black",
        paddingLeft: 5,
    },
    title: {
        fontSize: 30,
    },
    sectionListItem: {
        marginHorizontal: 10,
        marginTop: 0,
    },
});

export default FlatListMaker;
