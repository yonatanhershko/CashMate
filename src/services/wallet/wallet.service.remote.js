import { httpService } from "../http.service";
//info: for adding new users to te same wallet add "ownerId": ObjectId("..."),
//   "sharedWith": [ObjectId("..."), ObjectId("...")], inside the wallet
export const walletService = {
    query,
    getById,
    save,
    remove,
    addWalletMsg,
};

async function query() {
    return httpService.get(`wallet`); // wallet - no routes matched location
}

function getById(walletId) {
    return httpService.get(`wallet/${walletId}`);
}

async function remove(walletId) {
    return httpService.delete(`wallet/${walletId}`);
}
async function save(wallet) {
    var savedWallet;
    if (wallet._id) {
        savedWallet = await httpService.put(`wallet/${wallet._id}`, wallet);
    } else {
        savedWallet = await httpService.post("wallet", wallet);
    }
    return savedWallet;
}

async function addWalletMsg(walletId, txt) {
    const savedMsg = await httpService.post(`wallet/${walletId}/msg`, { txt });
    return savedMsg;
}
