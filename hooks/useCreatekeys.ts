import * as bip39 from 'bip39';
import * as bip32 from 'bip32';
import bitcoin from 'bitcoinjs-lib';
import { ethers, HDNodeWallet, Wallet } from 'ethers';
import { derivePath } from 'ed25519-hd-key'; // For Solana path derivation
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js'; // Solana keypair generation
// import * as bitcoin from 'bitcoinjs-lib';

// const  HDKey = require("hdkey");
// const CoinKey = require("coinkey");

interface KeyPair {
    publicKey: string;
    privateKey: string;
}

export const deriveKeys = async (
    mnemonic: string,
    blockchain: 'ETH' | 'SOL',
    currentIndex: number
): Promise<KeyPair> => {
    // Validate mnemonic
    if (!bip39.validateMnemonic(mnemonic)) {
        throw new Error('Invalid mnemonic');
    }

    // Generate seed from mnemonic
    const seed = await bip39.mnemonicToSeed(mnemonic);

    let path: string, publicKey: string, privateKey: string;

//     if (blockchain === 'BTC') 
//         {
//     path = `m/44'/0'/${currentIndex}'/0'`;
// // Create an HD wallet key from the seed
// const hdKey = HDKey.fromMasterSeed(seed, "hex");

// // Define the BIP44 path for Bitcoin (m/44'/0'/0'/0/0)

// // Derive a child key from the HD key using the defined path
// const child = hdKey.derive(path);

// // Create a CoinKey from the derived child private key and specify the Bitcoin network
// const coinKey = new CoinKey(child.privateKey, bitcoin.networks.bitcoin);

    
//         publicKey =  coinKey.publicAddress,          // Bitcoin public address
//         privateKey = coinKey.privateKey.toString("hex") // Private key in hexadecimal
//     }

      if (blockchain === 'ETH') 
        {
        // Ethereum BIP44 path
        path = `m/44'/60'/${currentIndex}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(path);
        const pvkey = child.privateKey;
        const wallet = new Wallet(pvkey);

        // const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);

        privateKey = wallet.privateKey;
        publicKey = wallet.address;

    } else if (blockchain === 'SOL') 
        {
        // Solana derivation path
        path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString('hex')).key;
        const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);
        const solKeypair = Keypair.fromSecretKey(keypair.secretKey);
        privateKey = Buffer.from(solKeypair.secretKey).toString('hex');
        publicKey = solKeypair.publicKey.toBase58();
    } else {
        throw new Error('Unsupported blockchain');
    }

    return { publicKey, privateKey };
};

// Example usage:
// (async () => {
//     const mnemonic = 'your test mnemonic here'; // Replace with your mnemonic
//     const currentIndex = 0; // Example index

//     const btcKeys = await deriveKeys(mnemonic, 'BTC', currentIndex);
//     console.log('Bitcoin Keys:', btcKeys);

//     const ethKeys = await deriveKeys(mnemonic, 'ETH', currentIndex);
//     console.log('Ethereum Keys:', ethKeys);

//     const solKeys = await deriveKeys(mnemonic, 'SOL', currentIndex);
//     console.log('Solana Keys:', solKeys);
// })();
