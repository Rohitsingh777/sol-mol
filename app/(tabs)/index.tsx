

import { View, Text, SafeAreaView, Dimensions , RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageBackgroundWrapper from '@/components/Imagewrapper'
import * as SecureStore from 'expo-secure-store';
import { useRecoilState } from 'recoil';
import { cryptoKeysAtom } from '@/store/publickeys';
import { getSolanaBalance_dev } from '@/hooks/getBalance';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '@/constants/Styles/Styles';
import Small_graph from '@/components/smallgraph';
import History_onebox from '@/components/historybox';



export default function index() {
  const image = require('../../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure
  const [solAdd, setsolAdd] = useState<string>('')
  const [ethAdd, setethAdd] = useState<string>('')
  const [cryptokeys, setcryptokeys] = useRecoilState(cryptoKeysAtom)
  const [sol_bal, setsol_bal] = useState<null | number>(null)
  const [eth_bal, seteth_bal] = useState<null | number>(null)
  const [refreshing, setRefreshing] = useState(false);

  const [key, setKey] = useState(0);


  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const forceRerender = () => {
    // Change the key to force re-render
    setKey((prevKey) => prevKey + 1);
  };

  async function loadpage(){
    
      const keys = await SecureStore.getItemAsync('ACC0')
      forceRerender();
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
  }



  useEffect(() => {
    loadpage() ; 
  }, [])


  return (
    <ImageBackgroundWrapper image={image}>

      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadpage} />
      }>

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
            // backgroundColor : 'red'
          }}>
            <Text style={{
              color: 'white',
              // fontWeight : 'bold',
              fontSize: 20,
              // backgroundColor :'black'

            }}>Your Balance</Text>

            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 40,

              }}>
                {sol_bal}
                </Text>
          </View>

          <View style={{
            height: 200,
          }}>
            <ScrollView horizontal={true} style={{gap: 10,}} key={key} 
            showsHorizontalScrollIndicator={false}
            >
              <View style={styles.graphbox}>
              <Small_graph chain='BIT' />
              </View>
              <View style={styles.graphbox}><Small_graph chain='ETH'/></View>
              <View style={styles.graphbox}><Small_graph chain='SOL'/></View>
              <View style={styles.graphbox}><Small_graph chain='MAK'/></View>

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
             {/* <History_onebox chain='SOL'/>
              <History_onebox chain='ETH'/>
              <History_onebox chain='SOL'/>
              <History_onebox chain='ETH'/>
              <History_onebox chain='SOL'/>
              <History_onebox chain='ETH'/> */}
              <History_onebox chain='SOL'/>
              <History_onebox chain='ETH'/>


            </ScrollView>

          </View>
        </View>
      </SafeAreaView>


      </ScrollView>

    </ImageBackgroundWrapper>
  )
}