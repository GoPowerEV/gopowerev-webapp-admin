import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import './../../adminDashboard/dashboardTab/DashboardTab.css'
import { makeStyles } from '@material-ui/core/styles'
import './LocationCard.css'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        borderRadius: '15px',
        height: '100%',
        paddingTop: '25px',
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
        display: 'inline-flex',
    },
    pos: {
        marginBottom: 12,
    },
})

const LocationCard = (props) => {
    const classes = useStyles()
    const locationInfo = props.location

    return (
        <React.Fragment>
            <div className={classes.cardHeader}>
                <LocationOnOutlinedIcon />
                {locationInfo.name}
            </div>
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Grid container xs={12} spacing={3}>
                        <Grid item xs={4}>
                            <img
                                alt="Property Img"
                                src={locationInfo.pictureUrl1}
                                className="viewedPropertyMainImage"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Grid
                                container
                                xs={12}
                                className="locationDetailsContainer"
                            >
                                <Grid
                                    item
                                    xs={7}
                                    className="locationDetails nameMargin"
                                >
                                    <div className="lcuDetailsHeader">
                                        Location Name
                                    </div>
                                    <div className="lcuDetailsText">
                                        {locationInfo.name}
                                    </div>
                                </Grid>
                                <Grid item xs={4} className="locationDetails">
                                    <div className="lcuDetailsHeader">
                                        Max Volt-Amps
                                    </div>
                                    <div className="lcuDetailsText">10,000</div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default LocationCard
