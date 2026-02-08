import React, { Component } from "react";
import { encrypt } from "../crypto";

const toPublicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.4.3
Comment: https://openpgpjs.org

xlIEXEAREBMIKoZIzj0DAQcCAwRkzY39xUmbV9KHIoRtkpJn4UBC8q2i7Hak
22KtIrMovXxmfpTAH99xq6f1X69O7IPKvVyUBU8ImLwmXmDLskdxzR5oYmhi
aGIgPGZyYW5rd2VpQGZyYW5rd2VpLnh5ej7CdwQQEwgAHwUCXEAREAYLCQcI
AwIEFQgKAgMWAgECGQECGwMCHgEACgkQ3dOM55UGTOnlygEAqVpgpbjVx/Wf
oBKo3HSWvVwohKWT5CJYHyk2kCVAC+IA/0u552WCg3Tqtlt3S09voG6vwELX
bo+C252OM+d5tv99zlYEXEAREBIIKoZIzj0DAQcCAwQOtIyxYHTRgHo+UEko
rsyDTIvGo83/rbR7m8fge1yTboYaHl3XT+LXeTS4/hyGHo0v+q/jSIort9SB
WxjeKd2BAwEIB8JhBBgTCAAJBQJcQBEQAhsMAAoJEN3TjOeVBkzpwzcA/AwG
9h6yJh9wr/5NfU+cJI6f1UwgUWp3Mt3MLl1ks9VXAP9Po6WDIR+ujnbmALua
Em8QcBab/u5EZQQkdMhWLOMCGA==
=BItM
-----END PGP PUBLIC KEY BLOCK-----
`

class Encryption extends Component {
    state = {
        message: '',
        toPublicKey,
        encryptedMessage: ''
    }
    inputMessage(e) {
        let message = e.target.value
        this.setState({ message })
    }
    inputPublicKey(e) {
        let toPublicKey = e.target.value
        this.setState({ toPublicKey })
    }
    async encryptMsg() {
        const { toPublicKey, message } = this.state
        const { data } = await encrypt(toPublicKey, message)
        this.setState({ encryptedMessage: data })
    }
    render() {
        return (
            <div className="Encryption">
                <div className="columns">
                    <div className="column">
                        <textarea className="textarea"
                            value={this.state.message}
                            onChange={e => this.inputMessage(e)}
                            placeholder="输入你要加密的内容"></textarea>
                    </div>
                    <div className="column">
                        <textarea className="textarea"
                            value={this.state.toPublicKey}
                            onChange={e => this.inputPublicKey(e)}
                            placeholder="请输入对方的公钥 (Public Key)"></textarea>
                    </div>
                </div>
                <div>
                    <button className="button is-primary is-fullwidth is-large"
                        onClick={() => this.encryptMsg()}>加密</button>
                    <textarea className="textarea" readOnly
                        value={this.state.encryptedMessage}
                        placeholder="加密后的报文在这儿..."></textarea>
                </div>
            </div>
        )
    }
}


export default Encryption

