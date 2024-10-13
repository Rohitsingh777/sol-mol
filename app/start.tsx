import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import styles from '@/constants/Styles/Styles';
import Walletimg from '@/components/Wallet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';


export default function Startpage() {
    const image = require('../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure

    const router = useRouter() ; 

    return (
        <View style={{
            ...styles.container,

        }} >
            <ImageBackground source={image} style={styles.image}>

                <View style={{
                    position: 'relative',
                    // backgroundColor : 'black' ,
                    flex: 1
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'center',
                        // backgroundColor: 'red',
                        // marginTop: 300,
                        left: 10,
                        top: '50%'

                    }}>
                        <Walletimg />

                    </View>

                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        // alignContent: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor : 'grey',
                        top: '48%'
                    }}>
                        <Text style={{
                            marginBottom: 10,
                            fontWeight: '400',
                            color: 'white',
                            fontSize: 20
                        }}>
                            I already have a wallet
                        </Text>
                        <View
                            style={{
                                height: 56,
                                backgroundColor: 'black',
                                borderRadius: 36,
                                width: 285,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}>
                            <TouchableOpacity onPress={() => {
                                // Alert.alert(`sdfsdf`);
                                router.push('/createwallet')
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontWeight: '500',
                                    fontSize: 20
                                }}>Create a new wallet</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{
                            marginTop: 10,
                            color: 'white'
                        }}>
                            By proceeding,you agree to our
                        </Text>
                        <Text
                            style={{
                                // marginTop : 5 ,
                                color: 'white'
                            }}>
                            Terms and Conditions
                        </Text>

                    </View>

                </View>
                
            </ImageBackground>
        </View>
    )
}


// width: 179.77px;
// height: 170.63px;
// top: 297px;
// left: 104.96px;
// gap: 0px;
// opacity: 0px;










