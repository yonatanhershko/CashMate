import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// import { loadBoards, addBoard, updateBoard, removeBoard, addBoardMsg } from '../store/actions/board.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { boardService } from '../services/board'

import { WalletPreview } from '../cmps/WalletPreview'
import { Filter } from '../cmps/BoardFilter'

export function WalletIndex() {

    const boards = useSelector(storeState => storeState.boardModule.boards)

    // useEffect(() => {
    //     loadBoards(filterBy)
    // }, [filterBy])

    return (
        <main className="index">
            <header>
                <h2>My Wallet</h2>
            </header>
            <WalletPreview
                boards={boards} />
        </main>
    )
}