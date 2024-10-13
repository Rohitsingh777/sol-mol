import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { chains, chainState } from '@/store/chain'
import { windowWidth } from '@/constants/Dimenstions'
import { pickerSelectStyles } from '@/constants/Styles/Picker'
import AntDesign from '@expo/vector-icons/AntDesign'
import RNPickerSelect from 'react-native-picker-select';

export default function Pickchain() {
    const [chain , setChain ]  = useRecoilState(chainState)
    useEffect(()=>{
        console.log(chain.chain)
    },[])
  return (
    <View style={{
        width: 350,
        backgroundColor: 'white',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 17,
      }}>
        <View style=
          {{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
          }}>
          <Image

            source={chain.chain == 'SOL' ? require('../assets/images/solicon.png') : require('../assets/images/ethicon.png')} // Image from URL
            style={styles.image}
          />
          <Text style={{
            fontWeight: 'bold',
            fontSize: 20 ,
          }}>{ chain.chain }</Text>
        </View>

        <View style={styles.pickerview}>
          <RNPickerSelect
            onValueChange={(value : 'ETH' | 'SOL') => {
              setChain({chain : value  })
            }}
            items={[
              { label: 'SOL', value: 'SOL' },
              { label: 'ETH', value: 'ETH' },
            ]}
            style={pickerSelectStyles}
            value={chain.chain}
            Icon={() => {
              return <AntDesign name="caretdown" size={20} color="black" />;
            }}
          />
        </View>
    
      </View>



  )
}







const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 40,
        color: 'white'
    },
    cameraContainer: {
        width: '80%',
        aspectRatio: 1,
        overflow: 'hidden',
        borderRadius: 10,
        marginBottom: 40,
    },
    camera: {
        flex: 1,
    },
    button: {

        borderRadius: 10,
        backgroundColor: 'grey',
        width: '45%',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        // alignContent : 'center' , 
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    text: {
        color: 'red'
    },
    bottom: {
        position: 'absolute',
        bottom: 0,    // Stick to the bottom of the screen
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth,
        padding: 20,
        gap: 20,
        height: 90,
        // backgroundColor: "red"
    },
    title: {
        position: 'absolute',
        top: 100,    // Stick to the bottom of the screen 
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    textbox: {
        height: 50, borderColor: 'gray', borderWidth: 1, paddingLeft: 8, borderRadius: 5, width: '100%',
        color: 'white'
    }, 
    pickerview: {
        width: 80,
        backgroundColor: 'white',
        display: 'flex',
        alignContent: 'center',
        borderRadius: 17
      },
    image: {
    // width: 200, // Specify width of the image
    // height: 200, // Specify height of the image
    resizeMode: 'cover', // Adjust the image's scaling
  },
});