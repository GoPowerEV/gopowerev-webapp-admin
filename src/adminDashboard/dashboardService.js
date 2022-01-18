import { API_URL, API_URL_ADMIN } from './../constants'

export function getAllProperties(token, setIsLoading, setAllProperties) {
    console.log('here token', token)
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
                console.log('here all lcus for this property', result.lcus)
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
                console.log(
                    'here all locations for this property',
                    result.locations
                )
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
    setSmartOutletsOfThisProperty
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
                console.log(
                    'here all smart outlets for this location',
                    result.smartOutlets
                )
                setSmartOutletsOfThisProperty(result.smartOutlets)
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
                console.log(
                    'here all smart outlets for this property',
                    result.smartOutlets
                )
                setSmartOutletsOfThisProperty(result.smartOutlets)
                setIsLoading(false)
            },
            (error) => {
                setIsLoading(false)
            }
        )
}

export function getAllInstallers(token, setIsLoading, setAllInstallers) {
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
                console.log('here all installers', result)
                setAllInstallers(result)
            },
            (error) => {}
        )
}
