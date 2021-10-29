import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import './Properties.css'
import { API_URL } from './../../../constants'
import { makeStyles } from '@material-ui/core/styles'
import EvStationOutlinedIcon from '@material-ui/icons/EvStationOutlined'
import WifiOutlinedIcon from '@material-ui/icons/WifiOutlined'
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined'
import { getBadgeClass } from './utils/PropertyUtils'
import NoImageAvailable from './../../../assets/images/noImageAvailable.png'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        borderRadius: '15px',
        height: '100%',
        cursor: 'pointer',
        '&:hover': {
            background: '#9e9e9e38',
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
    cardHeader: {
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
    const [locationsOfThisProperty, setLocationsOfThisProperty] = useState([])
    const [
        smartOutletsOfThisProperty,
        setSmartOutletsOfThisProperty,
    ] = useState([])
    const classes = useStyles()
    const propertyInfo = props.property

    const getLocationSmartOutlets = (locationId) => {
        if (props.token) {
            fetch(API_URL + 'smart-outlets?soUUID=' + locationId, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        console.log(
                            'all smart outlets for this location',
                            result.smartOutlets
                        )
                        setSmartOutletsOfThisProperty(result.smartOutlets)
                    },
                    (error) => {}
                )
        }
    }

    const getPropertyLocations = () => {
        if (props.token) {
            fetch(
                API_URL +
                    'locations?propertyUUID=' +
                    props.property.propertyUUID,
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + props.token,
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then((res) => res.json())
                .then(
                    (result) => {
                        console.log(
                            'all locations for this property',
                            result.locations
                        )
                        setLocationsOfThisProperty(result.locations)
                        if (result.locations.length > 0) {
                            result.locations.forEach((location) => {
                                getLocationSmartOutlets(location.locationUUID)
                            })
                            getLocationSmartOutlets()
                        } else {
                            setSmartOutletsOfThisProperty([])
                        }
                    },
                    (error) => {}
                )
        }
    }

    const getPropertyLcus = () => {
        if (props.token) {
            fetch(
                API_URL + 'lcus?propertyUUID=' + props.property.propertyUUID,
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + props.token,
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then((res) => res.json())
                .then(
                    (result) => {
                        console.log('all lcus for this property', result.lcus)
                        setLcusOfThisProperty(result.lcus)
                    },
                    (error) => {}
                )
        }
    }

    useEffect(() => {
        getPropertyLcus()
        getPropertyLocations()
    }, [])

    return (
        <React.Fragment>
            <Card
                className={classes.root}
                onClick={() =>
                    props.openPropertyDetails(
                        propertyInfo,
                        lcusOfThisProperty,
                        locationsOfThisProperty,
                        smartOutletsOfThisProperty
                    )
                }
            >
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
                    <Typography className={classes.cardHeader}>
                        {propertyInfo.name}
                    </Typography>
                    <div className={getBadgeClass(propertyInfo.status)}>
                        {propertyInfo.status.charAt(0).toUpperCase() +
                            propertyInfo.status.slice(1)}
                    </div>
                    <div className="grey badge">
                        <div className="badgeBox">
                            <EvStationOutlinedIcon />
                            <span className="badgeText">
                                {lcusOfThisProperty.length} LCUs
                            </span>
                        </div>
                    </div>
                    <div className="grey badge">
                        <div className="badgeBox">
                            <WifiOutlinedIcon />
                            <span className="badgeText">
                                {smartOutletsOfThisProperty.length} Smart
                                Outlets
                            </span>
                        </div>
                    </div>
                    <div className="grey badge">
                        <div className="badgeBox">
                            <FlashOnOutlinedIcon />
                            <span className="badgeText">
                                {propertyInfo.maxVoltAmps / 1000}k Max Volt-Amps
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default PropertyCard
