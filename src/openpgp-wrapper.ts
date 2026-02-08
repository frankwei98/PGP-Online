
import * as openpgpPkg from 'openpgp';

// Handle Vite/Rollup CJS/ESM interop issues where named exports might be missing
// or hidden under the default export.
// @ts-ignore
const openpgp = openpgpPkg.default || openpgpPkg;

export const readPrivateKey = openpgp.readPrivateKey;
export const generateKey = openpgp.generateKey;
export const readKey = openpgp.readKey;
export const createMessage = openpgp.createMessage;
export const encrypt = openpgp.encrypt;
export const decrypt = openpgp.decrypt;
export const decryptKey = openpgp.decryptKey;
export const readMessage = openpgp.readMessage;
