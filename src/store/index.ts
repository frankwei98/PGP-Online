import { create } from 'zustand';

// Define a placeholder for the Key type since we are migrating
// We can refine this later with proper OpenPGP types
interface PGPKey {
    armor: () => string;
    toPublic: () => PGPKey;
    [key: string]: any;
}

interface StoreState {
    publicKey: PGPKey | null;
    privateKey: PGPKey | null;
    setPrivateKey: (privateKey: PGPKey) => void;
    setPublicKey: (publicKey: PGPKey) => void;
}

const useStore = create<StoreState>((set) => ({
    publicKey: null,
    privateKey: null,
    setPrivateKey: (privateKey: PGPKey) => {
        // Effect: Persist to localStorage
        localStorage.setItem('privateKeyArmored', privateKey.armor());
        
        // Effect: Derive public key
        const publicKey = privateKey.toPublic();
        
        set({ privateKey, publicKey });
    },
    setPublicKey: (publicKey: PGPKey) => set({ publicKey })
}));

export default useStore;
