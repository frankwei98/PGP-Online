import React, { useState, useEffect } from "react";
import { decrypt } from "../crypto";
import useStore from "../store";

const Decryption = () => {
    const [encryptedMessage, setEncryptedMessage] = useState('');
    const [privateKeyToUnlock, setPrivateKeyToUnlock] = useState('');
    const [privateKeyUnlockPassphrase, setPrivateKeyUnlockPassphrase] = useState('');
    const [decryptedMessage, setDecryptedMessage] = useState('');
    
    const privateKey = useStore((state) => state.privateKey);

    useEffect(() => {
        if (privateKey) {
            setPrivateKeyToUnlock(privateKey.armor());
        }
    }, [privateKey]);

    const handleDecryptMsg = async () => {
        const { data } = await decrypt(privateKeyToUnlock, privateKeyUnlockPassphrase, encryptedMessage);
        setDecryptedMessage(data);
    };

    return (
        <div className="Decryption">
            <div className="columns">
                <div className="column">
                    <textarea className="textarea"
                        value={encryptedMessage}
                        onChange={e => setEncryptedMessage(e.target.value)}
                        placeholder="输入你收到的密文"></textarea>
                </div>
                <div className="column">
                    <textarea className="textarea"
                        value={privateKeyToUnlock}
                        onChange={e => setPrivateKeyToUnlock(e.target.value)}
                        placeholder="请输入你的私钥 (Private Key)"></textarea>
                    <input className="input" type="password" placeholder="请输入密钥保护密码解锁"
                        autoComplete="new-password"
                        onChange={e => setPrivateKeyUnlockPassphrase(e.target.value)}></input>
                </div>
            </div>
            <div>
                <button className="button is-primary is-fullwidth is-large"
                    onClick={handleDecryptMsg}>解密</button>
                <textarea className="textarea" readOnly
                    value={decryptedMessage}
                    placeholder="解密后的报文在这儿..."></textarea>
            </div>
        </div>
    );
}

export default Decryption;
