
import ImageBackgroundWrapper from '@/components/Imagewrapper'
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import AntDesign from '@expo/vector-icons/AntDesign';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { cryptoKeysAtom } from '@/store/publickeys';
import QRCode from 'react-native-qrcode-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import copytoclipboar from '@/hooks/copytext';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { pickerSelectStyles } from '@/constants/Styles/Picker';
import { chainState } from '@/store/chain';
import Pickchain from '@/components/Pickchain';

export default function Receive() {


  const image = require('../../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure
  const btcimg = require('../../assets/images/bitcoinicon.png'); // Adjust the path according to your folder structure
  const [cryptokeys, setcryptokeys] = useRecoilState(cryptoKeysAtom)
  // const [chain, setchain] = useState<string>("SOL");
  const [chain , setchain ] = useRecoilState(chainState) ; 
  const [img, setimg] = useState<string>('../../assets/images/solicon.png')
  const [pubkey, setpubkey] = useState(cryptokeys.sol)

  const router = useRouter() ; 
  
  useEffect(() => {
    //change chain string | also the publickey
    //change image 
    (() => {
      if (chain.chain == 'SOL') {
        setpubkey(cryptokeys.sol)
      } else {
        setpubkey(cryptokeys.eth);
      }
    })()
    //change qr 
  }, [chain])
  return (
    <ImageBackgroundWrapper image={image}>


      <View style={styles.container}>
        <Text style={{
          fontWeight: 'bold',
          color: 'white',
          fontSize: 20,
          marginBottom: 20 ,
        }}>Receive</Text>

{/* 
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

              source={chain == 'SOL' ? require('../../assets/images/solicon.png') : require('../../assets/images/ethicon.png')} // Image from URL
              style={styles.image}
            />
            <Text style={{
              fontWeight: '400',
              fontSize: 20
            }}>{chain}</Text>
          </View>

          <View style={styles.pickerview}>
            <RNPickerSelect
              onValueChange={(value) => {
                setchain(value)
              }}
              items={[
                { label: 'SOL', value: 'SOL' },
                { label: 'ETH', value: 'ETH' },
              ]}
              style={pickerSelectStyles}
              value={chain}
              Icon={() => {
                return <AntDesign name="caretdown" size={20} color="black" />;
              }}
            />
          </View>
      
        </View> */}

  <Pickchain/>

        <View>
          <Text style={{
            fontWeight: '400',
            fontSize: 16,
            color: 'white',
            margin: 10
          }}>Wallet Address : {chain.chain} </Text>
          {/* <Text style={{
            fontWeight: '200',
            fontSize: 12,
            color: 'white',
            margin: 5
          }}> {pubkey}</Text> */}

          <View style={styles.qrcode}>
            <QRCode
              value={pubkey || '0'}
              // logo={logoFromFile}
              size={190}
              getRef={(c) => (this.svg = c)
              }
            />
          </View>
        </View>
        <View style={styles.sendcopy} >
          <TouchableOpacity onPress={()=>{copytoclipboar(pubkey)}}>
          <Image
            source={require('../../assets/images/copyicon.png')} // Image from URL
            style={styles.image}
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{router.push('/(tabs)/send')}}>
          <Image
            source={require('../../assets/images/sendicon.png')} // Image from URL
            style={styles.image}
          />
          </TouchableOpacity>

        </View>
      </View>


    </ImageBackgroundWrapper>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
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
  qrcode: {
    height: 210,
    width: 210,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom : 50,
    borderRadius : 10 ,
  },
  sendcopy:{
    flexDirection : 'row',
    width : 300 ,
    height  :50 ,
    justifyContent : 'space-between',
    marginTop: 10
  }
});




// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     // borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 4,
//     color: 'black',
//     // paddingRight: 30, // to ensure the text is not obscured by the arrow
//     // backgroundColor : 'grey'
//     // alignItems : 'center'
//   },
//   inputAndroid: {
//     fontSize: 16,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 4,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is not obscured by the arrow
//   },
//   iconContainer: {
//     top: 10,
//     right: 1,
//   },
// });