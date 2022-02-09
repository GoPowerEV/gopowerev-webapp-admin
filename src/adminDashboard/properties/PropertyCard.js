import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import './Properties.css'
import { makeStyles } from '@material-ui/core/styles'
import { getPropertyBadgeClass } from './utils/PropertyUtils'
import NoImageAvailable from './../../assets/img/noImageAvailable.png'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
    getPropertyLcus,
    getPropertyLocations,
    getPropertySmartOutletsByPropertyId,
} from './../dashboardService'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        borderRadius: '15px',
        height: '100%',
        cursor: 'pointer',
        '&:hover': {
            background: '#9e9e9e38',
        },
        '@media (max-width: 1600px)': {
            minWidth: 220,
        },
    },
    content: {
        marginTop: '-10px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    propertyCardHeader: {
        fontSize: 19,
        fontWeight: '600',
        marginBottom: '15px',
    },
    pos: {
        marginBottom: 12,
    },
})

const PropertyCard = (props) => {
    const [lcusOfThisProperty, setLcusOfThisProperty] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [locationsOfThisProperty, setLocationsOfThisProperty] = useState([])
    const [
        smartOutletsOfThisProperty,
        setSmartOutletsOfThisProperty,
    ] = useState([])
    const classes = useStyles()
    const propertyInfo = props.property

    const getLocations = () => {
        if (props.token) {
            getPropertyLocations(
                props.token,
                props.property.propertyUUID,
                setLocationsOfThisProperty,
                setIsLoading
            )

            if (locationsOfThisProperty?.length > 0) {
                locationsOfThisProperty.forEach((location) => {
                    getSmartOutlets(location.locationUUID)
                })
            } else {
                setSmartOutletsOfThisProperty([])
            }
        }
    }

    const getLcus = () => {
        if (props.token) {
            getPropertyLcus(
                props.token,
                props.property.propertyUUID,
                setLcusOfThisProperty,
                setIsLoading
            )
        }
    }

    const getSmartOutlets = () => {
        if (props.token) {
            getPropertySmartOutletsByPropertyId(
                props.token,
                props.property.propertyUUID,
                setSmartOutletsOfThisProperty,
                setIsLoading
            )
        }
    }

    useEffect(() => {
        if (locationsOfThisProperty?.length > 0) {
            getSmartOutlets()
        }
    }, [locationsOfThisProperty])

    const openThisProperty = () => {
        setIsLoading(true)
        getLcus()
        getLocations()
        props.openPropertyDetails(
            propertyInfo,
            lcusOfThisProperty,
            locationsOfThisProperty,
            smartOutletsOfThisProperty
        )
    }

    return (
        <React.Fragment>
            <Card className={classes.root} onClick={() => openThisProperty()}>
                {isLoading && (
                    <div className="propertyCountLoader">
                        <CircularProgress style={{ color: '#12BFA2' }} />
                    </div>
                )}
                {!isLoading && (
                    <React.Fragment>
                        <img
                            alt="Property Img"
                            src={
                                propertyInfo.pictureUrl1
                                    ? propertyInfo.pictureUrl1
                                    : NoImageAvailable
                            }
                            className="propertyImage"
                        />
                        <CardContent className={classes.content}>
                            <Typography className={classes.propertyCardHeader}>
                                {propertyInfo.name}
                            </Typography>
                            <div
                                className={getPropertyBadgeClass(
                                    propertyInfo.status
                                )}
                            >
                                {propertyInfo.status.charAt(0).toUpperCase() +
                                    propertyInfo.status.slice(1)}
                            </div>
                        </CardContent>
                    </React.Fragment>
                )}
            </Card>
        </React.Fragment>
    )
}

export default PropertyCard
