
import ImageBackgroundWrapper from '@/components/Imagewrapper'
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, SafeAreaView, RefreshControl, FlatList } from 'react-native';
import { useRecoilState } from 'recoil';
import { cryptoKeysAtom } from '@/store/publickeys';
import History_onebox from '@/components/historybox';
import Pickchain from '@/components/Pickchain';
import { chainState } from '@/store/chain';
import { transaction, transactions } from '@/hooks/Gettransactions/solhistory';
import getTransactions from '@/hooks/getTransactions';
import Notransactions from '@/components/Notransactions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router, useRouter } from 'expo-router';

// Get the window dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Receive() {
  const image = require('../../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure
  const btcimg = require('../../assets/images/bitcoinicon.png'); // Adjust the path according to your folder structure
  const [cryptokeys, setcryptokeys] = useRecoilState(cryptoKeysAtom)
  const [chain, setchain] = useRecoilState(chainState)
  const [img, setimg] = useState<string>('../../assets/images/solicon.png')
  const [pubkey, setpubkey] = useState(cryptokeys.sol)
  const [transactions, setTransactions] = useState<transactions>([])
  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(0);
  const router = useRouter(); 

  const getdata = async () => {
    setRefreshing(true)
    // console.log(ans) ; 
    // if (chain.chain == 'SOL') {
    //   setpubkey(cryptokeys.sol)
    //   const solhis = await getAccounthistory(chain.chain,pubkey,1000)
    //   setTransactions(solhis) ; 
    //   console.log(solhis) ; 
    // } else {
    //   setpubkey(cryptokeys.eth);
    //   const ethhis = await getEthTransactions('0xd2f9D5a0308237c484C0b14c8719B2905C568A8b',1000)
    //   setTransactions(ethhis) ; 
    //   console.log(ethhis) ; 
    // }
    if (chain.chain == 'SOL') {
      setpubkey(cryptokeys.sol)

    } else {
      setpubkey(cryptokeys.eth);
    }

    const all_trans = await getTransactions(chain.chain, pubkey, 1000)
    setTransactions(all_trans);

    setRefreshing(false)
  }

  useEffect(() => {
    getdata();
  }, [chain])


  const renderItem = ({ item }: { item: transaction }) => (
    <TouchableOpacity onPress={ ()=> router.push(
      `/(tabs)/onetrans?data=${encodeURIComponent(JSON.stringify(item))}&chain=${chain.chain}`
    )}>

    <History_onebox chain={chain.chain} data={item} />

    </TouchableOpacity>
  );

  return (
    <ImageBackgroundWrapper image={image}>
      <SafeAreaView>
        <View style={styles.container} key={key}>
          <Text style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 30,
            marginBottom: 20,
          }}>History</Text>
          <Pickchain />
          <View>
            <Text style={{
              fontWeight: '400',
              fontSize: 16,
              color: 'white',
              margin: 10
            }}>Wallet Address : {chain.chain} </Text>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 12,
              color: 'white',
              // margin: 5
            }}> {pubkey}</Text>

          </View>



          {/* {
    refreshing ? 
    (
    <View style={{
      flex: 1
    }}>
      <Text>...Loading</Text>
      <Historyskeleton  height={'100%'} width={windowWidth}/>
    </View>) :  */}
          {/* ( */}

          {
            transactions.length > 0 ?
              (
                <FlatList
                  data={transactions}          // Pass your transactions array here
                  renderItem={renderItem}      // Function to render each item
                  keyExtractor={(item, index) => index.toString()} // Unique key for each item
                  initialNumToRender={10}      // Renders 10 items initially, improve scroll performance
                  maxToRenderPerBatch={10}     // Maximum number of items to render per batch
                  windowSize={10}              // Number of items outside of view to keep rendered
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getdata} />
                  }
                  style={{
                    width: windowWidth,
                    paddingHorizontal: 15,
                    marginTop: 10
                  }}
                />
              ) :
              (<View style={{
                flex: 1,
                // backgroundColor : 'red'
                opacity :0.4
              }}>
                <Notransactions/>
              </View>)
          }
        </View>
      </SafeAreaView>
    </ImageBackgroundWrapper>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
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
  sendcopy: {
    flexDirection: 'row',
    width: 300,
    height: 50,
    justifyContent: 'space-between',
    marginTop: 10
  },
  transaction: {
    width: '100%',
    backgroundColor: 'white',
    height: 70,
    margin: 5,
    // borderBlockColor : 'black' ,
    borderRadius: 10
  },
});
