export const SET_WALLETS = 'SET_WALLETS'
export const SET_WALLET = 'SET_WALLET'
export const REMOVE_WALLET = 'REMOVE_WALLET'
export const ADD_WALLET = 'ADD_WALLET'
export const UPDATE_WALLET = 'UPDATE_WALLET'
export const ADD_WALLET_MSG = 'ADD_WALLET_MSG'

const initialState = {
    wallets: [],
    wallet: null
}

export function walletReducer(state = initialState, action) {
    var newState = state
    var wallets
    switch (action.type) {
        case SET_WALLETS:
            newState = { ...state, wallets: action.wallets }//delete
            break
        case SET_WALLET:
            newState = { ...state, wallet: action.wallet }
            break
        case REMOVE_WALLET:
            const lastRemovedWallet = state.wallets.find(wallet => wallet._id === action.walletId)
            wallets = state.wallets.filter(wallet => wallet._id !== action.walletId)
            newState = { ...state, wallets, lastRemovedWallet }
            break
        case ADD_WALLET:
            newState = { ...state, wallets: [...state.wallets, action.wallet] }
            break
            case UPDATE_WALLET:
                wallets = state.wallets.map(wallet => (wallet._id === action.wallet._id) ? action.wallet : wallet)
                // newState = { ...state, wallet: action.wallet }
                newState = { ...state, wallets, wallet: action.wallet }
            break
        case ADD_WALLET_MSG:
            newState = { ...state, wallet: { ...state.wallet, msgs: [...state.wallet.msgs || [], action.msg] } }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const wallet1 = { _id: 'b101', vendor: 'Wallet ' + parseInt(Math.random() * 10), msgs: [] }
    const wallet2 = { _id: 'b102', vendor: 'Wallet ' + parseInt(Math.random() * 10), msgs: [] }

    state = walletReducer(state, { type: SET_WALLETS, wallets: [wallet1] })
    console.log('After SET_WALLETS:', state)

    state = walletReducer(state, { type: ADD_WALLET, wallet: wallet2 })
    console.log('After ADD_WALLET:', state)

    state = walletReducer(state, { type: UPDATE_WALLET, wallet: { ...wallet2, vendor: 'Good' } })
    console.log('After UPDATE_WALLET:', state)

    state = walletReducer(state, { type: REMOVE_WALLET, walletId: wallet2._id })
    console.log('After REMOVE_WALLET:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = walletReducer(state, { type: ADD_WALLET_MSG, walletId: wallet1._id, msg })
    console.log('After ADD_WALLET_MSG:', state)

    state = walletReducer(state, { type: REMOVE_WALLET, walletId: wallet1._id })
    console.log('After REMOVE_WALLET:', state)
}

