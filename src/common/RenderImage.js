import React from 'react';
import { Image } from "react-native-elements";

export default function RenderImage({ source, style, containerStyle }){

    return (
        <Image
            source={{
                uri: `http://192.168.0.105:5000/${source}`,
            }}
            containerStyle={containerStyle}
            style={style}
        />
    );
}

