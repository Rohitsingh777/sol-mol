import * as solanaWeb3 from "@solana/web3.js";

export type transaction = {
  type?: "send" | "receive" | undefined;
  amount?: number | undefined;
  sender?: string | undefined;
  receiver?: string | undefined;
  date?: Date | undefined;
  signature?: string | undefined;
  status?: string | undefined;
};

export type transactions = transaction[];

const endpoint =
  "https://solana-devnet.g.alchemy.com/v2/nk304O7Mf4G87YvTcHbf-gXPM-9Pu2g0"; // Solana JSON-RPC endpoin
const solanaConnection = new solanaWeb3.Connection(endpoint);

export const getSolTransactions = async (
  address: string,
  numTx: number
): Promise<transactions> => {
  let transactions_result: transactions = []; //list of all the transactions ;

  const pubKey =  new solanaWeb3.PublicKey(address);
  let transactionList = await solanaConnection.getSignaturesForAddress(pubKey, {
    limit: numTx
  });
  let signatureList = transactionList.map(
    (transaction) => transaction.signature
  );
  let transactionDetails = await solanaConnection.getParsedTransactions(
    signatureList,
    { maxSupportedTransactionVersion: 0 }
  );

  transactionList.forEach((transaction, i) => {
    let trans_end: transaction = {};
    // console.log(JSON.stringify(transaction))
    const date = new Date(transaction.blockTime * 1000);
    trans_end = { ...trans_end, date };
    const transactionInstructions = transactionDetails[i].transaction.message.instructions;

    // console.log(`Transaction No: ${i + 1}`);
    // console.log(`Signature: ${transaction.signature}`);
    // console.log(`Time: ${date}`);

    trans_end = { ...trans_end, signature: transaction.signature };
    console.log(`Status: ${transaction.confirmationStatus}`);
    trans_end = { ...trans_end, status: transaction.confirmationStatus };
    if (transactionInstructions.length == 1) {
      transactionInstructions.forEach((instruction) => {
        try {
          const sender = instruction.parsed.info.source;
          const receiver = instruction.parsed.info.destination;
          const amount = instruction.parsed.info.lamports;
          trans_end = { ...trans_end, sender, receiver, amount };
          if (sender == address) {
            const type = "send";
            trans_end = { ...trans_end, type };
          } else {
            trans_end = { ...trans_end, type: "receive" };
          }
        }
         catch {
          const sender = undefined;
          const receiver = undefined;
          const amount = undefined;
          const type = "send";
          trans_end = { ...trans_end, sender, receiver, amount, type };
        }
        transactions_result.push(trans_end);
      });
    } else {
      const sender = undefined;
      const receiver = undefined;
      const amount = undefined;
      const type = "send";
      trans_end = { ...trans_end, sender, receiver, amount, type };
      transactions_result.push(trans_end);
    }

    // console.log(("-").repeat(50));
  });

  return transactions_result;
};

// const searchAddress = 'vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg';
// getTransactions(searchAddress, 3) ;
