import * as openpgp from "openpgp";

async function decrypt(privkey: string, passphrase: string, encrypted: string) {
  const privateKey = await openpgp.readPrivateKey({ armoredKey: privkey });
  const decryptionKeys = await openpgp.decryptKey({
    privateKey,
    passphrase,
  });

  const message = await openpgp.readMessage({ armoredMessage: encrypted });

  const { data } = await openpgp.decrypt({
    message,
    decryptionKeys,
  });

  return { data: data as string };
}

export { decrypt };
