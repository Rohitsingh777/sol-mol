import axios from "axios";
import { number } from "bitcoinjs-lib/src/cjs/script";

export type transaction = {
    type?: 'send' | 'receive' | undefined,
    amount?: number | undefined,
    sender?: string | undefined,
    receiver?: string | undefined,
    date?: Date | undefined,
    signature?: string | undefined,
    status?: string | undefined,
}

export type transactions = transaction[] ;

type DynamicJSON = Record<string, any>; // Can handle any unknown structure

export const getEthTransactions = async (address: string, numTx: number) : Promise<transactions>  => {
    let transactions_result : transactions  = [];  //list of all the transactions ; 
    //  address = '0xd2f9D5a0308237c484C0b14c8719B2905C568A8b'
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&offset=${numTx}&page=1&sort=asc&apikey=E5N2DVD2QNJIPVQNQV6GX88ZT4FQXZHB5T`
    try {
      const response = await axios.get(url);
      const transactions = response.data.result;
      console.log(transactions);
      console.log('---'.repeat(20))
      if (transactions.length > 0 )
        {
        const trans = transactions.map((trans : DynamicJSON )=>{
            const onetrans  : transaction = {
                date : new Date(trans.timeStamp * 1000) ,
                sender : trans.from , 
                receiver : trans.to , 
                amount : weiToEth(trans.value) , 
                type : trans.from == address ? 'send' : 'receive', 
                signature : trans.hash ,
                status :  trans.isError , 
            }
           transactions_result.push(onetrans) ; 
        })
      }
      
        // console.log(trans)
    } catch (error) {
      console.error(error);
    //   return null ; 
    }

    return transactions_result ; 
};



export function weiToEth(wei : number ) : number {
    const eth = wei / 1e18;  // 1 ETH = 10^18 wei
    return eth;
 }