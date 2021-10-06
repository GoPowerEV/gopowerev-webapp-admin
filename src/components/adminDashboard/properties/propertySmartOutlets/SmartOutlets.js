import React from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined'
import Grid from '@material-ui/core/Grid'
import './SmartOutlets.css'
import { makeStyles } from '@material-ui/core/styles'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'

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
    location: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: '10px',
        color: 'black',
    },
    pos: {
        marginBottom: 12,
    },
    right: {
        marginLeft: 'auto',
        color: 'grey',
    },
    operationalStatusHeader: {
        fontSize: '14px',
        marginTop: '15px',
    },
    status: {
        fontSize: 15,
        fontWeight: '600',
        color: 'black',
    },
})

const SmartOutlets = (props) => {
    const classes = useStyles()

    return (
        <div className="smartOutletsContainer">
            <div className="outletHeader"><FlashOnOutlinedIcon />Smart Outlets (2)</div>
            <Grid container xs={12} spacing={2}>
                <Grid item xs={3}>
                    <Card className={classes.root}>
                        <CardContent className={classes.content}>
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <Typography className={classes.cardHeader}>
                                        <span className="smartSo">SO:</span> 1
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} className={classes.right}>
                                    <SettingsOutlinedIcon />
                                </Grid>
                            </Grid>
                            <Typography className={classes.location}>
                                East Building Nothside
                            </Typography>
                            <Grid container spacing={4}>
                                <Grid item xs={3}>
                                    <div className="red statusBadge">
                                        <div className="badgeBox">
                                            <span className="badgeText">
                                                Offline
                                            </span>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={5}>
                                    <div className="black statusBadge">
                                        <div className="locationBadgeBox">
                                            <span className="badgeText">
                                                <div class="overall-progress">
                                                    <div
                                                        class="progress"
                                                        data-progress="80"
                                                    ></div>
                                                </div>
                                                <div class="overall-progresss">
                                                    <div
                                                        class="progress"
                                                        data-progress="20"
                                                    ></div>
                                                </div>
                                                <div class="overall-progress">
                                                    <div
                                                        class="progress"
                                                        data-progress="90"
                                                    ></div>
                                                </div>
                                                <div class="overall-progress">
                                                    <div
                                                        class="progress"
                                                        data-progress="40"
                                                    ></div>
                                                </div>
                                                <div class="overall-progress">
                                                    <div
                                                        class="progress"
                                                        data-progress="40"
                                                    ></div>
                                                </div>
                                                <div class="overall-progress">
                                                    <div
                                                        class="progress"
                                                        data-progress="40"
                                                    ></div>
                                                </div>
                                                <div class="overall-progress">
                                                    <div
                                                        class="progress"
                                                        data-progress="40"
                                                    ></div>
                                                </div>
                                                <div class="overall-progress">
                                                    <div
                                                        class="progress"
                                                        data-progress="40"
                                                    ></div>
                                                </div>
                                                <span class="progressDigits">
                                                    -00
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className="black statusBadge">
                                        <div className="locationBadgeBox">
                                            <span className="badgeText">
                                                <LocationOnOutlinedIcon /> na
                                            </span>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <Typography
                                className={classes.operationalStatusHeader}
                            >
                                Operational Status
                            </Typography>
                            <Typography className={classes.status}>
                                Never connected
                            </Typography>
                            <Typography
                                className={classes.operationalStatusHeader}
                            >
                                Heartbeat
                            </Typography>
                            <Typography className={classes.status}>
                                -
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card className={classes.root}>
                        <CardContent className={classes.content}>
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <Typography className={classes.cardHeader}>
                                        <span className="smartSo">SO:</span> 1
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} className={classes.right}>
                                    <SettingsOutlinedIcon />
                                </Grid>
                            </Grid>
                            <Typography className={classes.location}>
                                East Building Nothside
                            </Typography>
                            <Grid container spacing={4}>
                                <Grid item xs={3}>
                                    <div className="green statusBadge">
                                        <div className="badgeBox">
                                            <span className="badgeText">
                                                Online
                                            </span>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={5}>
                                    <div className="black statusBadge">
                                        <div className="locationBadgeBox">
                                            <span className="badgeText">
                                                <div class="greenBar overall-progress">
                                                    <div
                                                        class="progress"
                                                        data-progress="80"
                                                    ></div>
                                                </div>
                                                <div class="greenBar overall-progresss">
                                                    <div
                                                        class="progress"
                                                        data-progress="20"
                                                    ></div>
                                                </div>
                                                <div class="greenBar overall-progress">
                                                    <div
                                                        class="progress"
                                                        data-progress="90"
                                                    ></div>
                                                </div>
                                                <div class="greenBar overall-progress">
                                                    <div
                                                        class="progress"
                                                        data-progress="40"
                                                    ></div>
                                                </div>
                                                <div class="greenBar overall-progress">
                                                    <div
                                                        class="progress"
                                                        data-progress="40"
                                                    ></div>
                                                </div>
                                                <div class="greenBar overall-progress">
                                                    <div
                                                        class="progress"
                                                        data-progress="40"
                                                    ></div>
                                                </div>
                                                <div class="overall-progress">
                                                    <div
                                                        class="progress"
                                                        data-progress="40"
                                                    ></div>
                                                </div>
                                                <div class="overall-progress">
                                                    <div
                                                        class="progress"
                                                        data-progress="40"
                                                    ></div>
                                                </div>
                                                <span class="progressDigits">
                                                    -38
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className="black statusBadge">
                                        <div className="locationBadgeBox">
                                            <span className="badgeText">
                                                <LocationOnOutlinedIcon /> 22
                                            </span>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <Typography
                                className={classes.operationalStatusHeader}
                            >
                                Operational Status
                            </Typography>
                            <Typography className={classes.status}>
                                Connected
                            </Typography>
                            <Typography
                                className={classes.operationalStatusHeader}
                            >
                                Heartbeat
                            </Typography>
                            <Typography className={classes.status}>
                                11:20:20AM PST - 09-20-21
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default SmartOutlets
