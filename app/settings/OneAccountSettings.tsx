
import { View, Text } from 'react-native'
import React from 'react'
import { windowWidth } from '@/constants/Dimenstions'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '@/constants/Styles/Styles'
import ImageBackgroundWrapper from '@/components/Imagewrapper'
import { Accountinfolayout1, Accountinfolayout2, ManageAccountlayout, Settingslayout } from '@/constants/settingslayou'
import SettingsBox from '@/components/SettingsBox'

export default function OneAccountSettings() {
    const image = require('../../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure



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
                    marginTop : 70
                }}>


                    <View style={{
                        // backgroundColor : 'red', 
                        width: windowWidth,
                        padding: 10,
                        // borderRadius : 20 ,
                        overflow : 'hidden' ,
                        gap: 0
                    }}>
                        {Accountinfolayout1.map((prop, index) => {
                            return (
                                <SettingsBox {...prop} key={index}
                                />
                            )
                        })}
                    </View>

                    <View style={{
                        // backgroundColor : 'red', 
                        width: windowWidth,
                        padding: 10,
                        // borderRadius : 20 ,
                        overflow : 'hidden' ,
                        gap: 0
                    }}>
                        {Accountinfolayout2.map((prop, index) => {
                            return (
                                <SettingsBox {...prop}
                                />
                            )
                        })}
                    </View>


                </View>
            </SafeAreaView>

        </ImageBackgroundWrapper>
    )
}