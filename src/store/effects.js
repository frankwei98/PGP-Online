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
    const listener = listenAndUpdateLocalStorage(store)
    listener('privateKeyArmored')
    listener('publicKeyArmored')
    listener('revocationCertificate')
    // store
    //     .on('privateKeyArmored')
    //     .subscribe(privateKeyArmored => {
    //         console.log('The user updated privateKeyArmored to', privateKeyArmored)
    //         localStorage.setItem('privateKeyArmored', privateKeyArmored)
    //     })
    // store
    //     .on('publicKeyArmored')
    //     .subscribe(publicKeyArmored => {
    //         console.log('The user updated publicKeyArmored to', publicKeyArmored)
    //         localStorage.setItem('publicKeyArmored', publicKeyArmored)
    //     })
    // store
    //     .on('revocationCertificate')
    //     .subscribe(revocationCertificate => {
    //         console.log('The user updated revocationCertificate to', revocationCertificate)
    //         localStorage.setItem('revocationCertificate', revocationCertificate)
    //     })
    return store
}



export default effects