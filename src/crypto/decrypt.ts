import { readPrivateKey, decryptKey, readMessage, decrypt as openpgpDecrypt } from "../openpgp-wrapper";

async function decrypt(privkey: string, passphrase: string, encrypted: string) {
  const privateKey = await readPrivateKey({ armoredKey: privkey });
  const decryptionKeys = await decryptKey({
    privateKey,
    passphrase,
  });

  const message = await readMessage({ armoredMessage: encrypted });

  const { data } = await openpgpDecrypt({
    message,
    decryptionKeys,
  });

  return { data: data as string };
}

export { decrypt };
