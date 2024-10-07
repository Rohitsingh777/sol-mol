import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '@/constants/Styles/Styles'
import { LineChart } from "react-native-gifted-charts"
import {LinearGradient} from 'expo-linear-gradient';
import axios from 'axios';
import { JsonObjectExpression } from 'typescript';
import { number } from 'bitcoinjs-lib/src/cjs/script';
import {bitcoinjson, ethereumjson, makerjson, solanajson} from '@/constants/graphdata/allchaingraphdata'

const lineData = [{ value: 0 }, { value: 20 }, { value: 5 }, { value: 40 }, { value: 20 }, { value: 60 }, { value: 20}, { value: 70 }]
type PriceArray = [number, number]; // Defines the structure of each price item as a tuple
type prop = { chain : string }


const  Small_graph = React.memo(( props : prop  )  => { 
  const chain = props.chain ; 
  type  val =   {
    value : number 
    }
    
  var url  : string  ; 
  var imgurl : string ; 
  var staticjson : any ; 
  const sol_url = 'https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=1';
  const eth_url = 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1';
  const bit_url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1' ; 
  const maker_url = 'https://api.coingecko.com/api/v3/coins/maker/market_chart?vs_currency=usd&days=1' ; 
  
  
  imgurl = 'https://img.icons8.com/?size=100&id=50284&format=png&color=000000'
  
  
  switch(chain){
    case 'ETH' : {
      url  = eth_url
      imgurl = 'https://img.icons8.com/?size=100&id=50284&format=png&color=000000'
      staticjson =  ethereumjson ;   
    }

      break ; 
      case 'SOL' : {
        url = sol_url ; 
        imgurl  ='https://img.icons8.com/?size=100&id=icTiMgoOHSVy&format=png&color=000000'
        staticjson =  solanajson ;  
      }
      break; 
      case 'BIT' : {
        url = bit_url ; 
        imgurl = 'https://img.icons8.com/?size=100&id=63192&format=png&color=000000'
        staticjson =  bitcoinjson ; 
      } 
      break; 
      case 'MAK' : {
        url  = maker_url ; 
        imgurl = 'https://img.icons8.com/?size=100&id=UARsSBUAXiHi&format=png&color=000000'
        staticjson =  makerjson ;  
      }

    }

  const [data , setdata] = useState<val[]>([  ])
  const [up , setup ] = useState(0)
  const [value , stepValue ]  =useState(0)

  const makecall = async () =>{
    let result  ;
    try{
       result = await  axios.get(url)
    }
    catch{
      console.log(`rate limiting `)
       result =   staticjson ; 
    }
        console.log(`fetch don `)
        const raw : PriceArray[] = result.data.prices ; 
        let data : val[] = raw.map( item => ({"value" : item[1]})  )
        // data = data.filter((item ,index ) => index % 1 == 0 )
        setdata(data);
        console.log(`your array is  its length is ${data.length}`)
        setup( data[data.length - 1].value - data[0].value )
        stepValue(parseFloat((data[data.length - 1].value).toFixed(2)))
    
  }

  useEffect(()=>{
    (async()=>{
      try{
        makecall() ; 
      }
      catch{
        console.log(`trying again `)
        try {
          makecall()
        }
        catch{
          console.log(`didnt happen the second time as well r `)

        }
        console.log(`something went wrong `)
      }
   

    })()
  } ,[])



  return (
    <LinearGradient colors={['#bf11e0' ,'#020024']} locations={[0.05,0.5]} style={{
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
          // source={require('../assets/images/solicon.png')}
          source={{uri : imgurl  }}
          // style={styles.image}
          style={{
            height : 35 ,
            width : 35
          }}
        />
        <Text
        style={{
          marginLeft : 5 , 
          fontWeight : 'bold' , 
          fontSize  : 20  ,
          color : 'white'

        }}>{chain}</Text>
      </View>


{/* // $ rates   */}
      <View style={{
        display : 'flex'
        }}>
        <Text style={{
         color : 'white',
         fontSize : 24, 
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
          spacing={1}
          // hideDataPoints
          thickness={2}
          hideRules
          hideYAxisText
          // yAxisColor="#0BA5A4"
          // showVerticalLines
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
          focusedDataPointShape={'square'}
          showDataPointOnFocus
          showDataPointLabelOnFocus={true}
          dataPointsColor='white'
          showTextOnFocus
          showValuesAsDataPointsText
          backgroundColor='blue'
          
        />

      </View>
{/* //+- for the day   */}

      <View>
        <Text style={{
          fontWeight: 'bold',
          fontSize: '15',
          color: up > 0 ? 'green' : 'red' 
        }}>
          {up > 0 ? '+' : '' }
         {Math.round(up)}$
        </Text>
      </View>

    </View>
    </LinearGradient>
  )



}
)

// export default function Small_graph( props : prop  )  { 
//   const chain = props.chain ; 
//   type  val =   {
//     value : number 
//     }
    
//   var url  : string  ; 
//   var imgurl : string ; 
//   const sol_url = 'https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=1';
//   const eth_url = 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1';
//   const bit_url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1' ; 
//   const maker_url = 'https://api.coingecko.com/api/v3/coins/maker/market_chart?vs_currency=usd&days=1' ; 
  
  
//   imgurl = 'https://img.icons8.com/?size=100&id=50284&format=png&color=000000'
  
  
//   switch(chain){
//     case 'ETH' : {
//       url  = eth_url
//       imgurl = 'https://img.icons8.com/?size=100&id=50284&format=png&color=000000'
      
//       }
//       break ; 
//       case 'SOL' : {
//         url = sol_url ; 
//         imgurl  ='https://img.icons8.com/?size=100&id=icTiMgoOHSVy&format=png&color=000000'
//       }
//       break; 
//       case 'BIT' : {
//         url = bit_url ; 
//         imgurl = 'https://img.icons8.com/?size=100&id=63192&format=png&color=000000'
//       } 
//       break; 
//       case 'MAK' : {
//         url  = maker_url ; 
//         imgurl = 'https://img.icons8.com/?size=100&id=UARsSBUAXiHi&format=png&color=000000'
//       }

//     }

//   const [data , setdata] = useState<val[]>([  ])
//   const [up , setup ] = useState(0)
//   const [value , stepValue ]  =useState(0)

//   const makecall = async () =>{
//     const result = await  axios.get(url)
//         console.log(`fetch don `)
//         const raw : PriceArray[] = result.data.prices ; 
//         let data : val[] = raw.map( item => ({"value" : item[1]})  )
//         data = data.filter((item ,index ) => index % 1 == 0 )
//         setdata(data);
//         console.log(`your array is  its length is ${data.length}`)
//         setup( data[data.length - 1].value - data[0].value )
//         stepValue(parseFloat((data[data.length - 1].value).toFixed(2)))
    
//   }

//   useEffect(()=>{
//     (async()=>{
//       try{
//         makecall() ; 
//       }
//       catch{
//         console.log(`trying again `)
//         try {
//           makecall()
//         }
//         catch{
//           console.log(`didnt happen the second time as well r `)

//         }
//         console.log(`something went wrong `)
//       }
   

//     })()
//   } ,[])



//   return (
//     <LinearGradient colors={['#bf11e0' ,'#020024']} locations={[0.05,0.5]} style={{
//       borderRadius : 10, 
//     }}>
//     <View style={{
//       // backgroundColor : 'black' , 
//       // backgroundColor : 'rgb(2,0,36)' ,
//       // bac : 'linear-gradient(0deg, rgba(2,0,36,1) 49%, rgba(191,17,224,1) 97%)' ,
//       height : '100%' ,

//      padding: 8
      
//     }}>

//       {/* // heading img + coinname   */}
//       <View style={{
//         flexDirection: 'row' ,  
//         alignItems : 'center' , 
//         marginBottom: 3
//       }}>
//         <Image
//           // source={require('../assets/images/solicon.png')}
//           source={{uri : imgurl  }}
//           // style={styles.image}
//           style={{
//             height : 35 ,
//             width : 35
//           }}
//         />
//         <Text
//         style={{
//           marginLeft : 5 , 
//           fontWeight : 'bold' , 
//           fontSize  : 20  ,
//           color : 'white'

//         }}>{chain}</Text>
//       </View>


// {/* // $ rates   */}
//       <View style={{
//         display : 'flex'
//         }}>
//         <Text style={{
//          color : 'white',
//          fontSize : 24, 
//          fontWeight : 'bold'

//         }}>
//           ${value}
//         </Text>
//       </View>

// {/* ///graph  */}
//       <View style={styles.smallgraph}>
//         <LineChart
//           initialSpacing={0}
//           data={data}
//           spacing={1}
//           // hideDataPoints
//           thickness={2}
//           hideRules
//           hideYAxisText
//           // yAxisColor="#0BA5A4"
//           // showVerticalLines
//           verticalLinesColor="rgba(14,164,164,0.5)"
//           xAxisColor="#0BA5A4"
//           color={up > 0 ? 'green' : 'red'}
//           // // color1='green'
//           // curved
//           hideAxesAndRules
//           hideOrigin
//           height={50}
//           // // stepValue={100}
//           // maxValue={Math.max(...data.map(item => item.value)) }  
//           yAxisOffset={Math.min(...data.map(item => item.value)) - 10  }
//           // stepHeight={10}
//           // // stepValue={}
//           // areaChart
//           // focusEnabled
//           // showStripOnFocus
//           // showTextOnFocus
//           // isAnimated
//           focusEnabled
//           focusedDataPointShape={'square'}
//           showDataPointOnFocus
//           showDataPointLabelOnFocus={true}
//           dataPointsColor='white'
//           showTextOnFocus
//           showValuesAsDataPointsText
//           backgroundColor='blue'
          
//         />

//       </View>
// {/* //+- for the day   */}

//       <View>
//         <Text style={{
//           fontWeight: 'bold',
//           fontSize: '15',
//           color: up > 0 ? 'green' : 'red'
//         }}>
//           {up > 0 ? '+' : '' }
//          {Math.round(up)}$
//         </Text>
//       </View>

//     </View>
//     </LinearGradient>
//   )



// }




export default Small_graph ; 
