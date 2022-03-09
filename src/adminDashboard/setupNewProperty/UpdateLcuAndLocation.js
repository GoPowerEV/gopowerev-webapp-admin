import React, { useState, useEffect } from 'react'
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    TextField,
    Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'
import LocationCardToCreate from './LocationCardToCreate'
import { API_URL_ADMIN } from '../../constants'

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
        fontFamily: 'Nunito Sans, sans-serif !important',
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

export default function UpdateLcuAndLocation(props) {
    const classes = useStyles()
    const [isLoading, setIsLoading] = useState(false)
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)
    const [numberOfLocations, setNumberOfLocations] = useState(1)
    const [locations, setLocations] = useState([])
    const [locationsError, setLocationsError] = useState(false)
    const [lcuName, setLcuName] = useState('')
    const [lcuModel, setLcuModel] = useState('LCU10')
    const [soModel, setSoModel] = useState(undefined)
    const [photoBinaries, setPhotoBinaries] = React.useState([])
    const [photoFileNames, setPhotoFileNames] = React.useState([])
    const [amountOfSmartOutlets, setAmountOfSmartOutlets] = React.useState([])
    const [voltAmpsErrors, setVoltAmpsErrors] = React.useState([])
    const [smartOutletsErrors, setSmartOutletsErrors] = React.useState([])
    const [locationsNamesErrors, setLocationsNamesErrors] = React.useState([])
    const [hasErrors, setHasErrors] = React.useState(false)
    const [models, setModels] = useState([])

    const sampleLocationObject = {
        description: '',
        lcuUUID: '',
        maxAmps: 0,
        maxVoltAmps: 0,
        name: '',
        pictureUrl1: '',
        propertyUUID: '',
    }

    const handleNumberOfLocationsChange = () => {
        let tempLocations = locations
        let tempSmartOutlets = amountOfSmartOutlets
        if (tempLocations.length === 10) {
            alert('10 is the max amount of locations allowed.')
        } else {
            tempLocations.push(sampleLocationObject)
            setLocations(tempLocations)
            setNumberOfLocations(tempLocations.length)
            tempSmartOutlets[tempSmartOutlets.length] = '1'
            setAmountOfSmartOutlets(tempSmartOutlets)
        }
    }

    const removeThisLocation = (index) => {
        let tempLocations = locations.splice(1, index)
        setLocations(tempLocations)
        setNumberOfLocations(tempLocations.length)
        // CLEANING UP VOLT AMP ERRORS
        let voltAmpsErrorsTemp = voltAmpsErrors
        if (voltAmpsErrors[index]) {
            voltAmpsErrorsTemp.splice(index, 1)
            setVoltAmpsErrors(voltAmpsErrorsTemp)
        }
        // CLEANING UP LOCATION ERRORS
        let locationsNamesErrorsTemp = locationsNamesErrors
        if (locationsNamesErrors[index]) {
            locationsNamesErrorsTemp.splice(index, 1)
            setLocationsNamesErrors(locationsNamesErrorsTemp)
        }
        // CLEANING UP SMART OUTLET ERRORS
        let smartOutletsErrorsTemp = smartOutletsErrors
        if (smartOutletsErrors[index]) {
            smartOutletsErrorsTemp.splice(index, 1)
            setSmartOutletsErrors(smartOutletsErrorsTemp)
        }
    }

    const handleLcuNameChange = (event) => {
        console.log('setting name to', event.target.value)
        setLcuName(event.target.value)
    }

    const handleThisLocationNameChange = (value, index) => {
        if (value && value.length > 0) {
            let tempLocations = locations
            tempLocations[index].name = value
            console.log('allTempLocations', tempLocations)
            setLocations(tempLocations)
            let tempErrors = locationsNamesErrors
            tempErrors[index] = null
            setLocationsNamesErrors(tempErrors)
        } else {
            let tempErrors = locationsNamesErrors
            tempErrors[index] = true
            setLocationsNamesErrors(tempErrors)
        }
    }

    const checkIfThereAreStillErrors = () => {
        let errorCount = 0
        smartOutletsErrors.forEach((value) => {
            if (value === true) {
                errorCount++
            }
        })

        voltAmpsErrors.forEach((value) => {
            if (value === true) {
                errorCount++
            }
        })

        locationsNamesErrors.forEach((value) => {
            if (value === true) {
                errorCount++
            }
        })

        if (!lcuName) {
            errorCount++
        }

        if (errorCount > 0) {
            setSubmitButtonDisabled(true)
            return true
        } else {
            setSubmitButtonDisabled(false)
            return false
        }
    }

    const handleThisLocationNumberOfSmartOutletsChange = (value, index) => {
        if (isNaN(Number(value))) {
            let tempErrors = smartOutletsErrors
            tempErrors[index] = true
            setSmartOutletsErrors(tempErrors)
            setHasErrors(true)
        } else if (Number(value) < 0 || Number(value) > 50) {
            let tempErrors = smartOutletsErrors
            tempErrors[index] = true
            setSmartOutletsErrors(tempErrors)
            setHasErrors(true)
        } else {
            let tempErrors = smartOutletsErrors
            tempErrors[index] = null
            setSmartOutletsErrors(tempErrors)
            let tempAmountOfSmartOutlets = amountOfSmartOutlets
            tempAmountOfSmartOutlets[index] = Number(value)
            setAmountOfSmartOutlets(tempAmountOfSmartOutlets)
        }
    }

    const handleThisLocationMaxVoltAmpsChange = (value, index) => {
        if (isNaN(Number(value))) {
            let tempErrors = voltAmpsErrors
            tempErrors[index] = true
            setVoltAmpsErrors(tempErrors)
            setHasErrors(true)
        } else if (Number(value) <= 0) {
            let tempErrors = voltAmpsErrors
            tempErrors[index] = true
            setVoltAmpsErrors(tempErrors)
            setHasErrors(true)
        } else {
            let tempErrors = voltAmpsErrors
            tempErrors[index] = false
            setVoltAmpsErrors(tempErrors)
            checkIfThereAreStillErrors()
            let tempLocations = locations
            tempLocations[index].maxVoltAmps = Number(value)
            console.log('allTempLocations', tempLocations)
            setLocations(tempLocations)
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

    const checkSmartOutlets = () => {
        let tempErrors = smartOutletsErrors
        amountOfSmartOutlets.forEach((outlet, index) => {
            if (outlet === 0 || outlet === null) {
                tempErrors[index] = true
                setHasErrors(true)
            } else {
                tempErrors[index] = null
            }
        })
        setLocationsNamesErrors(tempErrors)
        checkIfThereAreStillErrors()
    }

    const validateAndSubmit = () => {
        checkLocationsNames()
        checkSmartOutlets()
        checkIfThereAreStillErrors()
        if (!hasErrors && lcuName) {
            props.handleSubmitForInstallation(
                lcuName,
                lcuModel,
                locations,
                photoBinaries,
                amountOfSmartOutlets,
                soModel
            )
        } else {
            document.querySelector('body').scrollTo(0, 0)
        }
    }

    useEffect(() => {
        let tempLocations = locations
        for (let i = 0; i < 1; i++) {
            tempLocations.push(sampleLocationObject)
        }
        setLocations(tempLocations)
        setNumberOfLocations(1)
        // GET SO MODELS
        if (props.token) {
            setIsLoading(true)
            fetch(API_URL_ADMIN + 'admin/so-model', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        let allModels = []
                        result.forEach((element) => {
                            const tempModel = {
                                label: element.model,
                                value: element.model,
                            }
                            allModels.push(tempModel)
                        })
                        setModels(allModels)
                        setIsLoading(false)
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
                                    value={lcuName}
                                    onChange={handleLcuNameChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.textField}
                                    label="LCU Model"
                                    variant="outlined"
                                    value={lcuModel}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        <Grid container xs={12} spacing={4}>
                            <Grid item xs={6}>
                                <TextField
                                    className={classes.textField}
                                    label="Number of Locations"
                                    value={numberOfLocations}
                                    variant="outlined"
                                    fullWidth
                                    disabled
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
                                <LocationCardToCreate
                                    handleThisLocationNameChange={
                                        handleThisLocationNameChange
                                    }
                                    amountOfSmartOutlets={amountOfSmartOutlets}
                                    locationsNamesErrors={locationsNamesErrors}
                                    removeThisLocation={removeThisLocation}
                                    index={index}
                                    location={location}
                                    setPhotoFileNames={setPhotoFileNames}
                                    getBinaryFromImg={getBinaryFromImg}
                                    photoFileNames={photoFileNames}
                                    smartOutletsErrors={smartOutletsErrors}
                                    handleThisLocationMaxVoltAmpsChange={
                                        handleThisLocationMaxVoltAmpsChange
                                    }
                                    voltAmpsErrors={voltAmpsErrors}
                                    handleThisLocationNumberOfSmartOutletsChange={
                                        handleThisLocationNumberOfSmartOutletsChange
                                    }
                                    setSoModel={setSoModel}
                                    soModel={soModel}
                                    models={models}
                                    setIsLoading={setIsLoading}
                                />
                            ))}
                        </React.Fragment>
                    )}
                    <Grid
                        className={classes.headerContainer}
                        container
                        spacing={1}
                    >
                        <Grid item xs={7}>
                            <Button
                                fullWidth
                                variant="contained"
                                className={classes.createButton}
                                onClick={() => handleNumberOfLocationsChange()}
                            >
                                Add New Location
                            </Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button
                                fullWidth
                                variant="contained"
                                className={classes.createButton}
                                disabled={submitButtonDisabled}
                                onClick={() => validateAndSubmit()}
                            >
                                Create Property
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            )}
            {isLoading && (
                <div className="loaderContainer">
                    <CircularProgress style={{ color: '#12BFA2' }} />
                </div>
            )}
        </div>
    )
}
