export function WalletPreview({ wallet }) {

    const member = wallet.members
    function generateRobohashUrl(id) {
        return `https://robohash.org/${id}?set=set1`
    }

    return (
        <section className="wallet-preview ">

            <img className="toy-img" src={generateRobohashUrl(member._id)} alt={member.name} style={{ width: '100px', height: '100px' }} />

            <h1>{wallet.title}</h1>
            <p>{wallet.description}</p>
            <div className="wallet-balance">
                <span>Balance: </span>
                <span>{wallet.balance} </span>
            </div>
        </section>
    )
}