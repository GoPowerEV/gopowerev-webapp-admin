import React, { useState, useEffect } from 'react'
import { API_URL } from './../../../constants'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import './Properties.css'
import PropertyCard from './PropertyCard'
import CircularProgress from '@material-ui/core/CircularProgress'
import CurrentlyViewedProperty from './CurrenlyViewedProperty'

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

    const getAllProperties = () => {
        setActiveFilterFull('All')
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
                        console.log('all properties', result.properties)
                        setAllProperties(result.properties)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
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

    const openPropertyDetails = (property, lcus, locations, smartOutlets) => {
        setOpenedPropertyData(property)
        setOpenedPropertyLcus(lcus)
        setOpenedPropertyLocations(locations)
        setOpenedPropertySmartOutlets(smartOutlets)
        console.log('property data', property)
        setPropertyOpened(true)
    }

    const closeOpenedProperty = () => {
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
            getAllProperties()
        } else {
            getAllPropertiesByStatus(status)
        }
    }

    useEffect(() => {
        getAllProperties()
        setActiveFilter('all')
        setActiveFilterFull('All')
    }, [])

    return (
        <React.Fragment>
            {!isLoading && !propertyOpened && (
                <div className="propertiesMainBody">
                    <div className="tabHeader">My Properties</div>
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
                        onClick={(e) => filterOutPropertiesByStatus('pending')}
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
                        onClick={(e) => filterOutPropertiesByStatus('ready')}
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
                        onClick={(e) => filterOutPropertiesByStatus('paused')}
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
                    <hr className="propertiesHr" />
                    <Grid
                        container
                        className="allPropertiesContainer"
                        xs={12}
                        spacing={2}
                    >
                        {allProperties?.map((property, index) => (
                            <Grid item xs={3} key={index}>
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
                    token={props.token}
                />
            )}
            {isLoading && (
                <div>
                    <CircularProgress />
                </div>
            )}
        </React.Fragment>
    )
}

export default Properties
