import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import './Properties.css'
import { makeStyles } from '@material-ui/core/styles'
import EvStationOutlinedIcon from '@material-ui/icons/EvStationOutlined'
import WifiOutlinedIcon from '@material-ui/icons/WifiOutlined'
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined'
import { getBadgeClass } from './utils/PropertyUtils'
import NoImageAvailable from './../../assets/img/noImageAvailable.png'
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
                setLocationsOfThisProperty
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
                setLcusOfThisProperty
            )
        }
    }

    const getSmartOutlets = () => {
        if (props.token) {
            getPropertySmartOutletsByPropertyId(
                props.token,
                props.property.propertyUUID,
                setSmartOutletsOfThisProperty
            )
        }
    }

    useEffect(() => {
        getLcus()
        getLocations()
    }, [])

    useEffect(() => {
        if (locationsOfThisProperty.length > 0) {
            getSmartOutlets()
        }
    }, [locationsOfThisProperty])

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
                    <Typography className={classes.propertyCardHeader}>
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
                                {lcusOfThisProperty
                                    ? lcusOfThisProperty.length
                                    : '0'}{' '}
                                LCUs
                            </span>
                        </div>
                    </div>
                    <div className="grey badge">
                        <div className="badgeBox">
                            <WifiOutlinedIcon />
                            <span className="badgeText">
                                {smartOutletsOfThisProperty?.length} Smart
                                Outlet(s)
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
