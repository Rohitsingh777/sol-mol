


import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'


export type mnemoicprop = {
    mnemonic: string;
}

export function Mnemonicbox(props: mnemoicprop) {
    const { mnemonic } = props;
    // const [mnemonicarr, setmnemonicarr] = useState<string[]>([]);
    const mnemonicarrr : string[] =  mnemonic.split(" "); 
    useEffect(() => {
        // const arr : string[] = mnemonic.split(" ");
        // setmnemonicarr(arr);
    }, [])
    return (
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
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'grey',
        justifyContent: 'space-between', // Distributes space between the boxes
        padding: 10,
        flexWrap: 'wrap',
        gap: 10,
        borderRadius: 10
    },
    mnemonictextbox: {
        backgroundColor: 'black',
        display: 'flex',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center', // Centers the text within each box
        borderRadius: 5,

    }
});
