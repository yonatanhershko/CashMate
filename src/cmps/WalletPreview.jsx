import { MoneyTransfers } from "./MoneyTransfers"
import { WalletDetails } from "./WalletDetails"

export function WalletPreview({ wallet }) {

    const member = wallet.members
    
    // function generateRobohashUrl(id) {
    //     return `https://robohash.org/${id}?set=set1`
    // }
    // console.log(wallet)

    return (
        <section className="wallet-preview ">
            <div className="wallet-balance-container" >
                <div className="wallet-balance">
                    <h2><span>{wallet.currency}</span>{wallet.balance}  </h2>
                    <p>{wallet.title}</p>
                </div>
            </div>
            <p>{wallet.description} or dashboard</p>

            <WalletDetails
                wallet={wallet}
            />

            <MoneyTransfers />

        </section>
    )
}