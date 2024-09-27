import 'react-native-get-random-values'; // Required for UUID generation
import * as Random from 'expo-random';

if (!global.crypto) {
  global.crypto = {
    // Polyfill for getRandomValues
    getRandomValues: <T extends ArrayBufferView | null>(array: T): T => {
      if (array === null) {
        throw new TypeError('Expected an ArrayBufferView, got null');
      }
      const randomBytes = Random.getRandomBytes(array.byteLength);
      (array as Uint8Array).set(randomBytes);
      return array;
    },
    // Provide stubs for subtle and randomUUID
    subtle: {} as SubtleCrypto, // Stub for subtle crypto API (we're not using it)
    randomUUID: () => {
      throw new Error('randomUUID is not supported in this environment');
    },
  };
}
import { Buffer } from 'buffer';

// Polyfill Buffer for bip39
if (!global.Buffer) {
  global.Buffer = Buffer;
}


import {RecoilRoot} from 'recoil';
import { Stack, useRouter } from "expo-router";
import { ImageBackground, StyleSheet ,View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function RootLayout() {
const image = require('../assets/images/Mainbackground.png');
const router = useRouter() ; 

useEffect(()=>{
  (async ()=>{
    const keys = await SecureStore.getItemAsync('ACC0')

if (keys != null) {
  // console.log(`printing object `)
  // console.log(keys)
  // const key = JSON.parse(keys)
  // console.log(`keys found `)
  // const sol = key['SOL'].publicKey
  // const eth = key['ETH'].publicKey
    router.push('/(tabs)')
}
  })()
 

},[])

return (
    // <View style={styles.container}>
    <RecoilRoot>
    <GestureHandlerRootView style={{ flex: 1 }}>

    <ImageBackground source={image} style={styles.image}>

    <Stack>

      <Stack.Screen name="index"  />
      <Stack.Screen name="start" 
         options={{
          headerShown: false ,
          headerBackTitleVisible: true,
          title : 'Create Wallet' ,
          headerTintColor : 'black' 
         }} 
       />
       <Stack.Screen name="createwallet" />
       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

    </Stack>
    </ImageBackground>


    </GestureHandlerRootView>
    </RecoilRoot>

    // </View>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
  },
});