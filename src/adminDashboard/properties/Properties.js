import React, { useState, useEffect } from 'react'
import { API_URL } from '../../constants'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import './Properties.css'
import PropertyCard from './PropertyCard'
import CircularProgress from '@material-ui/core/CircularProgress'
import CurrentlyViewedProperty from './CurrentlyViewedProperty'
import {
    getAllProperties,
    getPropertyLocations,
    getPropertyLcus,
    getAllLocationSmartOutlets,
} from './../dashboardService'

const Properties = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [propertyOpened, setPropertyOpened] = useState(false)
    const [openedPropertyData, setOpenedPropertyData] = useState([])
    const [openedPropertyLcus, setOpenedPropertyLcus] = useState([])
    const [openedPropertyLocations, setOpenedPropertyLocations] = useState([])
    const [
        openedPropertySmartOutlets,
        setOpenedPropertySmartOutlets,
    ] = useState([])
    const [allProperties, setAllProperties] = useState([])
    const [activeFilter, setActiveFilter] = useState()
    const [activeFilterFull, setActiveFilterFull] = useState()

    const history = useHistory()

    const getAllOfTheProperties = async () => {
        console.log('here getting all')
        await getAllProperties(props.token, setIsLoading, setAllProperties)
    }

    const getAllPropertiesByStatus = (status) => {
        setIsLoading(true)
        console.log('token', props.token)
        if (props.token) {
            fetch(API_URL + 'properties', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoading(false)
                        setAllProperties(
                            result.properties.filter(
                                (property) => property.status === status
                            )
                        )
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const getLcus = (token, id, setOpenedPropertyLcus) => {
        getPropertyLcus(token, id, setOpenedPropertyLcus)
    }

    const getLocations = (token, id, setOpenedPropertyLocations) => {
        getPropertyLocations(token, id, setOpenedPropertyLocations)
    }

    const getPropertyInfo = (id) => {
        setIsLoading(true)
        if (props.token) {
            fetch(API_URL + 'properties/' + id, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoading(false)
                        console.log('here new stuff on paste', result)
                        setOpenedPropertyData(result)
                        getLcus(props.token, id, setOpenedPropertyLcus)
                        getLocations(
                            props.token,
                            id,
                            setOpenedPropertyLocations
                        )
                        setPropertyOpened(true)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const openPropertyDetails = (property, lcus, locations, smartOutlets) => {
        console.log('here opening propertyDetails')
        history.push('/property/' + property.propertyUUID)
        setOpenedPropertyData(property)
        setOpenedPropertyLcus(lcus)
        setOpenedPropertyLocations(locations)
        console.log('here are the smart outlets', smartOutlets)
        setOpenedPropertySmartOutlets(smartOutlets)
        console.log('here property data SINGLE', property)
        setPropertyOpened(true)
    }

    const openPropertyDetailsOnLoad = (propertyId) => {
        console.log('here opening ON LOAD')
        history.push('/property/' + propertyId)
        getPropertyInfo(propertyId)
    }

    const closeOpenedProperty = () => {
        history.push('/dashboard/properties')
        getAllOfTheProperties()
        setActiveFilter('all')
        setActiveFilterFull('All')
        setOpenedPropertyData([])
        setPropertyOpened(false)
    }

    const filterOutPropertiesByStatus = (status) => {
        if (status === 'ready') {
            setActiveFilterFull(
                status[0].toUpperCase() + status.slice(1) + ' For Install'
            )
        } else if (status === 'in') {
            setActiveFilterFull(
                status[0].toUpperCase() + status.slice(1) + '-Install'
            )
        } else {
            setActiveFilterFull(status[0].toUpperCase() + status.slice(1))
        }
        setActiveFilter(status)
        if (status === 'all') {
            getAllProperties(props.token, setIsLoading, setAllProperties)
        } else if (status === 'installed') {
            getAllPropertiesByStatus('operational')
        } else {
            getAllPropertiesByStatus(status)
        }
    }

    useEffect(() => {
        document.querySelector('body').scrollTo(0, 0)
    }, [])

    useEffect(() => {
        console.log('here haha', props.viewThisProperty)
        if (props.viewThisProperty !== null) {
            openPropertyDetailsOnLoad(props.viewThisProperty)
        } else {
            history.push('/dashboard/properties')
            getAllOfTheProperties()
            setActiveFilter('all')
            setActiveFilterFull('All')
        }
    }, [props.viewThisProperty, props.token])

    useEffect(() => {
        console.log('here haha', openedPropertyLocations)
        if (openedPropertyLocations?.length > 0) {
            openedPropertyLocations.forEach((location) => {
                getAllLocationSmartOutlets(
                    props.token,
                    location.locationUUID,
                    setOpenedPropertySmartOutlets
                )
            })
        } else {
            console.log('here it is null')
        }
    }, [openedPropertyLocations])

    return (
        <React.Fragment>
            {!isLoading && !propertyOpened && (
                <div className="propertiesMainBody">
                    <div className="tabHeader">My Properties</div>
                    <div className="top-button-group">
                        <Button
                            className={
                                activeFilter === 'all'
                                    ? 'topButtonProperties'
                                    : 'topButtonPropertiesNotActive'
                            }
                            variant="contained"
                            onClick={(e) => filterOutPropertiesByStatus('all')}
                        >
                            All
                        </Button>
                        <Button
                            className={
                                activeFilter === 'new'
                                    ? 'topButtonProperties'
                                    : 'topButtonPropertiesNotActive'
                            }
                            variant="contained"
                            onClick={(e) => filterOutPropertiesByStatus('new')}
                        >
                            New
                        </Button>
                        <Button
                            className={
                                activeFilter === 'pending'
                                    ? 'topButtonProperties'
                                    : 'topButtonPropertiesNotActive'
                            }
                            variant="contained"
                            onClick={(e) =>
                                filterOutPropertiesByStatus('pending')
                            }
                        >
                            Pending
                        </Button>
                        <Button
                            className={
                                activeFilter === 'ready'
                                    ? 'topButtonProperties'
                                    : 'topButtonPropertiesNotActive'
                            }
                            variant="contained"
                            onClick={(e) =>
                                filterOutPropertiesByStatus('ready')
                            }
                        >
                            Ready For Install
                        </Button>
                        <Button
                            className={
                                activeFilter === 'in'
                                    ? 'topButtonProperties'
                                    : 'topButtonPropertiesNotActive'
                            }
                            variant="contained"
                            onClick={(e) => filterOutPropertiesByStatus('in')}
                        >
                            In-Install
                        </Button>
                        <Button
                            className={
                                activeFilter === 'installed'
                                    ? 'topButtonProperties'
                                    : 'topButtonPropertiesNotActive'
                            }
                            variant="contained"
                            onClick={(e) =>
                                filterOutPropertiesByStatus('installed')
                            }
                        >
                            Installed
                        </Button>
                        <Button
                            className={
                                activeFilter === 'inspected'
                                    ? 'topButtonProperties'
                                    : 'topButtonPropertiesNotActive'
                            }
                            variant="contained"
                            onClick={(e) =>
                                filterOutPropertiesByStatus('inspected')
                            }
                        >
                            Inspected
                        </Button>
                        <Button
                            className={
                                activeFilter === 'paused'
                                    ? 'topButtonProperties'
                                    : 'topButtonPropertiesNotActive'
                            }
                            variant="contained"
                            onClick={(e) =>
                                filterOutPropertiesByStatus('paused')
                            }
                        >
                            Paused
                        </Button>
                        <Button
                            className={
                                activeFilter === 'deactivated'
                                    ? 'topButtonProperties'
                                    : 'topButtonPropertiesNotActive'
                            }
                            variant="contained"
                            onClick={(e) =>
                                filterOutPropertiesByStatus('deactivated')
                            }
                        >
                            Deactivated
                        </Button>
                    </div>
                    <hr className="propertiesHr" />
                    <Grid
                        container
                        className="allPropertiesContainer"
                        xs={12}
                        spacing={2}
                    >
                        {allProperties?.map((property, index) => (
                            <Grid item lg={3} md={6} xs={12} key={index}>
                                <PropertyCard
                                    property={property}
                                    token={props.token}
                                    openPropertyDetails={openPropertyDetails}
                                />
                            </Grid>
                        ))}
                        {allProperties?.length === 0 && (
                            <div className="noPropertiesWithThisStatus">
                                No properties with a status of
                                <strong> {activeFilterFull}</strong>
                            </div>
                        )}
                    </Grid>
                </div>
            )}
            {!isLoading && propertyOpened && openedPropertyData && (
                <CurrentlyViewedProperty
                    property={openedPropertyData}
                    lcus={openedPropertyLcus}
                    locations={openedPropertyLocations}
                    smartOutlets={openedPropertySmartOutlets}
                    closeOpenedProperty={closeOpenedProperty}
                    openPropertyDetailsOnLoad={openPropertyDetailsOnLoad}
                    token={props.token}
                />
            )}
            {isLoading && (
                <div className="propertiesLoader">
                    <CircularProgress style={{ color: '#12BFA2' }} />
                </div>
            )}
        </React.Fragment>
    )
}

export default Properties
