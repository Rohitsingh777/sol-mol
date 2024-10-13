

import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '@/constants/Styles/Styles'

export type prophistory = {
    chain: 'ETH' | 'SOL'
    , balance: string | undefined | null
}

export default function Balance_onebox(props: prophistory) {
    const { chain, balance } = props
    // const [amount, setAmount] = useState(balance)

    var url: string;
    var imgurl: string;

    const sol_url = 'https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=1';
    const eth_url = 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1';
    const bit_url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1';
    const maker_url = 'https://api.coingecko.com/api/v3/coins/maker/market_chart?vs_currency=usd&days=1';
    imgurl = 'https://img.icons8.com/?size=100&id=50284&format=png&color=000000'

    switch (chain) {
        case 'ETH': {
            url = eth_url
            imgurl = 'https://img.icons8.com/?size=100&id=50284&format=png&color=000000'

        }
            break;
        case 'SOL': {
            url = sol_url;
            imgurl = 'https://img.icons8.com/?size=100&id=icTiMgoOHSVy&format=png&color=000000'
        }
            break;
        case 'BIT': {
            url = bit_url;
            imgurl = 'https://img.icons8.com/?size=100&id=63192&format=png&color=000000'
        }
            break;
        case 'MAK': {
            url = maker_url;
            imgurl = 'https://img.icons8.com/?size=100&id=UARsSBUAXiHi&format=png&color=000000'
        }

    }


    useEffect(() => {

    }, [])



    return (
        <View style={{...styles.transaction , height : 75}}>
            <View style={{
                height: '100%',
                padding: 5,
                backgroundColor: '#222121',
                borderRadius: 10,
                paddingBottom: 0,
                // borderRightColor: tran_color,
                borderRightWidth: 5 , 
                justifyContent : 'center'
            }}>


                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 3,
                    justifyContent : 'center' , 
                    // backgroundColor : 'white'
                }}>

                    <Image
                        source={{ uri: imgurl }}
                        style={{
                            height: 52,
                            width: 52,
                            borderRadius: 17
                        }}
                    />

                    <View style={{
                        justifyContent: 'space-around',
                        width: '60%',
                        overflow: 'hidden',
                        paddingLeft: 5 , 
                        // backgroundColor : 'red'
                    }}>
                        <Text
                            style={{
                                marginLeft: 5,
                                fontWeight: 'bold',
                                fontSize: 24,
                                color: '#D9D9D9',
                                marginBottom: 5
                            }}>
                            {
                                chain == 'SOL' ? 'SOLANA' : 'ETHERIUM'
                            }
                            </Text>

                    </View>


                    <View style={{
                        flexDirection : 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1 ,
                        height: '100%' , 
                        // backgroundColor : 'blue' 
                    }}>

                        <Text
                            style={{
                                marginLeft: 5,
                                fontWeight: '400',
                                fontSize: 24,
                                color: 'red',
                                // marginTop :15 , 

                            }}>
                            {balance}
                        </Text>
                        <Text
                            style={{
                                marginLeft: 5,
                                fontWeight: '400',
                                fontSize: 16,
                                color: 'white',
                                // marginTop :15 , 

                            }}>
                            {chain == 'SOL' ? ' Sol' : ' Eth'}
                        </Text>

                    </View>


                </View>


            </View>
        </View>
    )
}






