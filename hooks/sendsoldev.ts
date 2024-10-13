

import { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL, Transaction, SystemProgram, PublicKey } from '@solana/web3.js';
import * as ethers from 'ethers';
import { err } from 'react-native-svg';
import Toast from 'react-native-toast-message';

// Function to convert hex string to Uint8Array
const hexToUint8Array = (hex: string): Uint8Array => {
  return new Uint8Array(hex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
};

export const sendSol = async (
  fromSecretKeyHex: string,  // Sender's private key in hex string format
  toPublicKey: string,       // Receiver's public address
  amountInSol: number        // Amount of SOL to send
): Promise<string | undefined > => {
  try {
    // Convert the hex string private key to Uint8Array
    const fromSecretKey: Uint8Array = hexToUint8Array(fromSecretKeyHex);

    // Create a Keypair for the sender using the secret key
    const fromKeypair: Keypair = Keypair.fromSecretKey(fromSecretKey);

    // Establish connection to the Solana devnet
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // The public key of the receiver (public address)
    const toPublicKeyAddress: PublicKey = new PublicKey(toPublicKey);

    // Calculate the amount in lamports
    const amountInLamports = amountInSol * LAMPORTS_PER_SOL ;

    // Create a transaction to transfer SOL
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toPublicKeyAddress,
        lamports: amountInLamports,
      })
    );

    // Send the transaction
    const signature = await connection.sendTransaction(transaction, [fromKeypair]);
    await connection.confirmTransaction(signature, 'confirmed');

    console.log(`Transaction successful with signature: ${signature}`);
    return signature;
  } catch (error) {
      console.log(error) ;
    let x = 'Failed: ' +  error  ; 
    return x ;
  }
};







export const sendEth =  async ( 
    fromSecretKey: string,  // Sender's private key in hex string format
    toPublicKey: string,       // Receiver's public address
    amountInEth: string       
)  => {

// Connect to Ganache running on localhost:8545
const provider = new ethers.JsonRpcProvider('http://localhost:8545');

// Replace with one of the pre-funded accounts Ganache provides (from the displayed accounts on launch)
const senderPrivateKey = fromSecretKey ;
const senderWallet = new ethers.Wallet(senderPrivateKey, provider);

// Replace with the receiver's address
const receiverAddress = toPublicKey ;

async function sendTransaction() {

    const tx = {
    to: receiverAddress,
    value: ethers.parseEther(amountInEth), // Sending amountInEth  ETH
  };

  try {
    const transactionResponse = await senderWallet.sendTransaction(tx);
    console.log('Transaction sent! Hash:', transactionResponse.hash);

    const receipt = await transactionResponse.wait();
    console.log('Transaction confirmed! Receipt:', receipt);
    return(receipt)
  } catch (error) {
    console.error('Error:', error);
  }

}
sendTransaction() ; 
}