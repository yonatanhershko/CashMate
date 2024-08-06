const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'

function getEmptyWallet() {
	return {
        title: '',
        isStarred: false,
        archivedAt: null,
        createdBy: {},
        style: {
            backgroundImage: 'https://images.unsplash.com/photo-1480497490787-505ec076689f?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        labels: [],
        members: [],
        groups: [],
        activities: [],
        cmpsOrder: [],
    }
    
}




const service = VITE_LOCAL === 'true' ? local : remote
export const boardService = { getEmptyWallet, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.boardService = boardService



// wallet
// const wallet = {
//     id: 'unique-id-123',
//     balance: 0,
//     currency: 'ILS',
//     style: {
//         mode: 'dark',
//         darkMode: {
//             backgroundColor: '#1a1a1a',
//             textColor: '#ffffff',
//         },
//         lightMode: {
//             backgroundColor: '#ffffff',
//             textColor: '#000000',
//         }
//     },
//     activities: [
//         // Example activity
//         {
//             id: 'activity-1',
//             type: 'add',
//             amount: 100,
//             date: new Date('2024-08-06T10:00:00'),
//             description: 'Salary deposit'
//         },
//     ],
//     members: [
//         // Example member
//         {
//             id: 'member-1',
//             name: 'John Doe',
//             img:''
//         },
//     ],
//     createdBy: 'creator-id',
//     title: 'My Wallet',
//     description: '',
//     isLocked: true,
// }