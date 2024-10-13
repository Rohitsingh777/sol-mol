


import { View, Text } from 'react-native'
import React from 'react'
import { windowWidth } from '@/constants/Dimenstions'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '@/constants/Styles/Styles'
import ImageBackgroundWrapper from '@/components/Imagewrapper'
import { ManageAccountlayout, Settingslayout } from '@/constants/settingslayou'
import SettingsBox from '@/components/SettingsBox'

export default function ManageAccount() {
    const image = require('../../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure



  return (
    <ImageBackgroundWrapper image={image}>

    <SafeAreaView style={styles.container}>

      <View style={{
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        overflow: 'hidden' , 
        padding : 0 , 
        // backgroundColor : 'red', 
        width : windowWidth ,
        paddingTop : 50 
      }}>

    

     <View style={{
      // backgroundColor : 'red', 
      width : windowWidth , 
      padding : 10,
      gap : 0
     }}>
      {ManageAccountlayout.map((prop ,index ) =>{
        return(
          <SettingsBox  {...prop} key={index}
          />
        )
      })}
    </View>


      </View>
    </SafeAreaView>

  </ImageBackgroundWrapper>
  )
}