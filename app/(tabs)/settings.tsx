import { View, Text, SafeAreaView, Platform, Image, TouchableOpacity } from 'react-native'
import React, {  } from 'react'
import ImageBackgroundWrapper from '@/components/Imagewrapper'
import styles from '@/constants/Styles/Styles';
import { windowWidth } from '@/constants/Dimenstions';
import { Settingslayout } from '@/constants/settingslayou';
import SettingsBox from '@/components/SettingsBox';



export default function settings() {
  const image = require('../../assets/images/Mainbackground.png'); // Adjust the path according to your folder structure
  const imgurl = 'https://img.icons8.com/?size=100&id=50284&format=png&color=000000'

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
      }}>

     <Text style={{color : 'white' , fontSize : 20 , fontWeight : '500' , 
      marginTop : 20 
     }}>
       Settings 
     </Text>

{/* 

<TouchableOpacity onPress={()=>{
  alert('something')
}}>
<View style={ {...styles.transaction , width : '100%' ,height : 80 }}>
    <View style={{
      height : '100%' ,
     padding: 10,
     backgroundColor  : '#222121' ,
     borderRadius : 10 ,
    //  paddingBottom : 5
    width : '100%'
    }}>


      <View style={{
        flexDirection: 'row' ,  
        alignItems : 'center' , 
        // marginBottom: 3
      }}>

        <Image
          source={{uri : imgurl  }}
          style={{
            height : 35 ,
            width : 35
          }}
        />

        <View style={{
            // alignItems : 'center' , 
            justifyContent : 'space-around' , 
            width : '80%' , 
            overflow : 'hidden', 
            paddingLeft : 5
        }}>
        
        <Text
        numberOfLines={1}
        style={{
          marginLeft : 5 , 
          fontWeight : '600' , 
          fontSize  : 20 ,
          color : 'white' ,
          
        }}>Account 1 </Text>
        
        </View>

        <View style={{
            alignItems : 'center' , 
            justifyContent : 'center' , 
            flex : 1, 
            height : '100%'
        }}>
           <FontAwesome name="angle-right" size={40} color="white" />
        </View>
      </View>   
    </View>
</View>
</TouchableOpacity> 


 */}

     {/* <View style={{
      marginTop : 20 , 
      backgroundColor : '#222121'
     }}>
      
     <Text style={{color : 'white' , fontSize : 20 , fontWeight : '500' ,  
     }}>
       Account 1  
     </Text>
     </View>

     <View style={{
      marginTop : 20 , 
      backgroundColor : '#222121'
     }}>
      
     <Text style={{color : 'white' , fontSize : 20 , fontWeight : '500' ,  
     }}>
       Account 1  
     </Text>

     </View>
     <View style={{
      marginTop : 20 , 
      backgroundColor : '#222121'
     }}>
      
     <Text style={{color : 'white' , fontSize : 20 , fontWeight : '500' ,  
     }}>
       Account 1  
     </Text>
     </View> */}

     <View style={{
      // backgroundColor : 'red', 
      width : windowWidth , 
      padding : 10,
      gap : 0
     }}>
    
      {Settingslayout.map((prop ,index ) =>{
        return(
          <SettingsBox  {...prop}
          />
        )
      })}
     
    </View>


      </View>
    </SafeAreaView>

  </ImageBackgroundWrapper>
  )
}
