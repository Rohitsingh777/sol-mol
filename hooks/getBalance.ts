
export async function getSolanaBalance_dev(account: string , chain : 'ETH' | 'SOL'): Promise <number | null | undefined > {
    let  url , requestBody 
    if(chain == 'ETH'){
         url = 'https://eth-mainnet.g.alchemy.com/v2/nk304O7Mf4G87YvTcHbf-gXPM-9Pu2g0'; // ETH JSON-RPC endpoint
         requestBody = {
            "id": 1,
            "jsonrpc": "2.0",
            "params": [
              account,
              "latest"
            ],
            "method": "eth_getBalance"
          }
    }else if (chain == 'SOL'){
         url = 'https://solana-devnet.g.alchemy.com/v2/nk304O7Mf4G87YvTcHbf-gXPM-9Pu2g0'; // Solana JSON-RPC endpoint
         requestBody = {
            jsonrpc: "2.0",
            id: 1,
            method: "getBalance",
            params: [account]
        };
    }else{
        return null ;
    }
    
  
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });
  
        const data = await response.json();
        if(chain == 'SOL'){
            if (data.result) {
                console.log(data)
                  return data.result.value; // Balance is returned in lamports (smallest unit of SOL)
              } else {
                  console.error("Error in response:", data.error);
                  return null;
              }
        }else if (chain == 'ETH'){
            if (data.result) {
                console.log(data)
                const res = data.result ; 
                const bal = hexToEther(res)
                return bal ; 

              } else {
                  console.error("Error in response:", data.error);
                  return null;
              }
        }
        
    } catch (error) {
        console.error("Error fetching balance:", error);
        return null;
    }
  }
  




  function hexToEther(hexWei: string): number {
    // Convert the hexadecimal string to a BigInt
    const wei = BigInt(hexWei);

    // 1 Ether = 10^18 wei, so divide the wei by 10^18
    const ether = Number(wei) / 10 ** 18;

    return ether;
}