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
                console.log('here all properties', result.properties)
                setAllProperties(result.properties)
            },
            (error) => {}
        )
}

export function getPropertyLcus(token, id, setLcusOfThisProperty) {
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
            },
            (error) => {}
        )
}

export function getPropertyLocations(token, id, setLocationsOfThisProperty) {
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
            },
            (error) => {}
        )
}

export function getLocationSmartOutlets(
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
                console.log(
                    'here all smart outlets for this location',
                    result.smartOutlets
                )
                setSmartOutletsOfThisProperty(result.smartOutlets)
            },
            (error) => {}
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
