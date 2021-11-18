import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function SelectAddress({navigation}) {
   const {container} = styles;

return (
   <View style={container}>
       <Text>SelectAddress</Text>
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