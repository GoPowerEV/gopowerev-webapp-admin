import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {
    TextField,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined'
import { green } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'Nunito Sans, sans-serif !important',
        width: '100%',
    },
    headerContainer: {
        marginTop: '25px',
        marginLeft: '25px',
        fontSize: '24px',
        fontWeight: 'bold',
    },
    firstHeader: {
        color: '#12BFA2',
    },
    formContainer: {
        width: '91%',
        padding: '35px',
        borderRadius: '15px',
        backgroundColor: '#F6F6F6',
        marginTop: '30px',
    },
    formContainerPhoto: {
        width: '91%',
        height: '181px',
        padding: '35px',
        borderRadius: '15px',
        backgroundColor: '#F6F6F6',
    },
    formContainerNotes: {
        width: '96%',
        height: '181px',
        padding: '35px',
        borderRadius: '15px',
        backgroundColor: '#F6F6F6',
    },
    textField: {
        backgroundColor: '#FFFFFF',
    },
    formHeader: {
        marginBottom: '20px',
        color: 'black',
    },
    formHeaderGrey: {
        color: '#ADAEAF',
        fontSize: '17px',
        marginBottom: '10px',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    completedStep: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    photoUploadButton: {
        backgroundColor: '#12BFA2',
        height: '52px',
        marginTop: '13px',
        color: '#FFFFFF',
        fontWeight: 'bold',
        textTransform: 'none',
    },
    step: {
        fontWeight: 'bold',
        '&$active': {
            color: '#12BFA2',
        },
        '&$completed': {
            color: '#12BFA2',
        },
    },
    active: {},
    completed: {},
    createButton: {
        width: '400px',
        backgroundColor: '#12BFA2',
        marginTop: '20px',
        marginBottom: '40px',
        color: '#FFFFFF',
        fontWeight: 'bold',
        textTransform: 'none',
        fontSize: '18px',
        borderRadius: '5px',
    },
    formControlState: {
        position: 'relative',
        top: '7px',
    },
    installerDetailsStep2: {
        fontSize: '20px',
        marginBottom: '20px',
        color: 'black',
    },
    splitter: {
        fontSize: '19px',
        marginLeft: '12px',
        marginRight: '12px',
        color: '#ADAEAF',
        fontWeight: '0',
    },
    editIcon: {
        color: '#323438',
        cursor: 'pointer',
    },
    removeLocationIcon: {
        fontSize: '30px',
        cursor: 'pointer',
        color: '#323438',
    },
    dottedHr: {
        borderTop: '1px dashed #ADAEAF',
        borderBottom: 'none',
    },
    hrContainer: {
        marginTop: '10px',
        width: '100%',
        marginBottom: '7px',
        paddingRight: '48px',
    },
    errorText: {
        color: 'red',
        fontSize: '15px',
        fontWeight: '700',
        marginTop: '5px',
    },
    locationError: {
        fontSize: '14px',
        paddingLeft: '4px',
        marginTop: '7px',
        color: 'red',
    },
}))

export default function LocationCardToCreate(props) {
    const classes = useStyles()
    const [photoAdded, setPhotoAdded] = React.useState(false)
    const [photoFile, setPhotoFile] = React.useState(null)
    const [numberOfSmartOutlets, setNumberOfSmartOutlets] = useState([])
    const [locationName, setLocationName] = useState()
    const [maxVoltAmpsBlack, setMaxVoltAmpsBlack] = useState(0)
    const [maxVoltAmpsBlue, setMaxVoltAmpsBlue] = useState(0)
    const [maxVoltAmpsRed, setMaxVoltAmpsRed] = useState(0)

    console.log('here it is')

    const fileDrop = (event, locationIndex) => {
        event.preventDefault()
        const files = event.dataTransfer.files
        setPhotoAdded(true)
        setPhotoFile(files[0])
        props.getBinaryFromImg(files[0], locationIndex)
        let tempFileNames = props.photoFileNames
        tempFileNames[locationIndex] = files[0].name
        props.setPhotoFileNames(tempFileNames)
    }

    const hiddenFileInput = React.useRef(null)

    const handlePhotoClick = (event) => {
        hiddenFileInput.current.click()
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

    const handlePhotoChange = (event, locationIndex) => {
        event.preventDefault()
        const files = event.target.files
        setPhotoAdded(true)
        setPhotoFile(files[0])
        props.getBinaryFromImg(files[0], locationIndex)
        let tempFileNames = props.photoFileNames
        tempFileNames[locationIndex] = files[0].name
        props.setPhotoFileNames(tempFileNames)
    }

    const handleOutletTypeChange = (value, locationIndex) => {
        props.setSoModel(value)
    }

    useEffect(() => {
        if (props.numberOfSmartOutlets) {
            setNumberOfSmartOutlets(props.numberOfSmartOutlets[props.index])
        }
    }, [props.index, props.numberOfSmartOutlets])

    return (
        <div className={classes.formContainer}>
            <Grid justify="space-between" container spacing={24}>
                <Grid item></Grid>

                {props.index > 0 && (
                    <Grid item>
                        <div>
                            <CloseOutlinedIcon
                                className={classes.removeLocationIcon}
                                onClick={() =>
                                    props.removeThisLocation(props.index)
                                }
                            />
                        </div>
                    </Grid>
                )}
            </Grid>
            <Grid container xs={12} spacing={5}>
                <Grid item md={6} xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <div className={classes.formHeader}>
                                Location {props.index + 1} Details
                            </div>
                            <TextField
                                className={classes.textField}
                                label="Location name"
                                value={locationName}
                                variant="outlined"
                                onChange={(event) => {
                                    setLocationName(event.target.value)
                                    props.handleThisLocationNameChange(
                                        event.target.value,
                                        props.index
                                    )
                                }}
                                fullWidth
                            />
                            {props.locationsNamesErrors[props.index] ===
                                true && (
                                <div className={classes.locationError}>
                                    Location name must have a value.
                                </div>
                            )}
                        </Grid>
                        <Grid item lg={6} md={12}>
                            <TextField
                                className={classes.textField}
                                label="Number of Smart Outlets"
                                variant="outlined"
                                fullWidth
                                value={numberOfSmartOutlets}
                                onChange={(event) => {
                                    setNumberOfSmartOutlets(event.target.value)
                                    props.handleThisLocationNumberOfSmartOutletsChange(
                                        event.target.value,
                                        props.index
                                    )
                                }}
                            />
                            {props.smartOutletsErrors[props.index] === true && (
                                <div className={classes.locationError}>
                                    Must be a number between 1 and 50.
                                </div>
                            )}
                        </Grid>
                        <Grid item lg={6} md={12}>
                            <TextField
                                className={classes.textField}
                                label="Black Max Amps"
                                variant="outlined"
                                fullWidth
                                value={maxVoltAmpsBlack}
                                onChange={(event) => {
                                    setMaxVoltAmpsBlack(event.target.value)
                                    props.handleThisLocationMaxVoltAmpsChange(
                                        'black',
                                        event.target.value,
                                        props.index
                                    )
                                }}
                            />
                            {/* {props.voltAmpsErrors[props.index] === true && (
                                <div className={classes.locationError}>
                                    Must be a number that is more than a zero.
                                </div>
                            )} */}
                        </Grid>
                        {!props.isPowerType1P240 && (
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.textField}
                                    label="Blue Max Amps"
                                    variant="outlined"
                                    fullWidth
                                    value={maxVoltAmpsBlue}
                                    onChange={(event) => {
                                        setMaxVoltAmpsBlue(event.target.value)
                                        props.handleThisLocationMaxVoltAmpsChange(
                                            'blue',
                                            event.target.value,
                                            props.index
                                        )
                                    }}
                                />
                                {/* {props.voltAmpsErrors[props.index] === true && (
                                <div className={classes.locationError}>
                                    Must be a number that is more than a zero.
                                </div>
                            )} */}
                            </Grid>
                        )}
                        <Grid item xs={6}>
                            <TextField
                                className={classes.textField}
                                label="Red Max Amps"
                                variant="outlined"
                                fullWidth
                                value={maxVoltAmpsRed}
                                onChange={(event) => {
                                    setMaxVoltAmpsRed(event.target.value)
                                    props.handleThisLocationMaxVoltAmpsChange(
                                        'red',
                                        event.target.value,
                                        props.index
                                    )
                                }}
                            />
                            {/* {props.voltAmpsErrors[props.index] === true && (
                                <div className={classes.locationError}>
                                    Must be a number that is more than a zero.
                                </div>
                            )} */}
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="filled" fullWidth>
                                <InputLabel
                                    id="demo-simple-select-filled-label2"
                                    style={{
                                        marginTop: '-13px',
                                        marginLeft: '5px',
                                    }}
                                >
                                    SO Model
                                </InputLabel>
                                <Select
                                    className={classes.textField}
                                    label="SO Model"
                                    labelId="demo-simple-select-filled-label2"
                                    variant="outlined"
                                    value={props.soModel}
                                    onChange={(e) =>
                                        handleOutletTypeChange(e.target.value)
                                    }
                                >
                                    {props.models?.map((model) => (
                                        <MenuItem value={model.value}>
                                            {model.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6} xs={12}>
                    <div className={classes.formHeader}>Location Photo</div>
                    <Grid container spacing={3}>
                        {!photoAdded && (
                            <Button
                                className={classes.photoUploadButton}
                                variant="contained"
                                startIcon={<ImageOutlinedIcon />}
                                onClick={handlePhotoClick}
                                onDragOver={dragOver}
                                onDragEnter={dragEnter}
                                onDragLeave={dragLeave}
                                onDrop={(e) => fileDrop(e, props.index)}
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
                                {props.photoFileNames[props.index]}
                            </div>
                        )}
                        <input
                            type="file"
                            ref={hiddenFileInput}
                            style={{
                                display: 'none',
                            }}
                            onChange={(e) => handlePhotoChange(e, props.index)}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid
                    container
                    spacing={2}
                    justifyContent="space-between"
                ></Grid>
            </Grid>
        </div>
    )
}
