

import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '@/constants/Styles/Styles'
import { transaction } from '@/hooks/Gettransactions/solhistory';


export type prophistory  = { chain : string , data : transaction  }

export default function History_onebox( props : prophistory  )  {  
  const { chain ,data  } = props
  const [amount , setAmount ] = useState(0)
  const tran_color =  data?.type ==  'send' ? '#ff0000' : '#17D24B'
  var url  : string  ; 
  var imgurl : string ; 

  const sol_url = 'https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=1';
  const eth_url = 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1';
  const bit_url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1' ; 
  const maker_url = 'https://api.coingecko.com/api/v3/coins/maker/market_chart?vs_currency=usd&days=1' ; 
  
  imgurl = 'https://img.icons8.com/?size=100&id=50284&format=png&color=000000'
  
  switch(chain){
    case 'ETH' : {
      url  = eth_url
      imgurl = 'https://img.icons8.com/?size=100&id=50284&format=png&color=000000'
      
      }
      break ; 
      case 'SOL' : {
        url = sol_url ; 
        imgurl  ='https://img.icons8.com/?size=100&id=icTiMgoOHSVy&format=png&color=000000'
      }
      break; 
      case 'BIT' : {
        url = bit_url ; 
        imgurl = 'https://img.icons8.com/?size=100&id=63192&format=png&color=000000'
      } 
      break; 
      case 'MAK' : {
        url  = maker_url ; 
        imgurl = 'https://img.icons8.com/?size=100&id=UARsSBUAXiHi&format=png&color=000000'
      }

    }


  useEffect(()=>{
    if (data?.amount === undefined ){
      setAmount(0)
    }else{
      setAmount(amount / 1000000000); 
    }
  } ,[])



  return (
   

<View style={styles.transaction}>
    <View style={{
      height : '100%' ,
     padding: 5,
     backgroundColor  : '#222121' ,
     borderRadius : 10 ,
     paddingBottom : 0 ,
     borderRightColor : tran_color , 
     borderRightWidth: 5
    }}>


      <View style={{
        flexDirection: 'row' ,  
        alignItems : 'center' , 
        marginBottom: 3
      }}>

        <Image
          source={{uri : imgurl  }}
          style={{
            height : 52 ,
            width : 52,
            borderRadius : 17
          }}
        />

        <View style={{
            justifyContent : 'space-around' , 
            width : '60%' , 
            overflow : 'hidden', 
            paddingLeft : 5
        }}>
        <Text
        style={{
          marginLeft : 5 , 
          fontWeight : '300' , 
          fontSize  : 16  ,
          color : '#D9D9D9',
          marginBottom   : 5 
        }}>{data?.type == 'send' ? 'Paid to' : 'Received from' }</Text>
        <Text
        numberOfLines={1}
        style={{
          marginLeft : 5 , 
          fontWeight : '500' , 
          fontSize  : 16 ,
          color : '#FFFFFF' ,
          
        }}>{data?.sender?.toString()}</Text>
        </View>
        <View style={{
            alignItems : 'center' , 
            justifyContent : 'center' , 
            flex : 1, 
            height : '100%'
        }}>

        <Text
        style={{
          marginLeft : 5 , 
          fontWeight : '400' , 
          fontSize  : 16 ,
          color : tran_color , 
          // marginTop :15 , 

        }}>
          {data?.type ==  'send' ? '-' : '+'}

          {
            chain == 'SOL' ? (data?.amount == undefined ? '0' : (data.amount/1000000000).toFixed(2).toString() ) 
            :(
              data?.amount?.toFixed(2).toString() 
            ) 

          }
          {
            chain == 'SOL'  ? ' Sol' : ' Eth'
          }
          {/* { data?.amount == undefined ? '0' : (data.amount/1000000000).toFixed(2).toString()}sol */}
        </Text>
        
        </View>


      </View>   

      <View style={{}}>
<Text style={{
    color : '#D9D9D9' , 
    marginLeft : 6 ,
    fontSize : 15,
    fontWeight : '300'
}}>
    {data?.date?.toString()}
    
</Text>
      </View>


    </View>
</View>

   
  )



}



