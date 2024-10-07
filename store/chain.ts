

import { atom } from 'recoil';

export interface chains {
    chain : 'ETH' | 'SOL' ;
}

export const chainState = atom<chains>({
    key: 'chians', 
    default: {
        chain : 'SOL'
    },
});
