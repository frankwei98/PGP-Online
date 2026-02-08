import { readKey, createMessage, encrypt as openpgpEncrypt } from "../openpgp-wrapper";

async function encrypt(pubkey: string, text: string) {
  const encryptionKeys = await readKey({ armoredKey: pubkey });
  const message = await createMessage({ text });

  const encrypted = await openpgpEncrypt({
    message,
    encryptionKeys,
  });

  // openpgp.encrypt returns a string (armored) by default, or an object if format is 'object' or other
  // Default format is 'armored' which returns string.
  // However, the previous implementation returned { data: ... }.
  // If openpgp.encrypt returns a string directly, we wrap it.

  return { data: encrypted as string };
}

export { encrypt };
