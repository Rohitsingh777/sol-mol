import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, Image } from 'react-native';
import ImageBackgroundWrapper from '@/components/Imagewrapper';
import {  useRouter } from 'expo-router';
import { prophistory } from '@/components/historybox';
import { windowWidth } from '@/constants/Dimenstions';

export default function Onetrans(  ) {
// const chain = 'SOL' ; 
  const image = require('../../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure
  const router = useRouter() ; 
  var url  : string  ; 
  var imgurl : string ; 
  
//   const sol_url = 'https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=1';
//   const eth_url = 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1';
//   const bit_url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1' ; 
//   const maker_url = 'https://api.coingecko.com/api/v3/coins/maker/market_chart?vs_currency=usd&days=1' ; 
  
  imgurl = 'https://img.icons8.com/?size=100&id=50284&format=png&color=000000'
  
//   switch(chain){
//     case 'ETH' : {
//       url  = eth_url
//       imgurl = 'https://img.icons8.com/?size=100&id=50284&format=png&color=000000'
      
//       }
//       break ; 
//       case 'SOL' : {
//         url = sol_url ; 
//         imgurl  ='https://img.icons8.com/?size=100&id=icTiMgoOHSVy&format=png&color=000000'
//       }
//       break; 
//       case 'BIT' : {
//         url = bit_url ; 
//         imgurl = 'https://img.icons8.com/?size=100&id=63192&format=png&color=000000'
//       } 
//       break; 
//       case 'MAK' : {
//         url  = maker_url ; 
//         imgurl = 'https://img.icons8.com/?size=100&id=UARsSBUAXiHi&format=png&color=000000'
//       }

//     }

  useEffect(() => {
   
  }, []);


  return (
    <ImageBackgroundWrapper image={image}>

    <View style={styles.container}>
    
    <Image
          source={{uri : imgurl  }}
          style={{
            height : 70 ,
            width : 70,
            borderRadius : 17
          }}
        />

<View style={{
    width : windowWidth/2,
    alignContent : 'center'
}}>
<Text style={styles.title} numberOfLines={1}>To 233899237923842sdfsdfasdfasfasdfasfas37483 </Text>
</View>   

<View style={{
    width : windowWidth/2,
    alignContent : 'center',
    // backgroundColor : 'red', 
    alignItems : 'center'
    }}>
<Text style={styles.amount} numberOfLines={1}>50 Sol </Text>
</View>
    </View>

    </ImageBackgroundWrapper>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount:{
    fontSize: 36 ,
    fontWeight: '500',
    marginBottom: 20,
    color : 'white', 

  },
  title: {
    fontSize: 20 ,
    fontWeight: '400',
    marginBottom: 20,
    color : 'white'
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
    color : 'white'
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
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text : {
    color : 'red'
  }
});