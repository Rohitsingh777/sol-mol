import { View, Text, TouchableOpacity, Image, TextStyle, ImageStyle, ViewStyle } from 'react-native'
import React from 'react'
import copytoclipboar from '@/hooks/copytext'
import { Clipboard } from 'lucide-react-native'
type privetkeyboxprop = {
    chain: 'SOL' | 'ETH',
    text : string | null 
}
export default function Privatekeybox(props: privetkeyboxprop ) {

    const { chain, text } = props

    return (
        <TouchableOpacity style={{
            width: '100%'
        }} onPress={() => {
            copytoclipboar(`${text}`)
        }}>
           
            <View style={$box}>
            <Clipboard size={20}  style={{
                position : 'absolute' , 
                left: 5, 
                top : 5
            }}  />
                <Image
                    style={$imglogo}
                    source={chain == 'SOL' ? require('../assets/images/solicon.png') : require('../assets/images/ethicon.png')}
                />
                <Text style={$keystring}
                    numberOfLines={5}
                >
                    {text  ??  'Cant Find'}
                </Text>
            </View>
        </TouchableOpacity>
    )
}





const $imglogo: ImageStyle = {
    resizeMode: 'cover',
    height: 60,
    width: 60, 
}
const $keystring: TextStyle = {
    flex: 1,
    fontWeight: '500',
    color: 'white',
    overflow: 'hidden',
    flexWrap: 'wrap'
}

const $heading: TextStyle = {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    marginBottom: 30
}


const $box: ViewStyle = {
    padding: 10,
    flexDirection: 'row',
    height: 120,
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
}