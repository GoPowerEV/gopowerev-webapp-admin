import { API_URL, API_URL_ADMIN } from './../constants'

export function getAllCustomers(token, setIsLoading, setAllConsumers) {
    setIsLoading(true)
    fetch(API_URL_ADMIN + 'admin/customers', {
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
                setAllConsumers(result)
            },
            (error) => {}
        )
}

export function getAllInstallers(token, setIsLoading, setAllUInstallers) {
    setIsLoading(true)
    fetch(API_URL_ADMIN + 'admin/users?role=INSTALLER', {
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
                setAllUInstallers(result)
            },
            (error) => {}
        )
}

export function getAllProperties(token, setIsLoading, setAllProperties) {
    setIsLoading(true)
    fetch(API_URL + 'properties', {
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
                let sortedProperties = result.properties
                if (sortedProperties) {
                    sortedProperties.sort(function (a, b) {
                        var textA = a.name.toUpperCase()
                        var textB = b.name.toUpperCase()
                        return textA < textB ? -1 : textA > textB ? 1 : 0
                    })
                }
                setAllProperties(sortedProperties)
            },
            (error) => {}
        )
}

export function getPropertyLcus(
    token,
    id,
    setLcusOfThisProperty,
    setIsLoading
) {
    setIsLoading(true)
    fetch(API_URL + 'lcus?propertyUUID=' + id, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then(
            (result) => {
                setLcusOfThisProperty(result.lcus)
                setIsLoading(false)
            },
            (error) => {
                setIsLoading(false)
            }
        )
}

export function getPropertyLocations(
    token,
    id,
    setLocationsOfThisProperty,
    setIsLoading
) {
    setIsLoading(true)
    fetch(API_URL + 'locations?propertyUUID=' + id, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then(
            (result) => {
                setLocationsOfThisProperty(result.locations)
                setIsLoading(false)
            },
            (error) => {
                setIsLoading(false)
            }
        )
}

export function getAllLocationSmartOutlets(
    token,
    id,
    setSmartOutletsOfThisProperty
) {
    fetch(API_URL + 'smart-outlets?soUUID=' + id, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then(
            (result) => {
                setSmartOutletsOfThisProperty(result.smartOutlets)
            },
            (error) => {}
        )
}

export function getLocationSmartOutletsById(
    token,
    id,
    setSmartOutletsOfThisProperty,
    setReadiBases
) {
    fetch(API_URL + 'smart-outlets?locationUUID=' + id, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then(
            (result) => {
                if (!setReadiBases) {
                    setSmartOutletsOfThisProperty(result.smartOutlets)
                } else {
                    let outlets = result.smartOutlets.filter(
                        (so) => so.installationState !== 'ready'
                    )
                    setSmartOutletsOfThisProperty(outlets)
                    let bases = result.smartOutlets.filter(
                        (so) => so.installationState === 'ready'
                    )
                    setReadiBases(bases)
                }
            },
            (error) => {}
        )
}

export function getPropertySmartOutletsByPropertyId(
    token,
    id,
    setSmartOutletsOfThisProperty,
    setIsLoading
) {
    setIsLoading(true)
    fetch(API_URL + 'smart-outlets?propertyUUID=' + id, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then(
            (result) => {
                setSmartOutletsOfThisProperty(result.smartOutlets)
                setIsLoading(false)
            },
            (error) => {
                setIsLoading(false)
            }
        )
}
