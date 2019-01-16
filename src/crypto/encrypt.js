import openpgp from "openpgp";

openpgp.config.compression = openpgp.enums.compression.zlib

async function encrypt(pubkey, text) {
    const options = {
        message: openpgp.message.fromText(text),       // input as Message object
        publicKeys: (await openpgp.key.readArmored(pubkey)).keys, // for encryption
        // privateKeys: [privKeyObj]                                 // for signing (optional) TODO
    }
    return openpgp.encrypt(options)
}

export { encrypt }