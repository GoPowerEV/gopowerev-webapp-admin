import React from 'react'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import './Properties.css'
import { makeStyles } from '@material-ui/core/styles'
import EvStationOutlinedIcon from '@material-ui/icons/EvStationOutlined'
import WifiOutlinedIcon from '@material-ui/icons/WifiOutlined'
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined'
import { getBadgeClass } from './utils/PropertyUtils'

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
    const classes = useStyles()
    const propertyInfo = props.property

    return (
        <React.Fragment>
            <Card
                className={classes.root}
                onClick={() => props.openPropertyDetails(propertyInfo)}
            >
                <img
                    alt="Property Img"
                    src={propertyInfo.pictureUrl1}
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
                                {propertyInfo.amountOfLcus} LCUs
                            </span>
                        </div>
                    </div>
                    <div className="grey badge">
                        <div className="badgeBox">
                            <WifiOutlinedIcon />
                            <span className="badgeText">
                                {propertyInfo.smartOutletsAmount} Smart Outlets
                            </span>
                        </div>
                    </div>
                    <div className="grey badge">
                        <div className="badgeBox">
                            <FlashOnOutlinedIcon />
                            <span className="badgeText">
                                {propertyInfo.maxAmps}k Max Volt-Amps
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default PropertyCard
