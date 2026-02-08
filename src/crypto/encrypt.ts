import openpgp, { message, key } from "openpgp";

async function encrypt(pubkey: string, text: string) {
    // @ts-ignore - openpgp types
    const publicKeys = (await key.readArmored(pubkey)).keys
    const options = {
        message: message.fromText(text),       // input as Message object
        publicKeys // for encryption
        // privateKey: [privKeyObj]                                 // for signing (optional) TODO
    }
    // @ts-ignore - openpgp types
    return openpgp.encrypt(options)
}

export { encrypt }
