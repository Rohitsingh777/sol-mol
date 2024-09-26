


import ImageBackgroundWrapper from '@/components/Imagewrapper'
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';

// import { Chevron } from 'react-native-shapes';
// import { down } from 'react-native-vector-icons'

import AntDesign from '@expo/vector-icons/AntDesign';
import { useRecoilState } from 'recoil';
import { cryptoKeysAtom } from '@/store/publickeys';
import QRCode from 'react-native-qrcode-svg';

export default function Receive() {
  const image = require('../../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure
  const btcimg = require('../../assets/images/bitcoinicon.png'); // Adjust the path according to your folder structure
  const [cryptokeys, setcryptokeys] = useRecoilState(cryptoKeysAtom)
  const [chain, setchain] = useState<string>("SOL");
  const [img, setimg] = useState<string>('../../assets/images/solicon.png')
  const [pubkey, setpubkey] = useState(cryptokeys.sol)

  useEffect(() => {
    //change chain string | also the publickey
    //change image 
    (() => {
      if (chain == 'SOL') {
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
          fontSize: 30,
          marginBottom: 20,
        }}>History</Text>
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
        </View>
        <View>
          <Text style={{
            fontWeight: '400',
            fontSize: 16,
            color: 'white',
            margin: 10
          }}>Wallet Address : {chain} </Text>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 12,
            color: 'white',
            // margin: 5
          }}> {pubkey}</Text>
         
        </View>
        
      </View>


    </ImageBackgroundWrapper>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
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
    height: 300,
    width: 300,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendcopy:{
    flexDirection : 'row',
    width : 300 ,
    height  :50 ,
    justifyContent : 'space-between',
    marginTop: 10
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    // borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    // paddingRight: 30, // to ensure the text is not obscured by the arrow
    // backgroundColor : 'grey'
    // alignItems : 'center'
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is not obscured by the arrow
  },
  iconContainer: {
    top: 10,
    right: 1,
  },
});