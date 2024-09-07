import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { WalletPreview } from '../cmps/WalletPreview'
import { loadWallet, updateWallet } from '../store/actions/wallet.actions'

export function WalletIndex() {
    const wallet = useSelector(storeState => storeState.walletModule.wallet)
    const walletId = "66cf34eef6cff0ce09cfd168"  //wallet have more then 1 users
    const [theme, setTheme] = useState('light') // needs to save to backend !

    useEffect(() => {
        loadWallet(walletId)
    }, [])

    useEffect(() => {
        if (wallet && wallet.style) {
            const mode = wallet.style.mode || 'light'  // Default to 'light' if mode is null
            setTheme(mode)
            document.body.setAttribute('data-theme', mode)
        }
    }, [wallet])

    async function switchTheme(e) {
        const newTheme = e.target.checked ? 'dark' : 'light'
        
        if (wallet) {
            const updatedWallet = {
                ...wallet,
                style: {
                    ...(wallet.style || {}),  // Use an empty object if wallet.style is null
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
    
    if (!wallet) return <div>Loading wallet...</div>  // Show a loading state
    
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