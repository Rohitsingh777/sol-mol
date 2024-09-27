

import { View, Text, SafeAreaView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageBackgroundWrapper from '@/components/Imagewrapper'
import * as SecureStore from 'expo-secure-store';
import { useRecoilState } from 'recoil';
import { cryptoKeysAtom } from '@/store/publickeys';
import { number } from 'bitcoinjs-lib/src/cjs/script';
import { getSolanaBalance_dev } from '@/hooks/getBalance';
import { FlipInEasyX } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '@/constants/Styles/Styles';
import Small_graph from '@/components/smallgraph';



export default function index() {
  const image = require('../../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure
  const [solAdd, setsolAdd] = useState<string>('')
  const [ethAdd, setethAdd] = useState<string>('')
  const [cryptokeys, setcryptokeys] = useRecoilState(cryptoKeysAtom)
  const [sol_bal, setsol_bal] = useState<null | number>(null)
  const [eth_bal, seteth_bal] = useState<null | number>(null)



  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    (async () => {
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
        setcryptokeys((val) => ({ ...val, sol, eth }))

        const solbal = await getSolanaBalance_dev(sol, 'SOL');
        if (solbal != null) {
          setsol_bal(Math.floor(solbal / 1000000000))
        }

        const ethbal = await getSolanaBalance_dev(eth, 'ETH');
        if (ethbal != null) {
          seteth_bal(ethbal)
        }

        console.log(windowHeight, windowWidth)
      }
    })()


  }, [])


  return (
    <ImageBackgroundWrapper image={image} >

      <SafeAreaView style={styles.container}>
        <View style={{
          flex: 1,
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}>

          <View style={{

            display: "flex",
            alignItems: 'center',
            marginTop: 80,
            marginBottom: 15,
          }}>
            <Text style={{
              color: 'white',
              // fontWeight : 'bold',
              fontSize: 20,

            }}>Your Balance</Text>

            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 40,

              }}>$35000</Text>
          </View>

          <View style={{
            height: 200,
          }}>
            <ScrollView horizontal={true} style={{
              gap: 10,
            }}>
              <View style={styles.graphbox}>
              <Small_graph/>
              </View>
              <View style={styles.graphbox}></View>
              <View style={styles.graphbox}></View>
              <View style={styles.graphbox}></View>

            </ScrollView>

          </View>

          <View style={{
            // width: windowWidth,
            marginTop: 30,
            flex: 1,
            // padding: 10
            // alignItems: 'center'
            paddingLeft: 0,
          }}>
            <Text style={{
              color: 'white',
              fontWeight: 'bold',
              marginLeft: 10,
              fontSize: 16,
              marginBottom: 10
            }}>Transaction History  </Text>


            <ScrollView horizontal={false} style={{
              // gap: 10,
              width: windowWidth,
              // backgroundColor: 'red',
              // padding : 10, 
              paddingHorizontal: 15


            }}>
              <View style={styles.transaction}>
            
              </View>
              <View style={styles.transaction}></View>
              <View style={styles.transaction}></View>
              <View style={styles.transaction}></View>

              <View style={styles.transaction}></View>

              <View style={styles.transaction}></View>

              <View style={styles.transaction}></View>

              <View style={styles.transaction}></View>



            </ScrollView>

          </View>
        </View>
      </SafeAreaView>
    </ImageBackgroundWrapper>
  )
}