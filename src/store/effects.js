import { withReduxDevtools, withLogger } from 'undux'

const listenAndUpdateLocalStorage = (store) =>
    (name) =>
        store
            .on(name)
            .subscribe(val => {
                console.log(`The user updated ${name} to`, val)
                localStorage.setItem(name, val)
            })

const effects = store => {
    withReduxDevtools(store)
    withLogger(store)
    store.on('privateKey').subscribe(privKey => {
        localStorage.setItem('privateKeyArmored', privKey.armor())
        const pubKey = privKey.toPublic()
        console.info(`PubKey from PrivKey ${JSON.stringify(pubKey)}`)
        store.set('publicKey')(pubKey)
    })
    return store
}



export default effects