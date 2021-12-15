import React, { useState } from 'react'
import { API_URL } from '../../constants'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import './../../adminDashboard/dashboardTab/DashboardTab.css'
import { makeStyles } from '@material-ui/core/styles'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import './LocationCard.css'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
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
    const [locationInfo, setLocationInfo] = useState(props.location)
    const [locationName, setLocationName] = useState(props.location.name)
    const [locationVoltAmps, setLocationVoltAmps] = useState(
        props.location.maxVoltAmps
    )
    const [locationNotes, setLocationNotes] = useState(
        props.location.description
    )
    const classes = useStyles()

    const saveLocationInfo = () => {
        props.setIsLoading(true)
        if (props.token) {
            console.log('about to save this  Location info', locationInfo)
            fetch(API_URL + 'locations/' + locationInfo.locationUUID, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(locationInfo),
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        props.setIsLoading(false)
                        console.log('save location success', result)
                    },
                    (error) => {
                        props.setIsLoading(false)
                    }
                )
        }
    }

    const handleLocationFieldChange = (value, field) => {
        if (field === 'name') {
            setLocationName(value)
        } else if (field === 'description') {
            setLocationNotes(value)
        } else {
            setLocationVoltAmps(value)
        }
        let tempLocation = locationInfo
        tempLocation[field] = value

        setLocationInfo(tempLocation)
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
                                        className="editableField"
                                        id="locationName"
                                        label="Location Name"
                                        variant="outlined"
                                        value={locationName}
                                        onChange={(e) =>
                                            handleLocationFieldChange(
                                                e.target.value,
                                                'name'
                                            )
                                        }
                                        onBlur={() => saveLocationInfo()}
                                        InputProps={{
                                            endAdornment: <EditOutlinedIcon />,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        className="editableField"
                                        id="maxVoltAmps"
                                        label="Max-Volt-Amps"
                                        variant="outlined"
                                        value={locationVoltAmps}
                                        onChange={(e) =>
                                            handleLocationFieldChange(
                                                e.target.value,
                                                'maxVoltAmps'
                                            )
                                        }
                                        onBlur={() => saveLocationInfo()}
                                        InputProps={{
                                            endAdornment: <EditOutlinedIcon />,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        className="editableField"
                                        id="notes"
                                        label="Notes"
                                        variant="outlined"
                                        value={locationNotes}
                                        onChange={(e) =>
                                            handleLocationFieldChange(
                                                e.target.value,
                                                'description'
                                            )
                                        }
                                        onBlur={() => saveLocationInfo()}
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
