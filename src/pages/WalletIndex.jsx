import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// import { loadwallet, addBoard, updateBoard, removeBoard, addBoardMsg } from '../store/actions/board.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { walletService } from '../services/wallet/index'

import { WalletPreview } from '../cmps/WalletPreview'
import { Filter } from '../cmps/BoardFilter'

export function WalletIndex() {

    const wallet = useSelector(storeState => storeState.walletModule.wallet)

    // useEffect(() => {
    //     loadBoards(filterBy)
    // }, [filterBy])

    return (
        <main className="index">
            <header>
                <h2>My Wallet</h2>
            </header>
            <WalletPreview
                wallet={wallet} />
        </main>
    )
}