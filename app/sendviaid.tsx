
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, TouchableHighlightBase, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import ImageBackgroundWrapper from '@/components/Imagewrapper';
import { TextInput } from 'react-native-gesture-handler';
import { windowWidth } from '@/constants/Dimenstions';
import { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';
import { useRecoilState } from 'recoil';
import { cryptoKeysAtom } from '@/store/publickeys';
import * as SecureStore from 'expo-secure-store';
import { getSolanaBalance_dev } from '@/hooks/getBalance';
import { sendEth, sendSol } from '@/hooks/sendsoldev';
import { useRouter } from 'expo-router';
import RNPickerSelect from 'react-native-picker-select';
import { pickerSelectStyles } from '@/constants/Styles/Picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import Pickchain from '@/components/Pickchain';
import { receiverspublickey } from '@/store/receiverspubkey';




export default function SendviapubId() {
    const image = require('../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure
    const [cryptokeys, setcryptokeys] = useRecoilState(cryptoKeysAtom)
    
    const [chain, setchain] = useState<string>("SOL");
    const [img, setimg] = useState<string>('../../assets/images/solicon.png')
    //   const [pubkey, setpubkey] = useState(cryptokeys.sol)

    const router = useRouter();

    const sendsol = async () => {
        console.log(`keY : ${pubkey}  
        amount : ${amount} , from ${cryptokeys.sol} `)
        console.log(privkey, pubkey, amount)
        const id = await sendEth(privkey, pubkey, amount.toString());
        alert(`done transaction for  ${id}`)
    }

    const [pubkey, setPubkey] = useRecoilState(receiverspublickey);
    const [amount, setAmount] = useState(0);
    const [privkey, setPrivkey] = useState('');

    useEffect(() => {

        async function sendsomething() {
            const keys = await SecureStore.getItemAsync('ACC0')
            setAmount(0)
            if (keys != null) {
                console.log(`printing object `)
                console.log(keys)
                const key = JSON.parse(keys)
                console.log(`keys found `)
                const sol = key['SOL'].publicKey
                const eth = key['ETH'].publicKey
                const solpk = key['SOL'].privateKey;
                const ethpk = key['ETH'].privateKey;
                setPrivkey(ethpk);
                const solbal = await getSolanaBalance_dev(sol, 'SOL');
                console.log(solbal)
                //   if (solbal != null) {
                //     setsol_bal(Math.floor(solbal / 1000000000))
                //   }

            }
        }
        sendsomething();
    }, []);


    return (
        <ImageBackgroundWrapper image={image}>

            <View style={{ ...styles.container, padding: 20, width: windowWidth }}>
                <Text style={styles.title}>Send Coin</Text>


                {/* <View style={{
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
 */}

                {/* picker over herer  */}
                <View style={{
                    position: 'absolute',
                    top: 150
                }}>
                    <Pickchain />
                </View>


                {/* text boxes in heere */}
                <View style={{
                    width: '100%',
                    gap: 15
                }}>
                    <TextInput
                        style={styles.textbox}
                        placeholder="Receivers Public Key "
                        value={pubkey}
                        placeholderTextColor={'white'}
                        cursorColor={'white'}
                        onChangeText={newText => setPubkey(newText)}
                        key={'key'} />

                    <TextInput
                        style={styles.textbox}
                        placeholder="Amount"
                        keyboardType="numeric"
                        value={amount.toString()}
                        key={'amount'}
                        placeholderTextColor={'white'}
                        onChangeText={newText => setAmount(parseInt(newText))} />
                </View>


                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={sendsol}>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ImageBackgroundWrapper>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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

        borderRadius: 10,
        backgroundColor: 'grey',
        width: '45%',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        // alignContent : 'center' , 
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    text: {
        color: 'red'
    },
    bottom: {
        position: 'absolute',
        bottom: 0,    // Stick to the bottom of the screen
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth,
        padding: 20,
        gap: 20,
        height: 90,
        // backgroundColor: "red"
    },
    title: {
        position: 'absolute',
        top: 100,    // Stick to the bottom of the screen 
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    textbox: {
        height: 50, borderColor: 'gray', borderWidth: 1, paddingLeft: 8, borderRadius: 5, width: '100%',
        color: 'white'
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
});