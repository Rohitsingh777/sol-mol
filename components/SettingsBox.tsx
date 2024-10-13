


import { View, Text, Image, ColorValue } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from '@/constants/Styles/Styles'
import {
    LucideIcon,
} from "lucide-react-native"
import { Href, useRouter } from 'expo-router'

export type settingboxprops = {
    height?: number,
    width?: number,
    icon: LucideIcon,
    text: string,
    onclickpath?: Href,
    borderBottomW?: number,
    borderBottomColor?: ColorValue,
    endarrow: boolean,
    radius?: number,
    righttext?: string , 
    topradius? : number , 
    bottomradius? : number
}
export default function SettingsBox(props: settingboxprops) {
    const router = useRouter()
    const { height, width, icon: Icon, text, onclickpath,
        borderBottomColor, borderBottomW, endarrow,
        radius, righttext , topradius , bottomradius } = props;

    return (

        <TouchableOpacity
            style={{
                // backgroundColor : 'blue' ,
                // margin : 0 ,
                // padding : 0
            }}

            onPress={() => {
                onclickpath && router.push(onclickpath)
            }}>


            <View style={{
                ...styles.transaction,
                margin: 0,
                width: width ?? '100%',
                height: height ?? 80, 
               borderRadius : 20    ,         
            }}> 

                <View style={{
                    
                    height: '100%',
                    padding: 10,
                    backgroundColor: '#222121',
                    borderRadius: radius ?? 0,
                    //  paddingBottom : 5
                    width: '100%',
                    justifyContent: 'center',
                    borderBottomColor: borderBottomColor ?? '#FFFFFF30',
                    borderBottomWidth: borderBottomW ?? 0, 
                    borderTopLeftRadius : topradius ?? 0 , 
                    borderTopRightRadius : topradius ?? 0 , 
                    borderBottomLeftRadius : bottomradius ?? 0 ,
                    borderBottomRightRadius : bottomradius ?? 0 ,
                    
                }}>


                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // justifyContent : 'space-between'
                        justifyContent : 'space-between', 

                    }}>
                        <View style={{
                            flexDirection : 'row',
                            // backgroundColor : 'red'
                        }}>
                            
                        <Icon color={'white'} />

                        <View style={{
                            overflow: 'hidden',
                            paddingLeft: 10
                        }}>

                            <Text
                                numberOfLines={1}
                                style={{
                                    fontWeight: '600',
                                    fontSize: 20,
                                    color: 'white',
                                    
                                }}>{text}</Text>

                        </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            gap: 10
                        }}>
                            {
                                righttext && (
                                    <Text
                                        style={{
                                            fontWeight: '400',
                                            fontSize: 15,
                                            color: '#D9D9D9'
                                        }}>{righttext}</Text>
                                )
                            }

                            {endarrow && (<FontAwesome name="angle-right" size={30} color="#B3B3B3" />)}

                        </View>


                    </View>

                </View>
            </View>
        </TouchableOpacity>


    )


}