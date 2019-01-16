import openpgp from "openpgp";
openpgp.config.compression = openpgp.enums.compression.zlib


async function decrypt(privkey, encrypted) {
    const privKeyObj = (await openpgp.key.readArmored(privkey)).keys[0]
    await privKeyObj.decrypt(passphrase)
    const options = {
        message: await openpgp.message.readArmored(encrypted),    // parse armored message
        // publicKeys: (await openpgp.key.readArmored(pubkey)).keys, // for verification (optional) TODO
        privateKeys: [privKeyObj]                                 // for decryption
    }
    return openpgp.decrypt(options)
}

export { decrypt }