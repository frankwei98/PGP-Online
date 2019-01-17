import openpgp, { message, key } from "openpgp";


async function decrypt(privkey, passphrase, encrypted) {
    const privKeyObj = (await key.readArmored(privkey)).keys[0]
    await privKeyObj.decrypt(passphrase)
    const options = {
        message: await message.readArmored(encrypted),    // parse armored message
        // publicKey: (await openpgp.key.readArmored(pubkey)).keys, // for verification (optional) TODO
        privateKeys: [privKeyObj]                                 // for decryption
    }
    return openpgp.decrypt(options)
}

export { decrypt }