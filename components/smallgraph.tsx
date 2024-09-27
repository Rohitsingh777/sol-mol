import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '@/constants/Styles/Styles'
import { LineChart } from "react-native-gifted-charts"
// import {LinearGradient} from 'react-native-linear-gradient';
// import img from '../assets/images/solicon.png'
import {LinearGradient} from 'expo-linear-gradient';
import { validateLocaleAndSetLanguage } from 'typescript';
import { number } from 'bitcoinjs-lib/src/cjs/script';

import axios from 'axios';

const lineData = [{ value: 0 }, { value: 20 }, { value: 5 }, { value: 40 }, { value: 20 }, { value: 60 }, { value: 20}, { value: 70 }]
type PriceArray = [number, number]; // Defines the structure of each price item as a tuple

export default function Small_graph() {
  type  val =   {
    value : number 
  }
  const [data , setdata] = useState<val[]>([  ])
  const [up , setup ] = useState(0)
  const [value , stepValue ]  =useState(0)
  useEffect(()=>{
    (async()=>{
     const url =   `https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1`
    const result = await  axios.get(url)
    const raw : PriceArray[] = result.data.prices ; 

    let data : val[] = raw.map( item => ({"value" : item[1]})  )
    data = data.filter((item ,index ) => index % 1 == 0 )
    setdata(data);
    console.log(`your array is ${data} its length is ${data.length}`)
    setup(data[0].value - data[data.length - 1].value )
    stepValue(parseFloat((data[data.length - 1].value).toFixed(2)))
    })()
  } ,[])



  return (
    <LinearGradient colors={['#bf11e0' ,'#020024']} locations={[0.1,0.6]} style={{
      borderRadius : 10, 
    }}>
    <View style={{
      // backgroundColor : 'black' , 
      // backgroundColor : 'rgb(2,0,36)' ,
      // bac : 'linear-gradient(0deg, rgba(2,0,36,1) 49%, rgba(191,17,224,1) 97%)' ,
      height : '100%' ,

     padding: 8
      
    }}>
      {/* // heading img + coinname   */}
      <View style={{
        flexDirection: 'row' ,  
        alignItems : 'center' , 
        marginBottom: 3
      }}>
        <Image
          source={require('../assets/images/solicon.png')}
          // style={styles.image}
        />
        <Text
        style={{
          marginLeft : 5 , 
          fontWeight : 'bold' , 
          fontSize  : 16  ,
          color : 'white'

        }}> ETH </Text>
      </View>


{/* // $ rates   */}
      <View style={{
        display : 'flex'
        }}>
        <Text style={{
         color : 'white',
         fontSize : 25, 
         fontWeight : 'bold'

        }}>
          ${value}
        </Text>
      </View>
{/* ///graph  */}
      <View style={styles.smallgraph}>
        <LineChart
          initialSpacing={0}
          data={data}
          spacing={10}
          hideDataPoints
          thickness={2}
          hideRules
          hideYAxisText
          // yAxisColor="#0BA5A4"
          showVerticalLines
          verticalLinesColor="rgba(14,164,164,0.5)"
          xAxisColor="#0BA5A4"
          color={up > 0 ? 'green' : 'red'}
          // // color1='green'
          // curved
          hideAxesAndRules
          hideOrigin
          height={50}
          // // stepValue={100}
          // maxValue={Math.max(...data.map(item => item.value)) }  
          yAxisOffset={Math.min(...data.map(item => item.value)) - 10  }
          // stepHeight={10}
          // // stepValue={}
          // areaChart
          // focusEnabled
          // showStripOnFocus
          // showTextOnFocus
          // isAnimated
          focusEnabled
          focusedDataPointShape={'circle'}
          showDataPointOnFocus
          showDataPointLabelOnFocus={true}
          dataPointsColor='white'
          showTextOnFocus
        />

      </View>
{/* //+- for the day   */}

      <View>
        <Text style={{
          fontWeight: 'bold',
          fontSize: '15',
          color: up > 0 ? 'green' : 'red'
        }}>
         {Math.round(up)}$
        </Text>
      </View>

    </View>
    </LinearGradient>
  )



}



