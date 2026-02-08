import { create } from "zustand";
import type { PrivateKey, PublicKey } from "openpgp";

// In OpenPGP v5, keys are objects (PrivateKey, PublicKey).
// We use PrivateKey as the main stored type, and PublicKey derived from it.
// The `armor()` method exists on both.
// `toPublic()` exists on PrivateKey.

interface StoreState {
  publicKey: PublicKey | null;
  privateKey: PrivateKey | null;
  setPrivateKey: (privateKey: PrivateKey) => void;
  setPublicKey: (publicKey: PublicKey) => void;
}

const useStore = create<StoreState>((set) => ({
  publicKey: null,
  privateKey: null,
  setPrivateKey: (privateKey: PrivateKey) => {
    // Effect: Persist to localStorage
    localStorage.setItem("privateKeyArmored", privateKey.armor());

    // Effect: Derive public key
    const publicKey = privateKey.toPublic();

    set({ privateKey, publicKey });
  },
  setPublicKey: (publicKey: PublicKey) => set({ publicKey }),
}));

export default useStore;
