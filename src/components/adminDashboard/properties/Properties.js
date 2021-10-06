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
    const [allProperties, setAllProperties] = useState([])

    const getAllProperties = () => {
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
                        setAllProperties(result.properties)
                        console.log(result)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const openPropertyDetails = (property) => {
        setOpenedPropertyData(property)
        console.log('property data', property)
        setPropertyOpened(true)
    }

    const closeOpenedProperty = () => {
        setOpenedPropertyData([])
        setPropertyOpened(false)
    }

    useEffect(() => {
        getAllProperties()
    }, [])

    return (
        <React.Fragment>
            {!isLoading && !propertyOpened && (
                <div className="propertiesMainBody">
                    <div className="tabHeader">My Properties</div>
                    <Button className="topButton" variant="contained">
                        All
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
                                    openPropertyDetails={openPropertyDetails}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
            {!isLoading && propertyOpened && openedPropertyData && (
                <CurrentlyViewedProperty
                    property={openedPropertyData}
                    closeOpenedProperty={closeOpenedProperty}
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
