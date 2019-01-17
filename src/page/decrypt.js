import React, { Component } from "react";
import { withStore } from "../store";
import { decrypt } from "../crypto";


class Decryption extends Component {
    state = {
        encryptedMessage: '',
        privateKeyToUnlock: '',
        privateKeyUnlockPassphrase: '',
        decryptedencryptedMessage: ''
    }
    componentDidMount() {
        const { store } = this.props
        const privateKey = store.get('privateKey')
        if (privateKey) {
            const privateKeyToUnlock = privateKey.armor()
            this.setState({ privateKeyToUnlock })
        }
    }
    inputencryptedMessage(e) {
        let encryptedMessage = e.target.value
        this.setState({ encryptedMessage })
    }
    inputPublicKey(e) {
        let privateKeyToUnlock = e.target.value
        this.setState({ privateKeyToUnlock })
    }
    inputUnlockPassphrase(e) {
        let privateKeyUnlockPassphrase = e.target.value
        this.setState({ privateKeyUnlockPassphrase })
    }
    async decryptMsg() {
        const { privateKeyToUnlock, encryptedMessage, privateKeyUnlockPassphrase } = this.state
        const { data } = await decrypt(privateKeyToUnlock, privateKeyUnlockPassphrase, encryptedMessage)
        this.setState({ decryptedencryptedMessage: data })
    }
    render() {
        return (
            <div className="Decryption">
                <div className="columns">
                    <div className="column">
                        <textarea className="textarea"
                            value={this.state.encryptedMessage}
                            onChange={e => this.inputencryptedMessage(e)}
                            placeholder="输入你收到的密文"></textarea>
                    </div>
                    <div className="column">
                        <textarea className="textarea"
                            value={this.state.privateKeyToUnlock}
                            onChange={e => this.inputPublicKey(e)}
                            placeholder="请输入你的私钥 (Private Key)"></textarea>
                        <input className="input" type="password" placeholder="请输入密钥保护密码解锁"
                            autoComplete="new-password"
                            onChange={e => this.inputUnlockPassphrase(e)}></input>
                    </div>
                </div>
                <div>
                    <button className="button is-primary is-fullwidth is-large"
                        onClick={() => this.decryptMsg()}>解密</button>
                    <textarea className="textarea" readOnly
                        value={this.state.decryptedencryptedMessage}
                        placeholder="解密后的报文在这儿..."></textarea>
                </div>
            </div>
        )
    }
}


export default withStore(Decryption)