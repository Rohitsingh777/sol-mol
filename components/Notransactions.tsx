

import { View, Text } from 'react-native'
import React from 'react'
import { windowWidth } from '@/constants/Dimenstions'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Notransactions() {
  return (
    <View style={{
        width : windowWidth, 
        justifyContent : 'center' ,
        alignItems : 'center',
        height : '80%'
    }}>
         {/* <FontAwesome name="history" size={50} color="white" /> */}
         <MaterialIcons name="history" size={60} color="white" />
      <Text style={{
        color : 'white' , 
        fontSize : 28 ,
        fontWeight : 'bold'
      }}>No transactions yet </Text>
    <Text style={{
        color : 'white' , 
        fontSize : 16 ,
        fontWeight : '300',
        width : '60%',
        alignContent : 'center',
        justifyContent : 'center',
        textAlign : 'center'
      }}
      numberOfLines={2}
      >After your first transaction you will see it here  </Text>
    </View>
  )
}