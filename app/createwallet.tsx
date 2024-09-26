import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import * as  bip39 from 'bip39';
import * as SecureStore from 'expo-secure-store';
import { addSyntheticLeadingComment } from 'typescript';
import { useNavigation, useRouter } from 'expo-router';
import { deriveKeys } from '@/hooks/useCreatekeys';

export default function createwallet() {
const [mnemonic, setMnemonic] = useState('');
const [spinner, setspinner ] = useState(false)
const [mnemonicarr , setmnemonicarr] = useState<string[]>([])

const router = useRouter() ; 

useEffect(()=>{
  generateMnemonic() ; 
},[])

// Function to generate mnemonic
const generateMnemonic = async () => {
  try{
    setspinner(true) ; 
    console.log('trying ');
    const newMnemonic = bip39.generateMnemonic();
    console.log('generated');
    console.log('Mnemonic Phrase:' , newMnemonic );
    const arr = newMnemonic.split(' ')
    setmnemonicarr(arr) ; 
    console.log(arr)
    setMnemonic(newMnemonic)
    //  Convert the mnemonic to a seed
    // const seed = await bip39.mnemonicToSeed(newMnemonic);
    // console.log(seed)
    
  }catch{
    console.log(`something went wrong `)
  }finally{
    setspinner(false)
  }


};

  async function saveandgoahead(){

  alert(`You confirm that that you have saved this Mneumonic string ${mnemonic}` );
  await SecureStore.setItemAsync('mnemonic', mnemonic);
  const currentIndex = 0; // Example index

  // const btcKeys = await deriveKeys(mnemonic, 'BTC', currentIndex);
  // console.log('Bitcoin Keys:', btcKeys );

  const ethKeys = await deriveKeys(mnemonic, 'ETH', currentIndex);
  console.log('Ethereum Keys:', ethKeys);

  const solKeys = await deriveKeys(mnemonic, 'SOL', currentIndex);
  console.log('Solana Keys:', solKeys);

  const keys   = {
    ETH : ethKeys , 
    SOL : solKeys
  }
  const stringkey = JSON.stringify(keys) ; 

  await SecureStore.setItemAsync('ACC0', stringkey );

} 

async function see(){

  const mnemonicgot = await SecureStore.getItemAsync('mnemonic');
  const keys = await SecureStore.getItemAsync('ACC0')

  if (keys != null) {
    console.log(`printing object `)
    console.log(keys)
    const key = JSON.parse(keys)
    console.log(`keys found `)
    console.log(JSON.stringify(key['ETH']))
  }
  else{
    alert('no keys found ')
  }
  
  alert(`your mnemonic is -${mnemonicgot}-`)
  router.push('/(tabs)')

}

return (
  <View style={styles.container}>
    <Text style={styles.title}>Generated Mnemonic:</Text>
    {spinner ? <ActivityIndicator size="small" color="#0000ff" />  : <></> }
    {/* <Text style={styles.mnemonic}>{mnemonic}</Text> */}

    <View style={styles.mnemonicbox}>
    {mnemonicarr.map((str ,index )=>{
      return(
        <View style={styles.mnemonictextbox} key={index}>
        <Text style={{color: 'white' , 
          fontWeight : 'bold',
          margin : 5 ,
          fontSize : 15
        }}>{str}</Text>
        </View>
      )
    })}
    </View>
    <Button title="Generate New Mnemonic" onPress={generateMnemonic} />
    <Button title="Saved it move ahead " onPress={saveandgoahead} />
    <Button title="see " onPress={see} />

  </View>

);

}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 20,
      marginBottom: 10,
    },
    mnemonic: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 20,
      color: '#333',
    },
    mnemonicbox:{
      // display : 'flex' , 
      width : '100%',
      flexDirection : 'row',
      backgroundColor: 'grey',
      justifyContent: 'space-between', // Distributes space between the boxes
      padding: 10,
      flexWrap : 'wrap',
      gap : 10,
    },
    mnemonictextbox :{
      backgroundColor : 'black',
      display : 'flex' , 
      width : '30%',
      justifyContent: 'center',
      alignItems: 'center', // Centers the text within each box
      borderRadius : 5 ,

    }
  });
  