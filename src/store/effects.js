import { withReduxDevtools, withLogger } from 'undux'

const effects = store => {
    withReduxDevtools(store)
    withLogger(store)
    store.on('privateKey').subscribe(privKey => {
        localStorage.setItem('privateKeyArmored', privKey.armor())
        const pubKey = privKey.toPublic()
        store.set('publicKey')(pubKey)
    })
    return store
}



export default effects