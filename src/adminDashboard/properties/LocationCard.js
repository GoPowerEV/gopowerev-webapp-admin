import React, { useState } from 'react'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import './../../adminDashboard/dashboardTab/DashboardTab.css'
import { makeStyles } from '@material-ui/core/styles'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import './LocationCard.css'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Button from '@material-ui/core/Button'
import NoImageAvailable from './../../assets/img/noImageAvailable.png'

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
    locationCardHeader: {
        fontSize: 19,
        fontWeight: '600',
        marginBottom: '25px',
        display: 'inline-flex',
    },
    pos: {
        marginBottom: 12,
    },
})

const LocationCard = (props) => {
    const classes = useStyles()
    const locationInfo = props.location
    const [editingNotes, setEditingNotes] = useState(false)
    const [editingName, setEditingName] = useState(false)
    const [editingMaxVoltAmps, setEditingMaxVoltAmps] = useState(false)

    const makeNameEditable = () => {
        setEditingName(true)
    }

    const saveName = () => {
        setEditingName(false)
    }

    const saveMaxVoltAmps = () => {
        setEditingMaxVoltAmps(false)
    }

    const makeMaxVoltAmpsEditable = () => {
        setEditingMaxVoltAmps(true)
    }

    const makeNotesEditable = () => {
        setEditingNotes(true)
    }

    const saveNotes = () => {
        setEditingNotes(false)
    }

    return (
        <React.Fragment>
            <div className={classes.locationCardHeader}>
                <LocationOnOutlinedIcon />
                {locationInfo.name ?? 'No Location Name Available'}
            </div>
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Grid container xs={12} spacing={3}>
                        <Grid item xs={4}>
                            <img
                                alt="Property Img"
                                src={
                                    locationInfo.pictureUrl1 ?? NoImageAvailable
                                }
                                className="viewedPropertyMainImage"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Grid
                                container
                                spacing={3}
                                className="editLcuDetailsContainer"
                            >
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        id="locationName"
                                        label="Location Name"
                                        variant="filled"
                                        value={locationInfo.name}
                                        InputProps={{
                                            endAdornment: <EditOutlinedIcon />,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        id="maxVoltAmps"
                                        label="Max-Volt-Amps"
                                        variant="filled"
                                        value={locationInfo.maxVoltAmps}
                                        InputProps={{
                                            endAdornment: <EditOutlinedIcon />,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="notes"
                                        label="Notes"
                                        variant="filled"
                                        value={locationInfo.notes}
                                        InputProps={{
                                            endAdornment: <EditOutlinedIcon />,
                                        }}
                                    />
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
