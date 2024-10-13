

import { View, Text, TextStyle, Button, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { windowWidth } from '@/constants/Dimenstions'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '@/constants/Styles/Styles'
import ImageBackgroundWrapper from '@/components/Imagewrapper'
import { Mnemonicbox } from '@/components/mnemonic'
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Copy } from 'lucide-react-native'
import copytoclipboar from '@/hooks/copytext'

export default function Onetrans() {
    const image = require('../../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure
    const [menmonic, setmnemonic] = useState<string | null>('')
    
    useEffect(() => {
        (async () => {
            console.log(`triggered `)
            const mnemonicgot = await SecureStore.getItemAsync('mnemonic');
            console.log(mnemonicgot)
            mnemonicgot && setmnemonic(mnemonicgot)
            console.log(`ended`)
        })();

    }, [])
    return (
        <ImageBackgroundWrapper image={image}>
            <SafeAreaView style={styles.container}>

                <View style={{
                    flex: 1,
                    alignContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    // backgroundColor : 'red', 
                    width: windowWidth,
                    justifyContent: 'center',
                    padding: 20
                }}>
                    <Text style={$heading}> Your Mneumonic </Text>
                    <Mnemonicbox mnemonic={menmonic! } />
                    <TouchableOpacity style={$copybox} onPress={() => {
                        copytoclipboar(menmonic!)
                    }}>
                        <Copy height={20} color={'blue'} />
                        <Text style={{
                            // backgroundColor : 'red' , 
                            fontSize: 16
                        }}>
                            Copy
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

        </ImageBackgroundWrapper>
    )
}

const $heading: TextStyle = {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    marginBottom: 30
}
const $copybox: ViewStyle = {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    padding: 10,
    borderRadius: 5

}