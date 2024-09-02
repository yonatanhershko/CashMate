import { httpService } from '../http.service'

export const walletService = {
    query,
    getById,
    save,
    remove,
    addWalletMsg
}

async function query() {
    return httpService.get(`wallet`)
}

function getById(walletId) {
    return httpService.get(`wallet/${walletId}`)
}

async function remove(walletId) {
    return httpService.delete(`wallet/${walletId}`)
}
async function save(wallet) {
    var savedWallet
    const theme = wallet.style
    // console.log(wallet)
    if (wallet._id) {
        const walletToSave = {
            _id: wallet._id,
            title: wallet.title,
            style: { mode: theme.mode },
            balance: wallet.balance,
            activities: wallet.activities

        }
        savedWallet = await httpService.put(`wallet/${wallet._id}`, walletToSave)
    } else {
        const walletToSave = {
            title: wallet.title
        }
        savedWallet = await httpService.post('wallet', walletToSave)
    }
    return savedWallet
}

async function addWalletMsg(walletId, txt) {
    const savedMsg = await httpService.post(`wallet/${walletId}/msg`, { txt })
    return savedMsg
}