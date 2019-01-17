import React, { Component } from "react";
import openpgp, { key } from "openpgp";
import { withStore } from "../store";
import CopyableTextarea from "../components/CopyableTextarea";

class KeyGen extends Component {
    state = {
        isKeyExist: false,
        name: null,
        email: null,
        passphrase: null
    }

    handleChanges(e, field) {
        const { value } = e.target
        let tmp = {}
        tmp[field] = value
        this.setState(tmp)
    }

    componentDidMount() {
        const { store } = this.props
        const isKeyExist = !!store.get('privateKey')
        console.info(`Is Key Exist in the localStorage: ${isKeyExist}`)
        this.setState({ isKeyExist })
    }

    async keygen(e) {
        e.preventDefault()
        const { name, email, passphrase } = this.state
        var options = {
            userIds: [{ name, email }], // multiple user IDs
            curve: "p256",           // ECC curve name
            // numBits: 4096,    // RSA key size
            passphrase       // protects the private key
        };
        const {
            privateKeyArmored,
        } = await openpgp.generateKey(options)
        const { store } = this.props
        const privateKey = (await key.readArmored(privateKeyArmored)).keys[0]
        store.set('privateKey')(privateKey)
        this.setState({ isKeyExist: true })
    }

    warmlyInstruction() {
        return this.state.isKeyExist
            ? <div className="KeyExist">你已经生成了密钥对，需要更换密钥吗？</div>
            : <div className="KeyNotExist">你还没有密钥对，填写下方信息即可生成（仅供验证密文用，无需真实信息）</div>
    }

    keyDisplay() {
        const { store } = this.props

        return (
            <div className="mykey columns">
                <div className="control column">
                    <h2 className="title">Your Public Key</h2>
                    <h2 className="subtitle">It's OK to share your Public Key with anyone who want to send a secret messages.</h2>
                    <CopyableTextarea name="publicKey" text={store.get('publicKey').armor()}></CopyableTextarea>
                </div>
                <div className="control column">
                    <h2 className="title">Your (Armored) Private Key</h2>
                    <h2 className="subtitle">No one can use your Private Key unless your key-protection passphrase was compromised.</h2>
                    <CopyableTextarea name="privateKey" text={store.get('privateKey').armor()}></CopyableTextarea>
                </div>
            </div>
        )
    }

    render() {

        return (
            <div className="key-gen">
                <h1 className="title">密钥管理</h1>
                {this.warmlyInstruction()}
                <form>
                    <input className="input" type="text" placeholder="名字或昵称，用于辨识密钥身份"
                        onChange={e => this.handleChanges(e, 'name')}></input>
                    <input className="input" type="email" placeholder="与密钥所关联的电子邮箱"
                        autoComplete="username"
                        onChange={e => this.handleChanges(e, 'email')}></input>
                    <input className="input" type="password" placeholder="密钥保护密码， 可包含多个空格"
                        autoComplete="new-password"
                        onChange={e => this.handleChanges(e, 'passphrase')}></input>
                    <button className="button primary"
                        onClick={e => this.keygen(e)} >生成</button>
                </form>
                {this.state.isKeyExist && this.keyDisplay()}
            </div>
        )

    }
}
export default withStore(KeyGen)
