import { MoneyTransfers } from "./MoneyTransfers"
import { WalletDetails } from "./WalletDetails"
import walletBgImage from '../../src/assets/styles/imgs/wallet-index/image.png';

export function WalletPreview({ wallet }) {

    const member = wallet.members

    // console.log(wallet);


    return (
        <section className="wallet-preview ">
            <div className="wallet-balance-container" >
                <h3>{wallet.title}</h3>
                <h4>Hello {member[0].name}</h4>{/* by login user */}

                <div className="wallet-balance-bg">
                    <img className="wallet-bg-img"
                        src={walletBgImage} alt="Wallet" />
                    <div className="wallet-balance">
                        <h3 >יתרה כוללת</h3 >
                        <h2><span>{wallet.currency}</span>{wallet.balance}  </h2>
                    </div>
                </div>
            </div>
            {/* <p>{wallet.description} or dashboard</p> */}
            <hr className="bottom-line" />
            <WalletDetails
                wallet={wallet}
            />

            <MoneyTransfers
                wallet={wallet} />

        </section>
    )
}