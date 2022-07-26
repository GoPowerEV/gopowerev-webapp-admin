import { API_URL_ADMIN } from '../../../constants'

export const getPlanInfo = (token, propertyUUID, setIsLoading, setPlanInfo) => {
    if (token && propertyUUID) {
        setIsLoading(true)
        fetch(
            API_URL_ADMIN +
                'admin/property-power-plans?propertyUUID=' +
                propertyUUID,
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json',
                },
            }
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoading(false)
                    setPlanInfo(result)
                },
                (error) => {
                    console.log('HERE ERROR')
                    setIsLoading(false)
                }
            )
    }
}

export const savePlanInfo = (token, setIsLoading, data, toggleInfo) => {
    if (token) {
        setIsLoading(true)
        fetch(API_URL_ADMIN + 'admin/property-power-plans', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoading(false)
                    toggleInfo()
                },
                (error) => {
                    setIsLoading(false)
                }
            )
    }
}

export const updatePlanInfo = (
    token,
    setIsLoading,
    data,
    toggleInfo,
    propertyPowerPlanUUID
) => {
    if (token) {
        setIsLoading(true)
        fetch(
            API_URL_ADMIN +
                'admin/property-power-plans/' +
                propertyPowerPlanUUID,
            {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoading(false)
                    toggleInfo()
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
                    if (result?.length > 0) {
                        let options = []
                        result?.forEach((item) => {
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
                    if (result?.length > 0) {
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
                    }
                },
                (error) => {
                    setIsLoading(false)
                }
            )
    }
}
