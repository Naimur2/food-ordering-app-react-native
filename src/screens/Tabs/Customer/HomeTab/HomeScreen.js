import React, { useEffect, useContext, useState } from "react";
import {RefreshControl, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import PressAbleButton from "../components/PressAbleButton";

import CustomerContext from "../../../../contexts/customer-context";
import FoodListMaker from "./FoodDetails/FoodListMaker";


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }




export default function HomeScreen({ navigation }) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [refreshing, setRefreshing] = React.useState(false);

    const cusCtx = useContext(CustomerContext);

    const categoryChangeHandler = (item) => {
        if (item._id) {
            setSelectedCategory(item._id);
        } else {
            setSelectedCategory(item.key);
        }
    };

    const RenderCatagory = () => {
        const All = { name: "All", key: "All" };
        const newCat = [All, ...cusCtx.category];
        return newCat.map((c, id) => (
            <PressAbleButton
                key={c._id || c.key}
                buttonStyle={
                    c._id === selectedCategory || c.key === selectedCategory
                        ? {
                              ...styles.btnStyle,
                              backgroundColor: "#D3103E",
                              color: "white",
                          }
                        : styles.btnStyle
                }
                title={c.name}
                onPress={() => categoryChangeHandler(c)}
            />
        ));
    };

    const getData = (dataArray, cat) => {
        let cataArray = [];
        if (selectedCategory === "All") {
            cataArray = cat;
        } else {
            cataArray = cat.filter((c) => c._id === selectedCategory);
        }
        return cataArray.map((c) => {
            const newData = dataArray.filter((f) => f.category === c._id);
            return {
                title: c.name,
                data: newData,
            };
        });
    };

   
    const DATA = getData(cusCtx.items, cusCtx.category);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log("refreshing");
        wait(2000).then(() => setRefreshing(false));
      }, []);

    return (
        <>
            {cusCtx.isLoading && (
                <ActivityIndicator
                    style={{
                        position: "absolute",
                        top: "40%",
                        left: "45%",
                    }}
                    size="large"
                    color="red"
                />
            )}
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={styles.pill}
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
            >
                <RenderCatagory />
            </ScrollView>
            <FoodListMaker data={DATA} navigation={navigation} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#EDF5FB",
        alignContent: "center",
    },
    title: {
        fontSize: 32,
    },
    pill: {
        flexDirection: "row",
        justifyContent: "space-around",
        height: 70,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    btnStyle: {
        color: "black",
        backgroundColor: "#E8D6DA",
        paddingHorizontal: 10,
        marginHorizontal: 3,
        minWidth: 110,
        borderRadius: 5,
        borderColor: "#EDF",
        borderWidth: 1,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    active: {
        backgroundColor: "#D3103E",
        color: "white",
    },
    btnTitle: {
        color: "#000",
    },
    activeText: {
        color: "#fff",
    },
});
