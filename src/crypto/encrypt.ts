import * as openpgp from "openpgp";

async function encrypt(pubkey: string, text: string) {
  const encryptionKeys = await openpgp.readKey({ armoredKey: pubkey });
  const message = await openpgp.createMessage({ text });

  const encrypted = await openpgp.encrypt({
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
