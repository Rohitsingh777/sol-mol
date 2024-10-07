// import { chains } from "@/store/chain";
import { getEthTransactions } from "./Gettransactions/ethhistory";
import { getSolTransactions, transactions } from "./Gettransactions/solhistory";

type chains = 'SOL' | 'ETH'

export  default async function getTransactions(
  chain : chains ,address: string, numTx: number) : Promise<transactions>
{ 
    if(chain == 'ETH'){
          const response : transactions = await getEthTransactions(address, numTx)
          return response ; 
    }
    else if (chain == 'SOL'){
      const response : transactions = await getSolTransactions(address, numTx)
      return response ; 
    }else{
        return [] ;
    }
    
  
  }