import React from 'react';
import { Text, View } from 'react-native';
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
function HeaderView() {
  return (
    <View
      style={{
        position:'absolute',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.lighter,
        top:0,

      }}>
      <Text style={{fontWeight: "bold",
        color:"#1c5698"}}>News Time</Text>
    </View>
  )
}

export default HeaderView;