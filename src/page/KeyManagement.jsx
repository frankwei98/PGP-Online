import React, { useState, useEffect } from "react";
import openpgp, { key } from "openpgp";
import { withStore } from "../store";
import CopyableTextarea from "../components/CopyableTextarea";

function KeyManagement(props) {
    const { store } = props
    const [isKeyExist, setIsKeyExist] = useState(false)
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [passphrase, setPassphrase] = useState(null)

    useEffect(() => {
        const isKeyExist = !!store.get('privateKey')
        console.info(`Is Key Exist in the localStorage: ${isKeyExist}`)
        setIsKeyExist(isKeyExist)
    })

    async function keyGenerate() {
        var options = {
            userIds: [{ name, email }], // multiple user IDs
            curve: "p256",           // ECC curve name
            passphrase       // protects the private key
        };
        const { privateKeyArmored } = await openpgp.generateKey(options)
        const privateKey = (await key.readArmored(privateKeyArmored)).keys[0]
        store.set('privateKey')(privateKey)
        setIsKeyExist(true)
    }


    function myKeyPair({ store }) {
        return (
            <div className="mykey columns">
                <div className="control column">
                    <h2 className="title">你的公钥 Public Key</h2>
                    <div className="notification is-info">请把公钥分享给朋友，让他通过公钥给你发悄悄话</div>
                    <CopyableTextarea name="publicKey" text={store.get('publicKey').armor()}></CopyableTextarea>
                </div>
                <div className="control column">
                    <h2 className="title">你的私钥 Private Key</h2>
                    <div className="notification is-danger">请不要分享私钥给任何人<br />你的私钥和密码组合一起，可以解开只属于你的秘密！</div>
                    <CopyableTextarea name="privateKey" text={store.get('privateKey').armor()}></CopyableTextarea>
                </div>
            </div>
        )
    }

    return (
        <div className="key-management">
            <h1 className="title">密钥管理</h1>
            {isKeyExist
                ?
                <div className="notification is-danger key-exist">
                    你已经生成了密钥对，需要更换密钥吗？
                </div>
                :
                <div className="notification is-info key-not-exist">
                    你还没有密钥对，填写下方信息即可生成（仅供验证密文用，无需真实信息）
                </div>
            }
            <form>
                <input className="input" type="text" placeholder="名字或昵称，用于辨识密钥身份"
                    onChange={e => setName(e.target.value)}></input>
                <input className="input" type="email" placeholder="与密钥所关联的电子邮箱"
                    autoComplete="username"
                    onChange={e => setEmail(e.target.value)}></input>
                <input className="input" type="password" placeholder="密钥保护密码， 可包含多个空格"
                    autoComplete="new-password"
                    onChange={e => setPassphrase(e.target.value)}></input>
                <button type="button" className="button primary"
                    onClick={() => keyGenerate()} >生成</button>
            </form>
            {isKeyExist && myKeyPair(props)}
        </div>
    )
}


export default withStore(KeyManagement)
