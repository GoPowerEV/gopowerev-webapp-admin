import React from 'react'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import './DashboardTab.css'
import { makeStyles } from '@material-ui/core/styles'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import { getDashboardBadgeClass } from '../properties/utils/PropertyUtils'

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

const PropertyCardInInstall = (props) => {
    const classes = useStyles()
    const propertyInfo = props.property

    return (
        <React.Fragment>
            <Card
                className={classes.root}
                // onClick={() => props.openPropertyDetails(propertyInfo)}
            >
                <div className="image-container-dash">
                    <img
                        alt="Property Img"
                        src={propertyInfo.pictureUrl1}
                        className="propertyImage"
                    />
                    <div
                        className={getDashboardBadgeClass(propertyInfo.status)}
                    >
                        {propertyInfo.status.charAt(0).toUpperCase() +
                            propertyInfo.status.slice(1)}
                    </div>
                </div>
                <CardContent className={classes.content}>
                    <Typography className={classes.cardHeader}>
                        {propertyInfo.name}
                    </Typography>
                    <div className="grey badge">
                        <div className="badgeBox">
                            <SettingsOutlinedIcon />
                            <span className="badgeText">Inspect</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default PropertyCardInInstall
