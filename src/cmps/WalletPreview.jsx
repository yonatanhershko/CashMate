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
                    <h1>{wallet.title}</h1>
                    <h2><span>{wallet.currency}</span>{wallet.balance}  </h2>
                </div>
            </div>
            <p>{wallet.description}</p>
            {/* <img className="user-img" src={generateRobohashUrl(member._id)} alt={member.name} style={{ width: '100px', height: '100px' }} /> */}

            <WalletDetails
                wallet={wallet}
            />

            <MoneyTransfers />

        </section>
    )
}