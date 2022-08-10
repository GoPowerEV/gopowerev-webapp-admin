import { API_URL_ADMIN } from './../../constants'

export function getConsumerChargingHistory(
    userId,
    token,
    setIsLoading,
    setChargingSessions,
    setBillingData,
    setSnapshotData
) {
    setIsLoading(true)
    fetch(API_URL_ADMIN + 'admin/customer/' + userId, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then(
            (result) => {
                setIsLoading(false)
                console.log('here is the charging data', result)
                setChargingSessions(result?.chargingSessions)
                setBillingData(result?.billing)
                setSnapshotData(result?.snapShot)
            },
            (error) => {}
        )
}
