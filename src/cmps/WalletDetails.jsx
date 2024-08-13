
import React from 'react'

export function WalletDetails({ wallet }) {
    const walletActivities = wallet.activities || []
    const members = wallet.members || []

    function generateRobohashUrl(id) {
        return `https://robohash.org/${id}?set=set1`
    }

    // Create a map of member IDs to member objects for easy lookup
    const memberMap = members.reduce((acc, member) => {
        acc[member.id] = member
        return acc
    }, {})

    // Sort all activities by date (earliest to latest)
    const sortedActivities = [...walletActivities].sort((a, b) => new Date(a.date) - new Date(b.date))

    return (
        <section className="wallet-details">
            {sortedActivities.length > 0 ? (
                sortedActivities.map((activity, index) => {
                    const member = memberMap[activity.memberId]
                    return (
                        <div key={index} className="activity-item">
                            <img
                                className="activity-member-img"
                                src={generateRobohashUrl(member.id)}
                                alt={`Member ${member.name}`}
                                title={member.name}
                            />
                            <div className="activity-content">
                                {/* <h4>{member.name}</h4> */}
                                <p>{activity.description}</p>
                                <span> <span>{activity.type}</span>{activity.amount}</span>
        
                                <span>{new Date(activity.date).toLocaleString()}</span>
                            </div>
                        </div>
                    )
                })
            ) : (
                <p>No activities available</p>
            )}
        </section>
    )
}