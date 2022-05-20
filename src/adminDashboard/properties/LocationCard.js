import React, { useState, useEffect } from 'react'
import { API_URL } from '../../constants'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import './../../adminDashboard/dashboardTab/DashboardTab.css'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import './LocationCard.css'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import NoImageAvailable from './../../assets/img/noImageAvailable.png'
import SmartOutlets from './propertySmartOutlets/SmartOutlets'
import { getLocationSmartOutletsById } from './../dashboardService'

const useStyles = makeStyles({
    root: {
        fontFamily: 'Nunito Sans, sans-serif !important',
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
    const [isLoading, setIsLoading] = useState(false)
    const [locationInfo, setLocationInfo] = useState(props.location)
    const [locationName, setLocationName] = useState(props.location.name)
    const [locationInfoOpened, setlLocationInfoOpened] = useState(true)
    const [photoBinary, setPhotoBinary] = React.useState(null)
    const [locationAmpsBlack, setLocationAmpsBlack] = useState(
        props.location.maxAmpsBlack
    )
    const [locationAmpsBlue, setLocationAmpsBlue] = useState(
        props.location.maxAmpsBlue
    )
    const [locationAmpsRed, setLocationAmpsRed] = useState(
        props.location.maxAmpsRed
    )
    const [locationNotes, setLocationNotes] = useState(
        props.location.description
    )
    const [smartOutlets, setSmartOutlets] = useState([])
    const classes = useStyles()

    const uploadLocationImg = async () => {
        setIsLoading(true)
        if (props.token) {
            await fetch(
                API_URL + 'locations-image/' + locationInfo.locationUUID,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: 'Bearer ' + props.token,
                        'Content-Type': 'image/jpg',
                    },
                    body: photoBinary,
                }
            )
                .then((res) => res.json())
                .then(
                    (result) => {
                        props.reloadPropertyLocations()
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const getBinaryFromImg = (picFile) => {
        new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (event) => {
                resolve(event.target.result)
            }

            reader.onerror = (err) => {
                reject(err)
            }

            reader.readAsArrayBuffer(picFile)
        }).then((result) => {
            setPhotoBinary(result)
        })
    }

    const handlePhotoChange = (event) => {
        event.preventDefault()
        const files = event.target.files
        getBinaryFromImg(files[0])
    }

    const hiddenFileInput = React.useRef(null)

    const handlePhotoClick = (event) => {
        hiddenFileInput.current.click()
    }
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
        } else if (field === 'maxAmpsBlack') {
            setLocationAmpsBlack(value)
        } else if (field === 'maxAmpsBlue') {
            setLocationAmpsBlue(value)
        } else {
            setLocationAmpsRed(value)
        }
        let tempLocation = locationInfo
        tempLocation[field] = value

        setLocationInfo(tempLocation)
    }

    const toggleLocationInfo = () => {
        setlLocationInfoOpened(!locationInfoOpened)
    }

    const getSmartOutletData = () => {
        getLocationSmartOutletsById(
            props.token,
            locationInfo.locationUUID,
            setSmartOutlets
        )
    }

    useEffect(() => {
        if (photoBinary) {
            uploadLocationImg()
        }
    }, [photoBinary])

    useEffect(() => {
        getSmartOutletData()
    }, [])

    useEffect(() => {}, [smartOutlets])

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={11}>
                    <div className={classes.locationCardHeader}>
                        <LocationOnOutlinedIcon />
                        {locationInfo.name ?? 'No Location Name Available'}
                    </div>
                    {!locationInfoOpened && (
                        <div className="smartOutletsCountHidden">
                            {smartOutlets.length} Smart Outlets (Expand to see
                            more information)
                        </div>
                    )}
                </Grid>
                <Grid item xs={1}>
                    {!locationInfoOpened && (
                        <ExpandMoreIcon
                            className="expandIconFirstPortion"
                            onClick={toggleLocationInfo}
                        />
                    )}
                    {locationInfoOpened && (
                        <ExpandLessIcon
                            className="expandIconFirstPortion"
                            onClick={toggleLocationInfo}
                        />
                    )}
                </Grid>
                <Collapse in={locationInfoOpened}>
                    <Card className={classes.root}>
                        <CardContent className={classes.content}>
                            <Grid container xs={12} spacing={3}>
                                <Grid item xs={4}>
                                    <img
                                        alt="Property Img"
                                        src={
                                            locationInfo.pictureUrl1 ??
                                            NoImageAvailable
                                        }
                                        className="viewedPropertyMainImage"
                                    />
                                    <Button
                                        size="small"
                                        className="editLocationmageButton"
                                        variant="contained"
                                        onClick={() => handlePhotoClick()}
                                    >
                                        Edit Location Image
                                    </Button>
                                    <input
                                        type="file"
                                        ref={hiddenFileInput}
                                        style={{
                                            display: 'none',
                                        }}
                                        onChange={handlePhotoChange}
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
                                                onBlur={() =>
                                                    saveLocationInfo()
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <EditOutlinedIcon />
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                className="editableField"
                                                id="maxVoltAmpsBlack"
                                                label="Black-Max Amps"
                                                variant="outlined"
                                                value={locationAmpsBlack}
                                                onChange={(e) =>
                                                    handleLocationFieldChange(
                                                        e.target.value,
                                                        'maxAmpsBlack'
                                                    )
                                                }
                                                onBlur={() =>
                                                    saveLocationInfo()
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <EditOutlinedIcon />
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        {props.propertyPowerType !==
                                            '1P-240' && (
                                            <Grid item xs={6}>
                                                <TextField
                                                    fullWidth
                                                    className="editableField"
                                                    id="maxVoltAmpsBlue"
                                                    label="Blue-Max Amps"
                                                    variant="outlined"
                                                    value={locationAmpsBlue}
                                                    onChange={(e) =>
                                                        handleLocationFieldChange(
                                                            e.target.value,
                                                            'maxAmpsBlue'
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        saveLocationInfo()
                                                    }
                                                    InputProps={{
                                                        endAdornment: (
                                                            <EditOutlinedIcon />
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                        )}
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                className="editableField"
                                                id="maxVoltAmpsRed"
                                                label="Red-Max Amps"
                                                variant="outlined"
                                                value={locationAmpsRed}
                                                onChange={(e) =>
                                                    handleLocationFieldChange(
                                                        e.target.value,
                                                        'maxAmpsRed'
                                                    )
                                                }
                                                onBlur={() =>
                                                    saveLocationInfo()
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <EditOutlinedIcon />
                                                    ),
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
                                                onBlur={() =>
                                                    saveLocationInfo()
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <EditOutlinedIcon />
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Collapse>
            </Grid>
            <Collapse in={locationInfoOpened}>
                <Grid container xs={12} className="smartOutletsArea">
                    <SmartOutlets
                        smartOutlets={smartOutlets}
                        token={props.token}
                        locationdUuid={locationInfo.locationUUID}
                        getSmartOutletData={getSmartOutletData}
                        powerTypeIs1P240={props.propertyPowerType === '1P-240'}
                    />
                </Grid>
            </Collapse>
        </React.Fragment>
    )
}

export default LocationCard
