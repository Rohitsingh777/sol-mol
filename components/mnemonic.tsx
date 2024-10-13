


import { View, Text, StyleSheet, TextStyle, ViewStyle, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { windowWidth } from '@/constants/Dimenstions';
import { FunctionTypeNode } from 'typescript';


export type mnemoicprop = {
    mnemonic: string , 
    menmonicbottom ?: boolean   ,
    onContinue ?:  () => void;   
}

export function Mnemonicbox(props: mnemoicprop) {
    const { mnemonic , menmonicbottom  , onContinue  } = props;
    // const [mnemonicarr, setmnemonicarr] = useState<string[]>([]);
    const mnemonicarrr: string[] = mnemonic.split(" ");
    const [isChecked, setIsChecked] = useState(false);
    const toggleSwitch = () => setIsChecked(previousState => !previousState);

    useEffect(() => {
        // const arr : string[] = mnemonic.split(" ");
        // setmnemonicarr(arr);
    }, [])
    return (
        <View
            style={styles.mnemonicbox}
        >
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}>
                <Text style={$Innertitle}> Secret Recovery Phrase </Text>
                <Text style={$Innersubtitle} numberOfLines={2} >
                    This phrase is the ONLY way to recover your wallet.DO NOT share it with anyone!
                </Text>
            </View>

            <View style={styles.mnemonicbox} >
                {mnemonicarrr.map((str, index) => {
                    return (
                        <View style={styles.mnemonictextbox} key={index}>
                            <Text style={{
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                                margin: 5,
                                fontSize: 15
                            }}>{index + 1}.{str}</Text>
                        </View>
                    )
                })}
            </View>


            {menmonicbottom && ( 
                <View style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center' , 
                            width : '100%', 
                            marginBottom : 20
                        }}>
        
                            <Switch
                                value={isChecked}
                                onValueChange={toggleSwitch}
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isChecked ? "green" : "red"}
                            />
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '400',
                                    color: 'white',
                                    marginLeft : 10
                                }} >
                                I saved my Secret Recovery Phrase
                            </Text>
                        </View>
                        <TouchableOpacity disabled={!isChecked} style={$Continuebutton} onPress={onContinue}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '400',
                                color: 'white'
                            }}
                            >
                                Continue
                            </Text>
                        </TouchableOpacity>
                </View>
            
            )}
           

        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    mnemonic: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    mnemonicbox: {
        // display : 'flex' , 
        width: '98%',
        flexDirection: 'row',
        backgroundColor: '#171717',
        justifyContent: 'space-between', // Distributes space between the boxes
        padding: 10,
        flexWrap: 'wrap',
        gap: 10,
        borderRadius: 10 ,
        
    },
    mnemonictextbox: {
        backgroundColor: 'black',
        display: 'flex',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center', // Centers the text within each box
        // borderRadius: 5,
        height: 40

    }
});


const $Innertitle: TextStyle = {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
    justifyContent: 'center',
    paddingTop: 20,
    marginBottom: 10,

}
const $Continuebutton: ViewStyle = {
    height: 40,
    backgroundColor: '#262626',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth / 100 * 70

}
const $Innersubtitle: TextStyle = {
    fontSize: 14,
    fontWeight: '400',
    color: '#AB8F2E',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center'
}