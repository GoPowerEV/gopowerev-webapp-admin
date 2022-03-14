import { API_URL_ADMIN } from '../../../constants'

export const getPlanInfo = (token, propertyUUID, setIsLoading) => {
    if (token && propertyUUID) {
        setIsLoading(true)
        fetch(API_URL_ADMIN + 'admin/property-power-plans/' + propertyUUID, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
            },
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoading(false)
                    console.log('here is ER result', result)
                },
                (error) => {
                    setIsLoading(false)
                }
            )
    }
}

export const savePlanInfo = (token, setIsLoading, data) => {
    if (token) {
        setIsLoading(true)
        fetch(API_URL_ADMIN + 'admin/property-power-plans', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
            },
            body: data,
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoading(false)
                    console.log('here is CREATE RESULT', result)
                },
                (error) => {
                    setIsLoading(false)
                }
            )
    }
}

export const getPlanOptions = (setIsLoading, token, setRatePlanOptions) => {
    if (token) {
        setIsLoading(true)
        fetch(API_URL_ADMIN + 'admin/electricity-rates', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
            },
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoading(false)
                    if (result) {
                        let options = []
                        result.forEach((item) => {
                            options.push({
                                label: item.plan,
                                value: item.electricityRatesUUID,
                            })
                        })
                        setRatePlanOptions(options)
                    }
                },
                (error) => {
                    setIsLoading(false)
                }
            )
    }
}

export const getMargins = (chargeType, setIsLoading, token, setOptions) => {
    if (token) {
        console.log('here token', token)
        setIsLoading(true)
        fetch(API_URL_ADMIN + 'admin/electricity-margins/' + chargeType, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
            },
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoading(false)
                    if (chargeType === 'L1') {
                        let options = []
                        result.forEach((item) => {
                            options.push({
                                label: item.plan,
                                value: item.electricityMarginsUUID,
                            })
                        })
                        setOptions(options)
                    } else {
                        let options = []
                        result.forEach((item) => {
                            options.push({
                                label: item.plan,
                                value: item.electricityMarginsUUID,
                            })
                        })
                        setOptions(options)
                    }
                },
                (error) => {
                    setIsLoading(false)
                }
            )
    }
}
