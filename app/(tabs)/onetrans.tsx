import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, Image, ScrollView } from 'react-native';
import ImageBackgroundWrapper from '@/components/Imagewrapper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { prophistory } from '@/components/historybox';
import { windowHeight, windowWidth } from '@/constants/Dimenstions';
import AntDesign from '@expo/vector-icons/AntDesign';
import { transaction } from '@/hooks/Gettransactions/ethhistory';


export default function Onetrans() {
    const { data } = useLocalSearchParams();
    const Transdata  : transaction  = data ? JSON.parse(decodeURIComponent(data)) : {};

    const image = require('../../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure
    const router = useRouter();
    var url: string;
    var imgurl: string;
    const [datetime , setDatetime] = useState('')
    //   const sol_url = 'https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=1';
    //   const eth_url = 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1';
    //   const bit_url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1' ; 
    //   const maker_url = 'https://api.coingecko.com/api/v3/coins/maker/market_chart?vs_currency=usd&days=1' ; 

    imgurl = 'https://img.icons8.com/?size=100&id=50284&format=png&color=000000'

    //   switch(chain){
    //     case 'ETH' : {
    //       url  = eth_url
    //       imgurl = 'https://img.icons8.com/?size=100&id=50284&format=png&color=000000'

    //       }
    //       break ; 
    //       case 'SOL' : {
    //         url = sol_url ; 
    //         imgurl  ='https://img.icons8.com/?size=100&id=icTiMgoOHSVy&format=png&color=000000'
    //       }
    //       break; 
    //       case 'BIT' : {
    //         url = bit_url ; 
    //         imgurl = 'https://img.icons8.com/?size=100&id=63192&format=png&color=000000'
    //       } 
    //       break; 
    //       case 'MAK' : {
    //         url  = maker_url ; 
    //         imgurl = 'https://img.icons8.com/?size=100&id=UARsSBUAXiHi&format=png&color=000000'
    //       }

    //     }

    useEffect(() => {
        console.log(`something came ` , `-`.repeat(Math.random() * 10))
        console.log(data)

// // Format the date part
// const formattedDate = Transdata.date?.toLocaleDateString('en-GB', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric'
//   });
  
//   // Format the time part
//   const formattedTime =   Transdata.date?.toLocaleTimeString('en-GB', {
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: true
//   });
//   setDatetime(`${formattedDate} ${formattedTime}`)
    // const date = new Date(Transdata.date)
    setDatetime(Transdata.date)
  
}, []);


    return (
        <ImageBackgroundWrapper image={image}>
            <ScrollView style={{
                paddingTop : 100
            }}>
            <View style={styles.container}>
          
                <Image
                    source={{ uri: imgurl }}
                    style={{
                        height: 70,
                        width: 70,
                        borderRadius: 17
                    }}
                />

                <View style={{
                    width: windowWidth / 2,
                    alignContent: 'center'
                }}>
                    <Text style={styles.title} numberOfLines={1}>To {Transdata.receiver} </Text>
                </View>

                <View style={{
                    width: windowWidth /1.2,
                    alignContent: 'center',
                    // backgroundColor : 'red', 
                    alignItems: 'center'
                }}>
                    <Text style={styles.amount} numberOfLines={1}>{Transdata.amount} Sol </Text>
                </View>


                <View style={{
                    width: 160,
                    height: 60,
                    alignContent: 'center',
                    backgroundColor: '#D9D9D9',
                    alignItems: 'center',
                    borderRadius: 33,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontWeight: '500',
                        fontSize: 24
                    }}> Pay </Text>
                </View>

                <View style={{
                    width: windowWidth / 2,
                    alignContent: 'center',
                    // backgroundColor : 'red', 
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                    height: 60
                }}>
                    {
                    Transdata.status == 'finalized' || 0  ? (
                        <>
                        <AntDesign name="checkcircleo" size={28} color="white" />
                        <Text style={{
                            fontWeight: '500',
                            fontSize: 16,
                            color: 'white'
                        }}>  Completed
                        </Text>
                        </>
                    
                    ) : (
                        <>
                        <AntDesign name="closecircleo" size={28} color="red" />
                        <Text style={{
                            fontWeight: '500',
                            fontSize: 16,
                            color: 'white'
                        }}> Failed 
                         </Text>
                        </>
                    )
                }
                </View>

                <View style={{
                    width: windowWidth / 1.5,
                    alignContent: 'center',
                    alignItems: 'center',
                    marginTop: 10
                }}>
                    <Text style={{
                        fontWeight: '500',
                        fontSize: 16,
                        color: '#FFFFFF'
                    }} numberOfLines={1}>
                      {datetime}</Text>
                </View>

                <View style={{
                    width: windowWidth - 30,
                    alignContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    backgroundColor: '#000000',
                    // height  : windowHeight/3,
                    // margin : 20
                    borderRadius: 20,
                    padding : 10

                }}>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: 'flex-start',
                        width: '100%',
                        alignItems: 'center',
                        padding: 10,
                        gap: 2,
                        borderBottomColor: 'white',
                        borderBottomWidth: 2
                    }}>

                        <Image
                            source={{ uri: imgurl }}
                            style={{
                                height: 38,
                                width: 38,
                                //   borderRadius : 17
                            }}
                        />

                        <Text style={{
                            fontWeight: '400',
                            fontSize: 20,
                            color: '#FFFFFF'
                        }} numberOfLines={1}> ETHERIUM  </Text>
                    </View>

                    <View style={{
                        marginBottom: 20,
                        width: '100%',
                        // alignContent : 'left',
                        alignItems: 'flex-start',
                        marginTop: 10,
                        paddingLeft: 20,
                        gap: 5
                    }}>

                        <Text style={{
                            fontWeight: '400',
                            fontSize: 16,
                            color: '#FFFFFF'
                        }} numberOfLines={1}> Transaction Signature  </Text>

                        <Text style={{
                            fontWeight: '400',
                            fontSize: 16,
                            color: '#FFFFFF'
                        }} numberOfLines={1}> {Transdata.signature}  </Text>

                    </View>

                    <View style={{
                        marginBottom: 20,
                        width: '100%',
                        // alignContent : 'left',
                        alignItems: 'flex-start',
                        marginTop: 10,
                        paddingLeft: 20,
                        // gap: 5
                    }}>

                        <Text style={{
                            fontWeight: '400',
                            fontSize: 16,
                            color: '#FFFFFF'
                        }} 
                        // numberOfLines={1}
                        > {
                            Transdata.type === 'receive' ? 'From' : 'TO'
                        }  </Text>

                        <Text style={{
                            fontWeight: '400',
                            fontSize: 16,
                            color: '#FFFFFF'
                        }} 
                        // numberOfLines={1}
                        > 
                            {

                                Transdata.type === 'receive' ? `${Transdata.sender}`  : `${Transdata.receiver}` 
                        
                            }
                        
                          </Text>

                    </View>
                    
                    <View style={{
                        marginBottom: 20,
                        width: '100%',
                        // alignContent : 'left',
                        alignItems: 'flex-start',
                        marginTop: 10,
                        paddingLeft: 20,
                        gap: 5
                    }}>

                        <Text style={{
                            fontWeight: '400',
                            fontSize: 16,
                            color: '#FFFFFF'
                        }} 
                        numberOfLines={1}
                        > From  </Text>

                        <Text style={{
                            fontWeight: '400',
                            fontSize: 16,
                            color: '#FFFFFF'
                        }} 
                        // numberOfLines={}
                        > {Transdata.sender}    </Text>

                    </View>
                </View>

               
            
            </View>
            </ScrollView>
        </ImageBackgroundWrapper>

    );
}







const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    amount: {
        fontSize: 36,
        fontWeight: '500',
        marginBottom: 20,
        color: 'white',

    },
    title: {
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 20,
        color: 'white'
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 40,
        color: 'white'
    },
    cameraContainer: {
        width: '80%',
        aspectRatio: 1,
        overflow: 'hidden',
        borderRadius: 10,
        marginBottom: 40,
    },
    camera: {
        flex: 1,
    },
    button: {
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        color: 'red'
    }
});