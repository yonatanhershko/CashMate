import React, { useEffect } from 'react'
import { updateWallet } from '../store/actions/wallet.actions'
const ACTIVITY_LIMIT = 30

export function WalletDetails({ wallet }) {
    const walletActivities = wallet.activities || []
    const members = wallet.members || []

    // Sort all activities by date (latest to earliest)
    const sortedActivities = [...walletActivities].sort((a, b) => new Date(b.date) - new Date(a.date))
    // Limit activities to the most recent 30
    const limitedActivities = sortedActivities.slice(0, ACTIVITY_LIMIT)
    const memberMap = members.reduce((acc, member) => {
        acc[member.id] = member
        return acc
    }, {})

    function generateRobohashUrl(id) {
        return `https://robohash.org/${id}?set=set1`
    }

    //Delete old activities
    async function deleteOldActivities() {
        if (sortedActivities.length > ACTIVITY_LIMIT) {
            const updatedWallet = {
                ...wallet,
                activities: limitedActivities
            }
            try {
                await updateWallet(updatedWallet)
                console.log('Old activities deleted successfully')
            } catch (error) {
                console.error('Failed to delete old activities:', error)
            }
        }
    }

    // Call deleteOldActivities when the component mounts or when activities change
    useEffect(() => {
        deleteOldActivities()
    }, [walletActivities])

    return (
        <section className="wallet-details">
            {limitedActivities.length > 0 ? (
                limitedActivities.map((activity, index) => {
                    const member = memberMap[activity.memberId]
                    return (
                        <div key={index} className="activity-item">
                            <div className='activity-img-info'>
                                <img
                                    className="activity-member-img"
                                    src={generateRobohashUrl(member.id)}
                                    alt={`Member ${member.name}`}
                                    title={member.name}
                                />
                                <div className='activity-img-text'>
                                    <p className='activity-description'>{activity.description}</p>
                                    <span>{new Date(activity.date).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="activity-outcome">
                                <span> {activity.amount}</span>
                                <span className='activity-type'>{activity.type}</span>
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