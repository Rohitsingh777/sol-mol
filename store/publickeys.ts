

import { atom } from 'recoil';

interface CryptoKeys {
    eth: string;
    sol: string;
}

export const cryptoKeysAtom = atom<CryptoKeys>({
    key: 'cryptoKeys', 
    default: {
        eth: '',
        sol: '', 
    },
});
