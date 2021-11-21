import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function AddFood() {
   const {container} = styles;

return (
   <View style={container}>
       <Text>AddFood</Text>
   </View>
);
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'space-around',
   },
});