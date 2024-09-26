

import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageBackgroundWrapper from '@/components/Imagewrapper'
import * as SecureStore from 'expo-secure-store';
import { useRecoilState } from 'recoil';
import { cryptoKeysAtom } from '@/store/publickeys';
import { number } from 'bitcoinjs-lib/src/cjs/script';
import { getSolanaBalance_dev } from '@/hooks/getBalance';



export default function index() {
    const image = require('../../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure
    const [solAdd , setsolAdd ] = useState<string>('')
    const [ethAdd , setethAdd ] = useState<string>('')
    const [cryptokeys , setcryptokeys ] = useRecoilState(cryptoKeysAtom)
    const [sol_bal , setsol_bal ] = useState < null | number >(null)
    const [eth_bal , seteth_bal ] = useState < null | number >(null)

    useEffect(()=>{
    (async ()=>{
      const keys = await SecureStore.getItemAsync('ACC0')

  if (keys != null) {
    console.log(`printing object `)
    console.log(keys)
    const key = JSON.parse(keys)
    console.log(`keys found `)
    const sol = key['SOL'].publicKey
    const eth = key['ETH'].publicKey
      setsolAdd(sol)
      setethAdd(eth)
    setcryptokeys((val)=> ({...val, sol ,eth  }))

   const  solbal  = await  getSolanaBalance_dev(sol ,'SOL') ;
   if(solbal != null) {
    setsol_bal(Math.floor(solbal/1000000000))
   }

   const  ethbal   = await  getSolanaBalance_dev(eth ,'ETH') ;
   if(ethbal != null) {
    seteth_bal(ethbal)
   }

  }
    })()
   

  },[])


  return (
     <ImageBackgroundWrapper image={image}> 
    <View>
      <Text style={{ color : 'white' , }}>Your Balance for IDs </Text>
      <Text  style={{ color : 'white' , }}>ETH : {eth_bal ? (<Text>{eth_bal}</Text>) : (0) }</Text>
      <Text  style={{ color : 'white' , }}>SOL : {sol_bal ? (<Text>{sol_bal}</Text>) : (0) }</Text>

      <Text>RECEIVE </Text>
      <Text> history  </Text>

    </View>
</ImageBackgroundWrapper> 
  )
}