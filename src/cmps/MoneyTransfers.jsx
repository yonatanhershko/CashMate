import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { WalletAction } from "./WalletAction"
import { useState } from 'react'

export function MoneyTransfers() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [actionType, setActionType] = useState(null)

    function openModal(type) {
        setActionType(type)
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
        setActionType(null)
    }

    return (
        <>
            <section className="money-transfers-container">
                <div className="transfers-pay" onClick={() => openModal('pay')}>
                    <span className="transfers-btn" >
                        <FontAwesomeIcon icon={faMinus} />
                    </span>
                </div>
                <div className="transfers-income" onClick={() => openModal('income')}>
                    <span className="transfers-btn" >
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                </div>
            </section>
            {isModalOpen && (
                <WalletAction type={actionType} onClose={closeModal} />
            )}
        </>
    )
}

{/* <input
    className="money-transfers-text"
    type="number" />
<div className="transfers-action">
    ⬅️
</div> */}