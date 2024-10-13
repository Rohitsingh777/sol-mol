
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, TouchableHighlightBase, Image } from 'react-native';
import ImageBackgroundWrapper from '@/components/Imagewrapper';
import { TextInput } from 'react-native-gesture-handler';
import { windowWidth } from '@/constants/Dimenstions';
import { useRecoilState } from 'recoil';
import { cryptoKeysAtom } from '@/store/publickeys';
import * as SecureStore from 'expo-secure-store';
import { sendEth, sendSol } from '@/hooks/sendsoldev';
import { useRouter } from 'expo-router';
import Pickchain from '@/components/Pickchain';
import { receiverspublickey } from '@/store/receiverspubkey';
import { chainState } from '@/store/chain';
import UseToast from '@/components/Toaster';




export default function SendviapubId() {

    const image = require('../../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure
    const [cryptokeys, setcryptokeys] = useRecoilState(cryptoKeysAtom)
    // const [chain, setchain] = useState<string>("SOL");
    const [img, setimg] = useState<string>('../../assets/images/solicon.png')
    //   const [pubkey, setpubkey] = useState(cryptokeys.sol)
    const [chain, setchain] = useRecoilState(chainState)
    const router = useRouter();

    const sendchain = async () => {
        let id: string | undefined | void = 'Failed';

        console.log(`keY : ${pubkey}  
        amount : ${amount} , from ${cryptokeys.sol} `)
        console.log(privkey, pubkey, amount)


        if (privkey && pubkey && amount) {

            if (chain.chain == 'ETH') {
                id = await sendEth(privkey, pubkey, amount.toString());
            }
            else {
                id = await sendSol(privkey, pubkey, parseInt(amount))
            }

            UseToast({
                Text: `${id}`,
                Title: id ? (id.includes("Failed") ? 'Transaction Failed' : 'Transaction Sucessfull') : 'Transaction Failed',
                position: 'bottom',
                status: id ? (id.includes("Failed") ? 'error' : 'success') : 'error'
            })


        }
        else {
            if (!pubkey) {
                console.log(`kindly enter pubkey`)
            } else if (!amount) {
                console.log(`kindly enter amount `)
            }
            else {
                console.log(`Error occured `)
            }
        }



    }
    const cancelaction = () => {
        router.push('/(tabs)')
    }
    const [pubkey, setPubkey] = useRecoilState(receiverspublickey);
    const [amount, setAmount] = useState('');
    const [privkey, setPrivkey] = useState('');

    const handleInputChange = (text: string) => {
        // Allow only numbers
        const numericValue = text.replace(/[^0-9.]/g, ''); // Strip non-numeric characters
        setAmount(numericValue); // Update the state with numeric value
    };

    useEffect(() => {

        async function sendsomething() {
            const keys = await SecureStore.getItemAsync('ACC0')
            setAmount('')
            if (keys != null) {
                console.log(`printing object `)
                console.log(keys)
                const key = JSON.parse(keys)
                console.log(`keys found `)

                // const sol = key['SOL'].publicKey
                // const eth = key['ETH'].publicKey
                // const solpk = key['SOL'].privateKey;
                // const ethpk = key['ETH'].privateKey;
                const pk = key[chain.chain].privateKey;

                setPrivkey(pk);
                // const solbal = await getSolanaBalance_dev(sol, 'SOL');
                // console.log(solbal)
                //   if (solbal != null) {
                //     setsol_bal(Math.floor(solbal / 1000000000))
                //   }

            }
        }
        sendsomething();
    }, [chain]);


    return (
        <ImageBackgroundWrapper image={image}>

            <View style={{ ...styles.container, padding: 20, width: windowWidth }}>
                <Text style={styles.title}>Send Coin</Text>

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
                        keyboardType="numeric" // Numeric keyboard
                        value={amount} // Bind the state to input
                        onChangeText={handleInputChange} // Handle input change
                        placeholder="Enter a number"
                        placeholderTextColor={'white'}
                        cursorColor={'white'}
                    />
                </View>


                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={sendchain}>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={cancelaction}>
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