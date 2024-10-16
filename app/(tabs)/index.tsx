

import { View, Text, SafeAreaView, Dimensions, RefreshControl, ActivityIndicator } from 'react-native'
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
import Balance_onebox from '@/components/Balancebox';


export default function index() {
  const image = require('../../assets/images/Mainbackground.png') ; 
  const [solAdd, setsolAdd] = useState<string>('')
  const [ethAdd, setethAdd] = useState<string>('')
  const [cryptokeys, setcryptokeys] = useRecoilState(cryptoKeysAtom)
  const [sol_bal, setsol_bal] = useState<null | number>(null)
  const [eth_bal, seteth_bal] = useState<null | number>(null)
  const [refreshing, setRefreshing] = useState(true);
  const [key, setKey] = useState(0);
  // const [isloading , setisloading ]  = useState(true) ; 

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const forceRerender = () => {
    // Change the key to force re-render
    setKey((prevKey) => prevKey + 1);

  };

  async function loadpage() {
    setRefreshing(true)
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
    setRefreshing(false)
  }



  useEffect(() => {
    loadpage();
  }, [])


  return (
    <ImageBackgroundWrapper image={image}>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadpage} />
        }>
      <SafeAreaView style={styles.container}>
          
          {
            refreshing ? (
              <View style={{
                flex: 1,
                height : 500 ,
                // backgroundColor : 'red'
                opacity :0.8 ,
                justifyContent : 'center' , 
                alignItems : 'center' , 
                alignContent  : 'center'
    
              }}>
               <ActivityIndicator color='white' size='large' />
              </View>
            ) : 
            (
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
                  <ScrollView horizontal={true} style={{ gap: 10, }} key={key}
                    showsHorizontalScrollIndicator={false}
                  >
                    <View style={styles.graphbox}>
                      <Small_graph chain='BIT' />
                    </View>
                    <View style={styles.graphbox}><Small_graph chain='ETH' /></View>
                    <View style={styles.graphbox}><Small_graph chain='SOL' /></View>
                    <View style={styles.graphbox}><Small_graph chain='MAK' /></View>
    
                  </ScrollView>
    
                </View>
    
                <View style={{
                  marginTop: 30,
                  flex: 1,
                  paddingLeft: 0,
                }}>
                  <Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                    marginLeft: 10,
                    fontSize: 24,
                    marginBottom: 20
                  }}> BALANCE </Text>
    
    
                  <ScrollView horizontal={false} style={{
                    gap: 100,
                    width: windowWidth,
                    paddingHorizontal: 15
                  }}>
    
                    <Balance_onebox chain='ETH' balance={eth_bal?.toString()} />
                    <Balance_onebox chain='SOL' balance={sol_bal?.toString()} />
    
                  </ScrollView>
    
                </View>
              </View>
    
            )
          }
          
        

        </SafeAreaView>
      </ScrollView>
    </ImageBackgroundWrapper>
  )
}