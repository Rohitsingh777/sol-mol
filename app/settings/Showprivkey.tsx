import { View, Text, TextStyle, ViewStyle, Image, ImageStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { windowWidth } from '@/constants/Dimenstions'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '@/constants/Styles/Styles'
import ImageBackgroundWrapper from '@/components/Imagewrapper'
import * as SecureStore from 'expo-secure-store';
import Privatekeybox from '@/components/Privatekeybox'

export default function Showprivkey() {
  const image = require('../../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure
  const [keys, setKeys] = useState<string | null>('')
  const [solPkey, setSolPkey] = useState<string | null>(null)
  const [ethPkey, setEthPkey] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      console.log(`triggered `)
      const keys = await SecureStore.getItemAsync('ACC0');
      console.log(keys)
      keys && setKeys(keys)
      const keysjson = JSON.parse(keys!);
      setSolPkey(keysjson.SOL.privateKey)
      setEthPkey(keysjson.ETH.privateKey)
      console.log(`ended`)
    })();
  }, [])
  return (
    <ImageBackgroundWrapper image={image}>
      <SafeAreaView style={styles.container}>
        <View style={{
          flex: 1,
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          // backgroundColor : 'red', 
          width: windowWidth,
          justifyContent: 'center',
          padding: 20
        }}>
          <Text style={$heading}> Your PrivetKeys  </Text>

          <View style={{
            gap: 20
          }}>

            <Privatekeybox chain='SOL' text={solPkey} />
            <Privatekeybox chain='ETH' text={ethPkey} />

          </View>



        </View>
      </SafeAreaView>
    </ImageBackgroundWrapper>
  )
}


// type privetkeyprops  = {
//   icon : icon
// }


// function Privetkeybox(props : privetkeyprops ){
//   const {icon , key } = props 
// }



const $imglogo: ImageStyle = {
  resizeMode: 'cover',
  height: 60,
  width: 60
}
const $keystring: TextStyle = {
  flex: 1,
  fontWeight: '500',
  color: 'white',
  overflow: 'hidden',
  flexWrap: 'wrap'
}

const $heading: TextStyle = {
  fontWeight: 'bold',
  fontSize: 30,
  color: 'white',
  marginBottom: 30
}


const $box: ViewStyle = {
  padding: 10,
  flexDirection: 'row',
  height: 100,
  width: '100%',
  backgroundColor: 'black',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10
}