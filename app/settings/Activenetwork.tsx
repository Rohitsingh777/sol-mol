
import { View, Text, SafeAreaView, Platform, Image, TouchableOpacity } from 'react-native'
import React, { } from 'react'
import ImageBackgroundWrapper from '@/components/Imagewrapper'
import styles from '@/constants/Styles/Styles';
import { windowWidth } from '@/constants/Dimenstions';
import { Activenetworkprops, Settingslayout } from '@/constants/settingslayou';
import SettingsBox from '@/components/SettingsBox';


export default function Activenetwork() {
    const image = require('../../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure
    const imgurl = 'https://img.icons8.com/?size=100&id=50284&format=png&color=000000'

    return (
        <ImageBackgroundWrapper image={image}>
            <SafeAreaView style={styles.container}>

                <View style={{
                    flex: 1,
                    alignContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    padding: 0,
                    // backgroundColor : 'red', 
                    width: windowWidth,
                }}>

                    <Text style={{
                        color: 'white', 
                        fontSize: 25,
                        fontWeight: 'bold',
                        marginTop: 20,
                        marginBottom: 50
                    }}>
                        Active Networks 
                    </Text>

                    <View style={{
                        // backgroundColor : 'red', 
                        width: windowWidth,
                        padding: 10,
                        gap: 0
                    }}>

                        {Activenetworkprops.map((prop, index) => {
                            return (
                                <SettingsBox  {...prop} key={index} />
                            )
                        })}

                    </View>


                </View>
            </SafeAreaView>
        </ImageBackgroundWrapper>
    )
}
