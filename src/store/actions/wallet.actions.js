import { walletService } from '../../services/wallet'
import { store } from '../store'
import { ADD_WALLET, REMOVE_WALLET, SET_WALLETS, SET_WALLET, UPDATE_WALLET, ADD_WALLET_MSG } from '../reducers/wallet.reducer'


export async function loadWallet(walletId) {
    try {
        const wallet = await walletService.getById(walletId)
        store.dispatch(getCmdSetWallet(wallet))
    } catch (err) {
        console.log('Cannot load wallet', err)
        throw err
    }
}


export async function removeWallet(walletId) {
    try {
        await walletService.remove(walletId)
        store.dispatch(getCmdRemoveWallet(walletId))
    } catch (err) {
        console.log('Cannot remove wallet', err)
        throw err
    }
}

export async function addWallet(wallet) {
    try {
        const savedWallet = await walletService.save(wallet)
        store.dispatch(getCmdAddWallet(savedWallet))
        return savedWallet
    } catch (err) {
        console.log('Cannot add wallet', err)
        throw err
    }
}

export async function updateWallet(wallet) {
    try {
        const savedWallet = await walletService.save(wallet)
        console.log(savedWallet)
        

        store.dispatch(getCmdUpdateWallet(savedWallet))
        return savedWallet
    } catch (err) {
        console.log('Cannot save wallet', err)
        throw err
    }
}

export async function addWalletMsg(walletId, txt) {
    try {
        const msg = await walletService.addWalletMsg(walletId, txt)
        store.dispatch(getCmdAddWalletMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add wallet msg', err)
        throw err
    }
}

function getCmdSetWallet(wallet) {
    return {
        type: SET_WALLET,
        wallet
    }
}
function getCmdRemoveWallet(walletId) {
    return {
        type: REMOVE_WALLET,
        walletId
    }
}
function getCmdAddWallet(wallet) {
    return {
        type: ADD_WALLET,
        wallet
    }
}
function getCmdUpdateWallet(wallet) {
    return {
        type: UPDATE_WALLET,
        wallet
    }
}
function getCmdAddWalletMsg(msg) {
    return {
        type: ADD_WALLET_MSG,
        msg
    }
}

// unitTestActions()
async function unitTestActions() {
    await addWallet(walletService.getEmptyWallet())
    await updateWallet({
        _id: 'm1oC7',
        title: 'Wallet-Good',
    })
    await removeWallet('m1oC7')
    // TODO unit test addWalletMsg
}
