import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import './../../adminDashboard/dashboardTab/DashboardTab.css'
import { makeStyles } from '@material-ui/core/styles'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
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
                                spacing={3}
                                className="editLcuDetailsContainer"
                            >
                                <Grid
                                    item
                                    xs={7}
                                    className="lcuDetailsContainer"
                                >
                                    <Grid container>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item xs={7}>
                                                <div className="lcuDetailsHeader">
                                                    Location Name
                                                </div>
                                                <div className="lcuDetailsText">
                                                    {locationInfo.name}
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1}
                                                className="greyIconEdit"
                                            >
                                                <EditOutlinedIcon />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={4}
                                    className="lcuDetailsContainer"
                                >
                                    <Grid container>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item xs={10}>
                                                <div className="lcuDetailsHeader">
                                                    Max-Volt-Amps
                                                </div>
                                                <div className="lcuDetailsText">
                                                    10,000
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                className="greyIconEdit"
                                            >
                                                <EditOutlinedIcon />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                spacing={5}
                                className="editLcuDetailsContainer"
                            >
                                <Grid
                                    item
                                    xs={11}
                                    className="lcuDetailsContainer"
                                >
                                    <Grid container>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item xs={10}>
                                                <div className="lcuDetailsHeader">
                                                    Notes
                                                </div>
                                                <div className="lcuDetailsText">
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipiscing elit.
                                                    Cras vitae justo luctus,
                                                    sollicitudin velit in,
                                                    hendrerit augue. Sed non
                                                    sollicitudin quam. Vivamus
                                                    diam tellus, interdum
                                                    ultricies elementum congue,
                                                    lacinia et justo. Nam
                                                    gravida in ipsum et
                                                    vehicula. Curabitur in odio
                                                    ac orci pretium pharetra.
                                                    Aenean mollis urna a erat
                                                    hendrerit aliquam. Duis sit
                                                    amet sem tristique, cursus
                                                    erat a, bibendum lacus. Sed
                                                    iaculis diam lacus, nec
                                                    mollis enim porttitor non.
                                                    Nam consequat viverra lacus
                                                    et faucibus. Nunc ac tellus
                                                    ac sapien dapibus imperdiet.
                                                    Mauris in arcu mauris. Proin
                                                    sed nunc ipsum. Donec ex
                                                    erat, vulputate vel ex in,
                                                    pellentesque luctus mi.
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1}
                                                className="greyIconEdit"
                                            >
                                                <EditOutlinedIcon />
                                            </Grid>
                                        </Grid>
                                    </Grid>
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
