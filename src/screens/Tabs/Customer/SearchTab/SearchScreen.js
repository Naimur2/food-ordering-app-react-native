import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function SearchScreen() {
   const {container} = styles;

return (
   <View style={container}>
       <Text>SearchScreen</Text>
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