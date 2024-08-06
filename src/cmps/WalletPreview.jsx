export function WalletPreview({ wallet }) {
    return (
        <section className="wallet-preview">
            <h1>{wallet.title}</h1>
            <p>{wallet.description}</p>
            <div className="wallet-balance">
                <span>Balance: </span>
                <span>{wallet.balance} </span>
            </div>
        </section>
    )
}