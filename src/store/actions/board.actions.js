import { walletService } from '../../services/wallet'
import { store } from '../store'
import { ADD_WALLET, REMOVE_WALLET, SET_WALLETS, SET_WALLET, UPDATE_WALLET, ADD_WALLET_MSG } from '../reducers/wallet.reducer'


export async function loadWallet(boardId) {
    try {
        const board = await walletService.getById(boardId)
        store.dispatch(getCmdSetWallet(board))
    } catch (err) {
        console.log('Cannot load board', err)
        throw err
    }
}


export async function removeWallet(boardId) {
    try {
        await walletService.remove(boardId)
        store.dispatch(getCmdRemoveWallet(boardId))
    } catch (err) {
        console.log('Cannot remove board', err)
        throw err
    }
}

export async function addWallet(board) {
    try {
        const savedWallet = await walletService.save(board)
        store.dispatch(getCmdAddWallet(savedWallet))
        return savedWallet
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function updateWallet(board) {
    try {
        const savedWallet = await walletService.save(board)
        store.dispatch(getCmdUpdateWallet(savedWallet))
        return savedWallet
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}

export async function addWalletMsg(boardId, txt) {
    try {
        const msg = await walletService.addWalletMsg(boardId, txt)
        store.dispatch(getCmdAddWalletMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add board msg', err)
        throw err
    }
}

// Command Creators:
// function getCmdSetWallets(boards) {
//     return {
//         type: SET_WALLETS,
//         boards
//     }
// }
function getCmdSetWallet(board) {
    return {
        type: SET_WALLET,
        board
    }
}
function getCmdRemoveWallet(boardId) {
    return {
        type: REMOVE_WALLET,
        boardId
    }
}
function getCmdAddWallet(board) {
    return {
        type: ADD_WALLET,
        board
    }
}
function getCmdUpdateWallet(board) {
    return {
        type: UPDATE_WALLET,
        board
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
