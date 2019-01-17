import openpgp, { message, key } from "openpgp";

async function encrypt(pubkey, text) {
    const publicKeys = (await key.readArmored(pubkey)).keys
    const options = {
        message: message.fromText(text),       // input as Message object
        publicKeys // for encryption
        // privateKey: [privKeyObj]                                 // for signing (optional) TODO
    }
    return openpgp.encrypt(options)
}

export { encrypt }