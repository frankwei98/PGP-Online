import { createConnectedStore } from 'undux'
import effects from './effects'

// Declare your store's initial state.
const initialState = {
    privateKeyArmored: localStorage.getItem('privateKeyArmored'),
    publicKeyArmored: localStorage.getItem('publicKeyArmored'),
    revocationCertificate: localStorage.getItem('revocationCertificate')
}

// Create & export a store with an initial value.
const Store = createConnectedStore(initialState, effects)
export const { withStore, Container } = Store
export default Store