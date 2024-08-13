import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp, faXmark } from "@fortawesome/free-solid-svg-icons"
import { updateWallet } from '../store/actions/wallet.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

export function WalletAction({ wallet, type, onClose }) {
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')

    // console.log(wallet)

    async function onChangeBalance() {
        if (!amount) {
            showErrorMsg('Please enter an amount')
            return
        }

        const newActivity = {
            id: `activity-${Date.now()}`,
            type: type,
            amount: type === 'pay' ? -Number(amount) : Number(amount),
            date: new Date(),
            description: description,
            memberId: wallet.members[0].id // change it later to the curr user
        }

        const updatedWallet = {
            ...wallet,
            balance: wallet.balance + newActivity.amount,
            activities: [...wallet.activities, newActivity]
        }

        try {
            await updateWallet(updatedWallet)
            console.log(updatedWallet);

            onClose()
        } catch (error) {
            console.error('Failed to update wallet:', error)
            alert('Failed to update wallet. Please try again.')
        }
    }

    return (
        <>
            <div className="backdrop" onClick={onClose}></div>
            <section className="wallet-action-container">
                <div className="close-btn-wrapper" onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <h1>{type === 'pay' ? 'Payment' : 'Income'}</h1>
                <input
                    type="number"
                    placeholder="How much..."
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Add a description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={onChangeBalance}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                </button>
            </section>
        </>
    )
}