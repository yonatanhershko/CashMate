import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { walletService } from '../services/wallet/index'
import { WalletPreview } from '../cmps/WalletPreview'
import { loadWallet } from '../store/actions/wallet.actions'

export function WalletIndex() {
    const wallet = useSelector(storeState => storeState.walletModule.wallet)
    const walletId = 'wLAyDR' // By user.wallet._id

        useEffect(() => {
            loadWallet(walletId)
        }, [])

    if (!wallet) return
    return (
        <main className="index">
            <header>
                <h2>My Wallet</h2>
            </header>
            <WalletPreview wallet={wallet} />
        </main>
    )
}