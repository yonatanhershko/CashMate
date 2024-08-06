const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { walletService as local } from './wallet.service.local'
import { walletService as remote } from './wallet.service.remote'

function getEmptyWallet() {
    return {
        title: '',
        description: '',
        balance: 0,
        currency: 'ILS',
        archivedAt: null,
        createdBy: {
            id: '',
            name: '',
            img: ''
        },
        style: {
            mode: 'dark',
            darkMode: {
                backgroundColor: '#1a1a1a',
                textColor: '#ffffff',
            },
            lightMode: {
                backgroundColor: '#ffffff',
                textColor: '#000000',
            }
        },
        members: [],
        activities: [],
        isLocked: true
    }

}




const service = VITE_LOCAL === 'true' ? local : remote
export const walletService = { getEmptyWallet, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.walletService = walletService



// wallet
const wallet = {
    id: 'unique-id-123',
    balance: 0,
    currency: 'ILS',
    style: {
        mode: 'dark',
        darkMode: {
            backgroundColor: '#1a1a1a',
            textColor: '#ffffff',
        },
        lightMode: {
            backgroundColor: '#ffffff',
            textColor: '#000000',
        }
    },
    activities: [
        // Example activity
        {
            id: 'activity-1',
            type: 'add',
            amount: 100,
            date: new Date('2024-08-06T10:00:00'),
            description: 'Salary deposit'
        },
    ],
    members: [
        // Example member
        {
            id: 'member-1',
            name: 'John Doe',
            imgUrl:''
        },
    ],
    createdBy: 'creator-id',
    title: 'My Wallet',
    description: '',
    isLocked: true,
}