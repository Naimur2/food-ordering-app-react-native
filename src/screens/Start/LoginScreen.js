import { Formik } from "formik";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import * as yup from "yup";
import DataContext from "../../contexts/data-context";
import CustomerContext from "../../contexts/customer-context";
import AdminContext from "../../contexts/admin-context";

export default function LoginScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(true);
    const customerContext = React.useContext(CustomerContext);
    const adminCtx = React.useContext(AdminContext);

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

    const dataCtx = React.useContext(DataContext);

    const formHandler = async (values) => {
        setIsLoading(true);
        const newData = {
            email: values.email,
            password: values.password,
        };
        try {
            const response = await fetch(
                "http://192.168.0.105:5000/user/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newData),
                }
            );
            const responseJson = await response.json();

            if (response.status === 401) {
                setError(responseJson.error);
            } else if (response.status === 200) {
                // send user data to customer Context
                if (responseJson.user.role === "customer") {
                    customerContext.logInHandler(responseJson);
                }
                if (responseJson.user.role === "admin") {
                    adminCtx.logInHandler(responseJson);
                }
            }

            setIsLoading(false);
        } catch (err) {
            console.log("error here 13",err);
            setIsLoading(false);
        }
    };

    const eyeVisiblity = showPassword ? "visibility-off" : "visibility";

    const loginValidationSchema = yup.object().shape({
        email: yup.string().required("Email Address is Required"),
        password: yup.string().required("Password is required"),
    });

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
                    validationSchema={loginValidationSchema}
                    initialValues={{
                        email: "",
                        password: "",
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
                        <ScrollView style={styles.inner}>
                            <Input
                                style={styles.input}
                                placeholder="Email"
                                errorMessage={errors.email}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                value={values.email}
                                leftIcon={
                                    <Icon
                                        name="email"
                                        type="material"
                                        color="#517fa4"
                                    />
                                }
                            />
                            <Input
                                style={styles.input}
                                placeholder="Password"
                                onChangeText={handleChange("password")}
                                errorMessage={errors.password}
                                onBlur={handleBlur("password")}
                                value={values.password}
                                secureTextEntry={showPassword}
                                maxLength={20}
                                leftIcon={
                                    <Icon
                                        name="vpn-key"
                                        type="material"
                                        color="#517fa4"
                                    />
                                }
                                rightIcon={
                                    values.password.length > 0 ? (
                                        <Icon
                                            name={eyeVisiblity}
                                            type="material"
                                            color="#517fa4"
                                            onPress={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                    ) : null
                                    // rightIcon is a react-native-elements prop
                                }
                            />

                            <View style={styles.buttonContainer}>
                                <Button onPress={handleSubmit} title="Login" />
                            </View>
                            <View style={styles.signUpLinks}>
                                <Text>Don't have any account? </Text>
                                <Text
                                    style={styles.link}
                                    onPress={() =>
                                        navigation.navigate("Register")
                                    }
                                >
                                    Register
                                </Text>
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
        flex: 1,
    },
    inner: {
        padding: 24,
        marginTop: 180,
    },
    input: {
        paddingVertical: 10,
    },
    buttonContainer: {
        paddingVertical: 10,
    },
    signUpLinks: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "20%",
        alignItems: "center",
        paddingVertical: 10,
    },
    link: {
        color: "#517fa4",
        fontWeight: "bold",
    },
});
