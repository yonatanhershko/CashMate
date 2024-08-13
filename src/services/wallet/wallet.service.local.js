
import { storageService } from '../async-storage.service'
import { loadFromStorage, makeId, saveToStorage } from '../util.service'

const STORAGE_KEY = 'wallet'

_createWallet()

export const walletService = {
    query,
    getById,
    save,
    remove,
    addWalletMsg
}

window.cs = walletService


async function query() {
    var wallets = await storageService.query(STORAGE_KEY)
    return wallets
}

function getById(walletId) {
    return storageService.get(STORAGE_KEY, walletId)
}

async function remove(walletId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, walletId)
}

async function save(wallet) {
    var savedWallet
    // console.log(wallet);
    const theme = wallet.style
    if (wallet._id) {
        const walletToSave = {
            _id: wallet._id,
            title: wallet.title,
            style: { mode: theme.mode },
            balance: wallet.balance,
            activities: wallet.activities

        }
        savedWallet = await storageService.put(STORAGE_KEY, walletToSave)
    } else {
        const walletToSave = {
            title: wallet.title
        }
        savedWallet = await storageService.post(STORAGE_KEY, walletToSave)
    }
    return savedWallet
}

async function addWalletMsg(walletId, txt) {
    // Later, this is all done by the backend
    const wallet = await getById(walletId)

    const msg = {
        id: makeId(),
        txt
    }
    wallet.msgs.push(msg)
    await storageService.put(STORAGE_KEY, wallet)

    return msg
}

async function _createWallet() {
    let wallets = await loadFromStorage(STORAGE_KEY)
    if (wallets && wallets.length !== 0) return
    wallets = [
        {
            _id: makeId(),
            title: 'Yona Wallet',
            description: 'A demo wallet with dark mode',
            balance: 1500,
            currency: '₪',
            archivedAt: null,
            createdBy: {
                id: 'u101',
                name: 'John Doe',
                img: 'https://example.com/john-doe-profile.jpg'
            },
            style: {
                mode: 'light'
            },
            members: [
                {
                    id: 'u101',
                    name: 'John Doe',
                    img: 'https://example.com/john-doe-profile.jpg'
                },
                {
                    id: 'u102',
                    name: 'Jane Smith',
                    img: 'https://example.com/jane-smith-profile.jpg'
                }
            ],
            activities: [
                {
                    id: 'a101',
                    type: 'add',
                    amount: 1000,
                    date: Date.now() - 86400000, // Yesterday
                    description: 'Initial deposit',
                    memberId: 'u101'
                },
                {
                    id: 'a102',
                    type: 'add',
                    amount: 700,
                    date: Date.now() - 3600000, // 1 hour ago
                    description: 'Salary',
                    memberId: 'u102'
                },
                {
                    id: 'a103',
                    type: 'remove',
                    amount: 200,
                    date: Date.now(), // Now
                    description: 'Groceries',
                    memberId: 'u101'
                },
                {
                    id: 'a104',
                    type: 'add',
                    amount: 1000,
                    date: Date.now() - 86400000, // Yesterday
                    description: 'Initial deposit',
                    memberId: 'u102'
                },
                {
                    id: 'a105',
                    type: 'add',
                    amount: 700,
                    date: Date.now() - 3600000, // 1 hour ago
                    description: 'Salary',
                    memberId: 'u102'
                },
                {
                    id: 'a106',
                    type: 'remove',
                    amount: 200,
                    date: Date.now(), // Now
                    description: 'Groceries',
                    memberId: 'u101'
                }
            ],
            isLocked: false
        }
    ]
    saveToStorage(STORAGE_KEY, wallets)
}