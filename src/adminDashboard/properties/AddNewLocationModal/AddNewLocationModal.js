import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { API_URL } from '../../../constants'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined'
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined'
import { Button, CircularProgress, TextField } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import './AddNewLocationModal.css'

function getModalStyle() {
    const top = 50
    const left = 50
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const useStyles = makeStyles((theme) => ({
    photoUploadButton: {
        backgroundColor: '#12BFA2',
        height: '52px',
        color: '#FFFFFF',
        fontWeight: 'bold',
        textTransform: 'none',
    },
    paper: {
        outline: 'none',
        position: 'absolute',
        width: 840,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '10px',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#12BFA2',
        color: '#FFF',
        '&:hover': {
            backgroundColor: '#53BCF9',
            color: '#FFF',
        },
        borderRadius: '5px',
    },
    cancel: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#FFF',
        color: '#000000',
        '&:hover': {
            backgroundColor: '#FFFFFF',
            color: '#000000',
        },
        borderRadius: '5px',
    },
    locationError: {
        fontSize: '14px',
        paddingLeft: '4px',
        marginTop: '7px',
        color: 'red',
    },
}))

export default function AddNewLocationModal(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [locations, setLocations] = useState([
        {
            description: '',
            lcuUUID: '',
            maxAmpsRed: 0,
            maxAmpsBlack: 0,
            maxAmpsBlue: 0,
            name: '',
            pictureUrl1: '',
            propertyUUID: props.propertyUUID,
        },
    ])
    const [numberOfLocations, setNumberOfLocations] = useState(1)
    const [amountOfSmartOutlets, setAmountOfSmartOutlets] = React.useState([])
    const [smartOutletsErrors, setSmartOutletsErrors] = React.useState([])
    const [locationsNamesErrors, setLocationsNamesErrors] = React.useState([])
    const [hasErrors, setHasErrors] = React.useState(false)
    const [photoAdded, setPhotoAdded] = React.useState(false)
    const [photoFile, setPhotoFile] = React.useState(null)
    const [photoBinaries, setPhotoBinaries] = React.useState([])
    const [photoFileNames, setPhotoFileNames] = React.useState([])
    const [disableSubmitButton, setDisableSubmitButton] = React.useState(true)

    const sampleLocationObject = {
        description: '',
        lcuUUID: '',
        maxAmpsRed: 0,
        maxAmpsBlack: 0,
        maxAmpsBlue: 0,
        name: '',
        pictureUrl1: '',
        propertyUUID: props.propertyUUID,
    }

    const [modalStyle] = useState(getModalStyle)
    const classes = useStyles()

    const handleNumberOfLocationsChange = () => {
        let tempLocations = locations
        if (tempLocations.length === 10) {
            alert('10 is the max amount of locations allowed.')
        } else {
            tempLocations.push(sampleLocationObject)
            setLocations(tempLocations)
            setNumberOfLocations(tempLocations.length)
        }
    }

    const removeThisLocation = (index) => {
        let tempLocations = locations.splice(1, index)
        setLocations(tempLocations)
        setNumberOfLocations(tempLocations.length)
    }

    const handleThisLocationNameChange = (value, index) => {
        let tempLocations = [...locations]
        tempLocations[index].name = value
        console.log('allTempLocations', tempLocations)
        setLocations(tempLocations)
        let tempErrors = locationsNamesErrors
        tempErrors[index] = null
        setLocationsNamesErrors(tempErrors)
    }

    const checkIfThereAreStillErrors = () => {
        let errorCount = 0
        smartOutletsErrors.forEach((value) => {
            if (value === true) {
                errorCount++
            }
        })

        locationsNamesErrors.forEach((value) => {
            if (value === true) {
                errorCount++
            }
        })

        if (errorCount > 0) {
            return true
        } else {
            return false
        }
    }

    const handleThisLocationNumberOfSmartOutletsChange = (value, index) => {
        console.log('outlets firing')
        if (isNaN(Number(value))) {
            let tempErrors = [...smartOutletsErrors]
            tempErrors[index] = true
            setSmartOutletsErrors(tempErrors)
            setHasErrors(true)
        } else if (Number(value) < 0 || Number(value) > 50) {
            let tempErrors = [...smartOutletsErrors]
            tempErrors[index] = true
            setSmartOutletsErrors(tempErrors)
            setHasErrors(true)
        } else {
            let tempErrors = [...smartOutletsErrors]
            tempErrors[index] = null
            setSmartOutletsErrors(tempErrors)
            let tempAmountOfSmartOutlets = [...amountOfSmartOutlets]
            tempAmountOfSmartOutlets[index] = Number(value)
            setAmountOfSmartOutlets(tempAmountOfSmartOutlets)
        }
    }

    const getBinaryFromImg = (picFile, locationIndex) => {
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
            let tempBinaries = photoBinaries
            tempBinaries[locationIndex] = result
            setPhotoBinaries(tempBinaries)
        })
    }

    const fileDrop = (event, locationIndex) => {
        event.preventDefault()
        const file = event.dataTransfer.files[0]
        setPhotoAdded(true)
        setPhotoFile(file)
        getBinaryFromImg(file, locationIndex)
        let tempFileNames = photoFileNames
        tempFileNames[locationIndex] = file.name
        setPhotoFileNames(tempFileNames)
    }

    const hiddenFileInput = React.useRef(null)

    const handlePhotoClick = (event) => {
        hiddenFileInput.current.click()
    }

    const handlePhotoChange = (event) => {
        event.preventDefault()
        const files = event.target.files
        setPhotoAdded(true)
        setPhotoFile(files[0])
        getBinaryFromImg(files[0], 0)
        let tempFileNames = photoFileNames
        tempFileNames[0] = files[0].name
        setPhotoFileNames(tempFileNames)
    }

    const dragOver = (e) => {
        e.preventDefault()
    }

    const dragEnter = (e) => {
        e.preventDefault()
    }

    const dragLeave = (e) => {
        e.preventDefault()
    }

    const checkLocationsNames = () => {
        let tempErrors = locationsNamesErrors
        locations.forEach((location, index) => {
            if (location.name.length === 0 || location.name === null) {
                tempErrors[index] = true
                setHasErrors(true)
            } else {
                tempErrors[index] = null
            }
        })
        setLocationsNamesErrors(tempErrors)
        checkIfThereAreStillErrors()
    }

    const createSmartOutlets = (amountOfOutlets, locationId) => {
        console.log('this is the amount of outlets', amountOfOutlets)
        console.log('locationId', locationId)
        for (var i = 0; i < amountOfOutlets; i++) {
            setIsLoading(true)
            let locationObject = {
                locationUUID: locationId,
                model: 'Proto X2',
            }
            if (props.token) {
                fetch(API_URL + 'smart-outlets', {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + props.token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(locationObject),
                })
                    .then((res) => res.json())
                    .then(
                        async (result) => {
                            setIsLoading(false)
                            console.log(
                                'created smart outlet successfully',
                                result
                            )
                        },
                        (error) => {
                            setIsLoading(false)
                        }
                    )
            }
        }
    }

    const uploadLocationPicture = (locationId, photoBinaries, index) => {
        setIsLoading(true)
        if (props.token) {
            fetch(API_URL + 'locations-image/' + locationId, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'image/jpg',
                },
                body: photoBinaries[index],
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoading(false)
                        console.log(
                            'uploaded location image successfully',
                            result
                        )
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const createLocation = (
        lcuId,
        location,
        photoBinaries,
        index,
        amountOfSmartOutlets
    ) => {
        let locationId = null
        setIsLoading(true)
        let locationObject = {
            lcuUUID: lcuId,
            maxAmpsRed: location.maxAmpsRed,
            maxAmpsBlue: location.maxAmpsBlue,
            maxAmpsBlack: location.maxAmpsBlack,
            name: location.name,
            propertyUUID: props.propertyUUID,
        }
        console.log('creating this location', locationObject)
        if (props.token) {
            fetch(API_URL + 'locations', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(locationObject),
            })
                .then((res) => res.json())
                .then(
                    async (result) => {
                        setIsLoading(false)
                        console.log('created location successfully', result)
                        locationId = result.locationUUID
                        if (photoBinaries.length > 0 && photoBinaries[index]) {
                            await uploadLocationPicture(
                                locationId,
                                photoBinaries,
                                index
                            )
                        }
                        if (
                            amountOfSmartOutlets.length > 0 &&
                            amountOfSmartOutlets[index]
                        ) {
                            await createSmartOutlets(
                                amountOfSmartOutlets[index],
                                locationId
                            )
                        }
                        props.close()
                        props.openPropertyDetailsOnLoad(props.propertyUUID)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const validateAndSubmit = () => {
        checkLocationsNames()
        if (!hasErrors) {
            createLocation(
                props.lcuId,
                locations[0],
                photoBinaries,
                amountOfSmartOutlets
            )
        } else {
            document.querySelector('body').scrollTo(0, 0)
        }
    }

    const handleThisLocationMaxVoltAmpsChange = (color, value, index) => {
        let tempLocations = [...locations]
        if (color === 'black') {
            tempLocations[index].maxAmpsBlack = parseInt(value)
        } else if (color === 'blue') {
            tempLocations[index].maxAmpsBlue = parseInt(value)
        } else {
            tempLocations[index].maxAmpsRed = parseInt(value)
        }
        setLocations(tempLocations)
    }

    useEffect(() => {
        // let tempLocations = locations
        // if (tempLocations.length === 0) {
        //     for (let i = 0; i < 1; i++) {
        //         tempLocations.push(sampleLocationObject)
        //     }
        //     setLocations(tempLocations)
        // }
        setNumberOfLocations(1)
    }, [])

    useEffect(() => {
        if (
            locations[0].name &&
            locations[0].maxAmpsBlack &&
            locations[0].maxAmpsRed &&
            locations[0].maxAmpsBlue &&
            amountOfSmartOutlets[0]
        ) {
            if (
                locations[0].name.length > 0 &&
                locations[0].maxAmpsBlack.toString().length > 0 &&
                locations[0].maxAmpsRed.toString().length > 0 &&
                locations[0].maxAmpsBlue.toString().length > 0 &&
                amountOfSmartOutlets[0].toString().length > 0
            ) {
                setDisableSubmitButton(false)
            } else {
                setDisableSubmitButton(true)
            }
        }
    }, [amountOfSmartOutlets, locations])

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className="newLcuModalHeader">Add New Location</div>
            <div id="simple-modal-description">
                {isLoading && (
                    <div className="loaderContainer">
                        <CircularProgress
                            style={{ color: '#12BFA2', marginBottom: '35px' }}
                        />
                    </div>
                )}
                {!isLoading && (
                    <>
                        <Grid container xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    className="editableField"
                                    id="locationName"
                                    label="Add Location Name"
                                    variant="filled"
                                    value={locations[0].name}
                                    onChange={(event) =>
                                        handleThisLocationNameChange(
                                            event.target.value,
                                            0
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {!photoAdded && (
                                    <Button
                                        className={classes.photoUploadButton}
                                        variant="contained"
                                        startIcon={<ImageOutlinedIcon />}
                                        onClick={handlePhotoClick}
                                        onDragOver={dragOver}
                                        onDragEnter={dragEnter}
                                        onDragLeave={dragLeave}
                                        onDrop={(e) => fileDrop(e, 0)}
                                        fullWidth
                                    >
                                        Click here or drag and drop photo
                                    </Button>
                                )}
                                {photoAdded && (
                                    <div className={classes.photoSelectedName}>
                                        <DoneOutlineOutlinedIcon
                                            style={{
                                                marginRight: '10px',
                                                color: green[500],
                                            }}
                                        />
                                        Photo selected:
                                        {photoFileNames[0]}
                                    </div>
                                )}
                                <input
                                    type="file"
                                    ref={hiddenFileInput}
                                    style={{
                                        display: 'none',
                                    }}
                                    onChange={handlePhotoChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    className="editableField"
                                    id="numberOfSmartOutlets"
                                    label="Number Of Smart Outlets"
                                    variant="filled"
                                    value={amountOfSmartOutlets[0]}
                                    onChange={(event) =>
                                        handleThisLocationNumberOfSmartOutletsChange(
                                            event.target.value,
                                            0
                                        )
                                    }
                                />
                                {smartOutletsErrors[0] === true && (
                                    <div className={classes.locationError}>
                                        Must be a number between 1 and 50.
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    className="editableField"
                                    id="maxVoltAmps"
                                    label="Black Max Amps"
                                    variant="filled"
                                    value={locations[0].maxAmpsBlack}
                                    onChange={(event) =>
                                        handleThisLocationMaxVoltAmpsChange(
                                            'black',
                                            event.target.value,
                                            0
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    className="editableField"
                                    id="maxVoltAmpsBlue"
                                    label="Blue Max Amps"
                                    variant="filled"
                                    value={locations[0].maxAmpsBlue}
                                    onChange={(event) =>
                                        handleThisLocationMaxVoltAmpsChange(
                                            'blue',
                                            event.target.value,
                                            0
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    className="editableField"
                                    id="maxVoltAmpsRed"
                                    label="Red Max Amps"
                                    variant="filled"
                                    value={locations[0].maxAmpsRed}
                                    onChange={(event) =>
                                        handleThisLocationMaxVoltAmpsChange(
                                            'red',
                                            event.target.value,
                                            0
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid container xs={12} spacing={3}>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Button
                                    className="submitButton"
                                    disabled={disableSubmitButton}
                                    onClick={() => validateAndSubmit()}
                                >
                                    Create
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}
            </div>
        </div>
    )

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    )
}
