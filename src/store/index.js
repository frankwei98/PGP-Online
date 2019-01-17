import { createConnectedStore } from 'undux'
import effects from './effects'

// Declare your store's initial state.
const initialState = {
    publicKey: null,
    privateKey: null
}

// Create & export a store with an initial value.
const Store = createConnectedStore(initialState, effects)
export const { withStore, Container } = Store
export default Store