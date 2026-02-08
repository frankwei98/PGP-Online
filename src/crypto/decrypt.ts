import openpgp, { message, key } from "openpgp";

async function decrypt(privkey: string, passphrase: string, encrypted: string) {
    // @ts-ignore - openpgp types
    const privKeyObj = (await key.readArmored(privkey)).keys[0]
    await privKeyObj.decrypt(passphrase)
    const options = {
        message: await message.readArmored(encrypted),    // parse armored message
        // publicKey: (await openpgp.key.readArmored(pubkey)).keys, // for verification (optional) TODO
        privateKeys: [privKeyObj]                                 // for decryption
    }
    // @ts-ignore - openpgp types
    return openpgp.decrypt(options)
}

export { decrypt }
