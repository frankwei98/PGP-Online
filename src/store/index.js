import { create } from 'zustand';

const useStore = create((set, get) => ({
    publicKey: null,
    privateKey: null,
    setPrivateKey: (privateKey) => {
        // Effect: Persist to localStorage
        localStorage.setItem('privateKeyArmored', privateKey.armor());
        
        // Effect: Derive public key
        const publicKey = privateKey.toPublic();
        
        set({ privateKey, publicKey });
    },
    setPublicKey: (publicKey) => set({ publicKey })
}));

export default useStore;
