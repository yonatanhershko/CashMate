import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { WalletPreview } from '../cmps/WalletPreview'
import { loadWallet, updateWallet } from '../store/actions/wallet.actions'

export function WalletIndex() {
    const wallet = useSelector(storeState => storeState.walletModule.wallet)
    const walletId = 'ZxTAol' // By user.wallet._id
    const [theme, setTheme] = useState('')

    useEffect(() => {
        loadWallet(walletId)
    }, [])

    useEffect(() => {
        if (wallet) {
            setTheme(wallet.style.mode)
            document.body.setAttribute('data-theme', wallet.style.mode)
        }
    }, [wallet])

    async function switchTheme(e) {
        const newTheme = e.target.checked ? 'dark' : 'light'
        if (wallet) {
            const updatedWallet = {
                ...wallet,
                style: {
                    ...wallet.style,
                    mode: newTheme
                }
            }
            try {
                await updateWallet(updatedWallet)
                setTheme(newTheme)
                document.body.setAttribute('data-theme', newTheme)
                showSuccessMsg('Theme updated successfully')
            } catch (error) {
                console.error('Failed to update wallet theme:', error)
                showErrorMsg('Failed to update theme')
            }
        }
    }
    
    if (!wallet) return null
    // console.log(theme)

    return (
        <main className="index">
            <label className="switch">
                <input
                    type="checkbox"
                    onChange={switchTheme}
                    checked={theme === 'dark'}
                />
                <span className="slider round"></span>
            </label>
            <header>
            </header>
            <WalletPreview wallet={wallet} />
        </main>
    )
}