import { Formik } from "formik";
import React, { useState } from "react";
import {
    ActivityIndicator, Alert, KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import * as yup from "yup";

export default function RegisterScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    const showAlert = () =>
        Alert.alert(
            "Error",
            "Please Try a Different Email.",
            [
                {
                    text: "OK",
                    onPress: () => setError(null),  // or do something,
                    style: "cancel",
                },
            ],
            {
                cancelable: true,
                onDismiss: () => setError(null),
            }
        );

    const formHandler = async (values) => {
        const name= values.name.trim().toLowerCase();
        const email= values.email.trim().toLowerCase();
        setIsLoading(true);
        const newData = {
            name,
            email,
            password: values.password,
            role: "customer",
        };
        try {
            const response = await fetch(
                "http://192.168.0.105:5000/user/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newData),
                }
            );
            const responseJson = await response.json();
            setIsLoading(false);
            if (response.status === 400) {       
                setError(responseJson.error);
            } else {
                Alert.alert("Account Was Created Successfully, Please Login!");
                navigation.navigate("Login");
            }
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    };

    const eyeVisiblity = showPassword ? "visibility-off" : "visibility";
    const confirmEyeVisiblity = showConfirmPassword
        ? "visibility-off"
        : "visibility";

    const registerValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter valid email")
            .required("Email Address is Required"),
        name: yup
            .string()
            .min(3, "Name must be at least 3 characters")
            .required("Name is Required"),
        password: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required("Password is required"),
        confirm: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
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
                    validationSchema={registerValidationSchema}
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirm: "",
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
                                placeholder="Name"
                                onChangeText={handleChange("name")}
                                onBlur={handleBlur("name")}
                                errorMessage={errors.name}
                                value={values.name}
                                leftIcon={
                                    <Icon
                                        name="person"
                                        type="material"
                                        color="#517fa4"
                                    />
                                }
                            />
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
                            <Input
                                style={styles.input}
                                placeholder="Confirm Password"
                                onChangeText={handleChange("confirm")}
                                errorMessage={errors.confirm}
                                onBlur={handleBlur("confirm")}
                                value={values.confirm}
                                secureTextEntry={showConfirmPassword}
                                maxLength={20}
                                leftIcon={
                                    <Icon
                                        name="vpn-key"
                                        type="material"
                                        color="#517fa4"
                                    />
                                }
                                rightIcon={
                                    values.confirm.length > 0 ? (
                                        <Icon
                                            name={confirmEyeVisiblity}
                                            type="material"
                                            color="#517fa4"
                                            onPress={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        />
                                    ) : null
                                }
                            />
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={handleSubmit}
                                    title="Register"
                                />
                            </View>
                            <View style={styles.signUpLinks}>
                                <Text>Already have an account?</Text>
                                <Text
                                    style={styles.link}
                                    onPress={() => navigation.navigate("Login")}
                                >
                                    Login
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
        marginTop: 100,
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
