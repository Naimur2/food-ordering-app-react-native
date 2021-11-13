import React, { useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet, Text, TouchableWithoutFeedback,
    View
} from "react-native";
import { Button, Icon, Input } from "react-native-elements";



export default function LoginScreen({navigation}) {
    const { container, inner, input,link } = styles;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);

    const emailChangeHandler = (text) => {
        setEmail(text);
        console.log(email);
    };
    const passwordChangeHandler = (text) => {
        setPassword(text);
        console.log(text);
    };

    const eyeVisiblity = showPassword ? "visibility-off" : "visibility";

    return (
        <KeyboardAvoidingView
            style={container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {/* Email Input */}
                
                <View style={inner}>
                    <Input
                        style={input}
                        placeholder="Username/Email"
                        value={email}
                        onChangeText={emailChangeHandler}
                        leftIcon={
                            <Icon
                                name="email"
                                type="material"
                                color="#517fa4"
                            />
                        }
                    />
                    {/* Password Input */}
                    <Input
                        style={input}
                        placeholder="Password"
                        value={password}
                        onChangeText={passwordChangeHandler}
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
                            password.length > 0 ? (
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
                        <Button title="Login" />
                    </View>
                    <View style={styles.signUpLinks}>
                       <Text>Don't have an account?</Text>
                          <Text style={link} onPress={()=> navigation.navigate('Register')}>Sign Up</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "center",
    },
    input: {
        paddingVertical: 10,
    },
    buttonContainer:{
        paddingVertical:10
    },
    signUpLinks:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:'20%',
        alignItems:'center',
        paddingVertical:10
    },
    link:{
        color:'#517fa4',
        fontWeight:'bold'
        
    }
});
