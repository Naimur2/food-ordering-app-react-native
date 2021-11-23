import { Formik } from "formik";
import React, { useState,useContext } from "react";
import CustomerContext from "../../../../contexts/customer-context";

import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import * as yup from "yup";

export default function EditAddress({ navigation,route }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const showAlert = () =>
        Alert.alert(
            "Error",
            "Please Try a Different Email.",
            [
                {
                    text: "OK",
                    onPress: () => setError(null), // or do something,
                    style: "cancel",
                },
            ],
            {
                cancelable: true,
                onDismiss: () => setError(null),
            }
        );
const customerCtx= useContext(CustomerContext);
const {value} = route.params;



    const formHandler = async (values) => {
        const address = { ...values,city:"dhaka" };
        await customerCtx.editAddress(address,value._id);
        await Alert.alert("Address Updated Successfully");
        await navigation.goBack();
    };



    const addressValidationSchema = yup.object().shape({

        name: yup
            .string()
            .min(3, "Name must be at least 3 characters")
            .required("Name is Required"),
        addressline1: yup
            .string()
            .min(10, "Area must be at least 10 characters")
            .required("Area is Required"),
        addressline2: yup
            .string()
            .required("Area is Required"),
        phone: yup
            .string("Invalid phone number")
            .min(11, "Phone must be at least 11 characters")
            .max(11, "Phone must be 11 characters")
            .required("Phone number is Required"),
    });

    const inputItems = [
        {
            placeholder: "Name",
            name: "name",
            iconType: "material",
            iconName: "person",
            label: "Enter Name",
        },
        {
            placeholder: "Addres Line 1",
            name: "addressline1",
            iconType: "material",
            iconName: "person",
            label: "Addres Line 1",
        },
        {
            placeholder: "Addres Line 2",
            name: "addressline2",
            iconType: "material",
            iconName: "person",
            label: "Addres Line 2",
        },
        {
            placeholder: "Phone",
            name: "phone",
            iconType: "material",
            iconName: "person",
            label: "Add Phone",
        },
        {
            placeholder: "City",
            name: "city",
            iconType: "material",
            iconName: "person",
            label: "Select City",
            disabled: true,
            defaultValue: "Dhaka",
        },
    ];

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <>
                {error && showAlert()}
                {isLoading && (
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
                <Formik
                    style={styles.inner}
                    validationSchema={addressValidationSchema}
                    initialValues={{
                        name: value.name,
                        city: "Dhaka",
                        addressline1:value.addressline1,
                        addressline2: value.addressline2,
                        phone: value.phone,
                    }}
                    onSubmit={formHandler}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                    }) => (
                        // style,placeholder,name,icontype,icon name, label,secureTextEntry
                        <ScrollView style={styles.innerContainer}>
                            {inputItems.map((item, index) => (
                                <Input
                                    key={index}
                                    key={index}
                                    style={styles.input}
                                    placeholder={item.placeholder}
                                    onChangeText={handleChange(item.name)}
                                    onBlur={handleBlur(item.name)}
                                    errorMessage={errors[item.name]}
                                    value={
                                        item.defaultValue
                                            ? item.defaultValue
                                            : values[item.name]
                                    }
                                    label={item.label}
                                    secureTextEntry={item.secureTextEntry}
                                    disabled={item.disabled}
                                   
                                    leftIcon={
                                        <Icon
                                            name={item.iconName}
                                            type={item.icontype}
                                        />
                                    }
                                />
                            ))}

                            <View style={styles.buttonContainer}>
                                <Button onPress={handleSubmit} title="Save Changes" />
                            </View>
                           
                        </ScrollView>
                    )}
                </Formik>
            </>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    innerContainer: {
        padding: 24,
    },
    input: {
        paddingVertical: 10,
    },
    buttonContainer: {
        paddingVertical: 10,
    },
});
