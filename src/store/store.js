import { legacy_createStore as createStore, combineReducers } from 'redux'

import { walletReducer } from './reducers/wallet.reducer'
import { systemReducer } from './reducers/system.reducer'

const rootReducer = combineReducers({
    walletModule: walletReducer,
    systemModule: systemReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })