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
    getPropertySmartOutletsByPropertyId,
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
        await getAllProperties(props.token, setIsLoading, setAllProperties)
    }

    const getAllPropertiesByStatus = (status) => {
        setIsLoading(true)
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
                        let sortedProperties = result.properties
                        if (sortedProperties) {
                            sortedProperties.sort(function (a, b) {
                                var textA = a.name.toUpperCase()
                                var textB = b.name.toUpperCase()
                                return textA < textB
                                    ? -1
                                    : textA > textB
                                    ? 1
                                    : 0
                            })
                        }
                        setAllProperties(
                            sortedProperties?.filter(
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
        getPropertyLcus(token, id, setOpenedPropertyLcus, setIsLoading)
    }

    const getLocations = (token, id, setOpenedPropertyLocations) => {
        getPropertyLocations(
            token,
            id,
            setOpenedPropertyLocations,
            setIsLoading
        )
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
        history.push('/property/' + property.propertyUUID)
        setOpenedPropertyData(property)
        setOpenedPropertyLcus(lcus)
        setOpenedPropertyLocations(locations)
        setOpenedPropertySmartOutlets(smartOutlets)
        setPropertyOpened(true)
    }

    const openPropertyDetailsOnLoad = (propertyId) => {
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

    const reloadPropertyInfo = (propertyId) => {
        getPropertyInfo(propertyId)
    }

    const filterOutPropertiesByStatus = (status) => {
        if (status === 'ready') {
            history.push('/dashboard/properties/ready')
            setActiveFilterFull(
                status[0].toUpperCase() + status.slice(1) + ' For Install'
            )
        } else if (status === 'in') {
            history.push('/dashboard/properties/in')
            setActiveFilterFull(
                status[0].toUpperCase() + status.slice(1) + '-Install'
            )
        } else {
            setActiveFilterFull(status[0].toUpperCase() + status.slice(1))
        }
        setActiveFilter(status)
        if (status === 'all') {
            history.push('/dashboard/properties')
            getAllProperties(props.token, setIsLoading, setAllProperties)
        } else {
            history.push('/dashboard/properties/' + status)
            getAllPropertiesByStatus(status)
        }
    }

    useEffect(() => {
        document.querySelector('body').scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (props.filterPropertiesBy) {
            filterOutPropertiesByStatus(props.filterPropertiesBy)
        }
        document.querySelector('body').scrollTo(0, 0)
    }, [props.filterPropertiesBy])

    useEffect(() => {
        if (props.viewThisProperty !== null) {
            openPropertyDetailsOnLoad(props.viewThisProperty)
        } else {
            if (!props.filterPropertiesBy) {
                history.push('/dashboard/properties')
                getAllOfTheProperties()
                setActiveFilter('all')
                setActiveFilterFull('All')
            }
        }
    }, [props.viewThisProperty, props.token])

    useEffect(() => {
        if (openedPropertyLocations?.length > 0) {
            openedPropertyLocations.forEach((location) => {
                getPropertySmartOutletsByPropertyId(
                    props.token,
                    props.viewThisProperty,
                    setOpenedPropertySmartOutlets,
                    setIsLoading
                )
            })
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
                                activeFilter === 'operational'
                                    ? 'topButtonProperties'
                                    : 'topButtonPropertiesNotActive'
                            }
                            variant="contained"
                            onClick={(e) =>
                                filterOutPropertiesByStatus('operational')
                            }
                        >
                            Operational
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
                    closeOpenedProperty={closeOpenedProperty}
                    openPropertyDetailsOnLoad={openPropertyDetailsOnLoad}
                    reloadPropertyInfo={reloadPropertyInfo}
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
