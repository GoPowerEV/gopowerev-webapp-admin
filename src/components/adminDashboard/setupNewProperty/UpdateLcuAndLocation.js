import React, { useState, useEffect } from 'react'
import { API_URL } from './../../../constants'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    root: {
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
        float: 'right',
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
}))

export default function UpdateLcuAndLocation(props) {
    const classes = useStyles()
    const [isLoading, setIsLoading] = useState(false)
    const [numberOfLocations, setNumberOfLocations] = useState(0)
    const [locations, setLocations] = useState([])
    const [locationsError, setLocationsError] = useState(false)
    const [lcuModels, setLcuModels] = useState([])

    const sampleLocationObject = {
        description: '',
        lcuUUID: '',
        maxAmps: 0,
        maxVoltAmps: 0,
        name: '',
        pictureUrl1: '',
        propertyUUID: '',
    }

    const handleNumberOfLocationsChange = (value) => {
        if (isNaN(value)) {
            setLocationsError(true)
        } else if (parseInt(value) === 0) {
            setNumberOfLocations(value)
            setLocations([])
        } else {
            setLocations([])
            setLocationsError(false)
            setNumberOfLocations(value)
            let tempLocations = locations
            for (let i = 0; i < parseInt(value); i++) {
                tempLocations.push({ sampleLocationObject })
            }
            setLocations(tempLocations)
            console.log(locations.length)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        if (props.token) {
            fetch(API_URL + 'lcus', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoading(false)
                        setLcuModels(result.lcus)
                        console.log(result.lcus)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }, [])

    return (
        <div className={classes.root}>
            <Grid className={classes.headerContainer} container>
                <Grid item xs={8}>
                    <span className={classes.firstHeader}>
                        Setup New Property |{' '}
                    </span>
                    <span>Step 3 Update LCU and Location details</span>
                </Grid>
            </Grid>
            <Stepper nonLinear activeStep={props.activeStep}>
                {props.steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel
                            onClick={props.handleStep(index)}
                            completed={props.completed[index]}
                            StepIconProps={{
                                classes: {
                                    root: classes.step,
                                    completed: classes.completed,
                                    active: classes.active,
                                },
                            }}
                        >
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            {!isLoading && (
                <Grid className={classes.headerContainer} container>
                    <div className={classes.formHeaderGrey}>
                        Property Details
                    </div>
                    <Grid container xs={12}>
                        <Grid item xs={10}>
                            <span className={classes.installerDetailsStep2}>
                                {props.newPropertyName}
                            </span>
                            <span className={classes.splitter}>|</span>
                            <span className={classes.installerDetailsStep2}>
                                {props.newPropertyAddress}
                            </span>
                            <span className={classes.splitter}>|</span>
                            <span className={classes.installerDetailsStep2}>
                                {props.newPropertyAdminName}
                            </span>
                        </Grid>
                        <Grid item xs={2}>
                            <EditOutlinedIcon
                                className={classes.editIcon}
                                onClick={props.handleTwoBack}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.hrContainer}>
                        <hr className={classes.dottedHr} />
                    </div>
                    <div className={classes.formHeaderGrey}>
                        Installer Details
                    </div>
                    <Grid container xs={12}>
                        <Grid item xs={10}>
                            <span className={classes.installerDetailsStep2}>
                                {props.installerName}
                            </span>
                            <span className={classes.splitter}>|</span>
                            <span className={classes.installerDetailsStep2}>
                                installer@gmail.com
                            </span>
                            <span className={classes.splitter}>|</span>
                            <span className={classes.installerDetailsStep2}>
                                913-555-2331
                            </span>
                        </Grid>
                        <Grid item xs={2}>
                            <EditOutlinedIcon
                                className={classes.editIcon}
                                onClick={props.handleBack}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.formContainer}>
                        <div className={classes.formHeader}>LCU Details</div>
                        <Grid container xs={12} spacing={4}>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.textField}
                                    label="Add LCU name"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl
                                    fullWidth
                                    variant="outlined"
                                    className={classes.formControl}
                                >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        LCU Models
                                    </InputLabel>
                                    <Select
                                        fullWidth
                                        className={classes.textField}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={props.installerName}
                                        onChange={(event) =>
                                            props.setInstallerName(
                                                event.target.value
                                            )
                                        }
                                        label="LCU Models"
                                    >
                                        {lcuModels?.map((lcu) => (
                                            <MenuItem
                                                value={lcu.lcuUUID}
                                                key={lcu.lcuUUID}
                                            >
                                                {lcu.modelNumber} ({lcu.serialNumber})
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container xs={12} spacing={4}>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.textField}
                                    label="Number of Locations"
                                    value={numberOfLocations}
                                    onChange={(event) =>
                                        handleNumberOfLocationsChange(
                                            event.target.value
                                        )
                                    }
                                    variant="outlined"
                                    fullWidth
                                />
                                {locationsError && (
                                    <div className={classes.errorText}>
                                        Must be a number
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </div>
                    {locations.length > 0 && (
                        <React.Fragment>
                            {locations.map((location, index) => (
                                <div className={classes.formContainer}>
                                    <Grid container xs={12} spacing={5}>
                                        <Grid item xs={6}>
                                            <div className={classes.formHeader}>
                                                Location {index + 1} Details
                                            </div>
                                            <TextField
                                                className={classes.textField}
                                                label="Location name"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className={classes.formHeader}>
                                                Location Photo
                                            </div>
                                            <Grid container spacing={3}>
                                                <Button
                                                    className={
                                                        classes.photoUploadButton
                                                    }
                                                    variant="contained"
                                                    startIcon={
                                                        <ImageOutlinedIcon />
                                                    }
                                                    fullWidth
                                                >
                                                    Click here or drag and drop
                                                    photo
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={12} spacing={4}>
                                        <Grid item xs={6}>
                                            <Grid container xs={12} spacing={4}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        className={
                                                            classes.textField
                                                        }
                                                        label="Number of Smart Outlets"
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        className={
                                                            classes.textField
                                                        }
                                                        label="Max Volt-Amps"
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            ))}
                        </React.Fragment>
                    )}
                    <Grid
                        className={classes.headerContainer}
                        container
                        spacing={1}
                    >
                        <Grid item xs={11}>
                            <Button
                                fullWidth
                                variant="contained"
                                className={classes.createButton}
                                onClick={() => props.handleSubmitForInstallation([])}
                            >
                                Submit for Installation
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            )}
            {isLoading && (
                <div className="loaderContainer">
                    <CircularProgress />
                </div>
            )}
        </div>
    )
}
