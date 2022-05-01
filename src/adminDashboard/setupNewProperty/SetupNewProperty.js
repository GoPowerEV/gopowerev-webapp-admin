import React, { useState, useEffect } from 'react'
import { API_URL, API_URL_ADMIN } from '../../constants'
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
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined'
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined'
import { getAllStates } from './../properties/utils/PropertyUtils'
import { green } from '@material-ui/core/colors'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddInstaller from './AddInstaller'
import UpdateLcuAndLocation from './UpdateLcuAndLocation'

const useStyles = makeStyles((theme) => ({
    stepperCustom: {
        marginLeft: '3%',
    },
    root: {
        fontFamily: 'Nunito Sans, sans-serif !important',
        width: '94%',
        '@media (max-width: 1200px)': {
            width: '90%',
        },
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
    secondHeader: {
        color: 'black',
    },
    formContainer: {
        padding: '35px',
        borderRadius: '15px',
        backgroundColor: '#F6F6F6',
    },
    formContainerPhoto: {
        height: '181px',
        padding: '35px',
        borderRadius: '15px',
        backgroundColor: '#F6F6F6',
    },
    formContainerNotes: {
        height: '181px',
        padding: '35px',
        borderRadius: '15px',
        backgroundColor: '#F6F6F6',
    },
    textField: {
        backgroundColor: '#FFFFFF',
    },
    formHeader: {
        color: 'black',
        marginBottom: '20px',
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
        marginTop: '15px',
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
        width: '300px',
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
    photoSelectedName: {
        marginTop: '20px',
        marginLeft: '10px',
        fontSize: '18px',
    },
}))

function getSteps() {
    return ['', '', '']
}

export default function SetupNewProperty(props) {
    const formInitialValues = {
        address1: '',
        address2: '',
        city: '',
        contactEmail: '',
        contactName: '',
        contactPhone1: '',
        contactPhone2: '',
        createdAt: '',
        // installerUUID: '',
        maxAmps: 0,
        maxVoltAmps: 0,
        name: '',
        pictureUrl1: '',
        state: '',
        status: 'NEW',
        updatedAt: '',
        zipcode: '',
    }
    const classes = useStyles()
    const [isLoading, setIsLoading] = useState(false)
    const [
        disableSelectInstallerButton,
        setDisableSelectInstallerButton,
    ] = useState(true)
    const [activeStep, setActiveStep] = React.useState(0)
    const [installerUuid, setInstallerUuid] = React.useState('')
    const [installerName, setInstallerName] = React.useState('')
    const [completed, setCompleted] = React.useState({})
    const [propertyUUID, setPropertyUUID] = React.useState()
    const [newPropertyAddress, setNewPropertyAddress] = React.useState('')
    const [photoAdded, setPhotoAdded] = React.useState(false)
    const [photoFile, setPhotoFile] = React.useState(null)
    const [photoBinary, setPhotoBinary] = React.useState(null)
    const [photoFileName, setPhotoFileName] = React.useState('')
    const [propertyInfo, setPropertyInfo] = React.useState(formInitialValues)
    const allStates = getAllStates()
    // FIELD VARIABLES
    const [newPropertyName, setNewPropertyName] = React.useState('')
    const [newPropertyStreet, setNewPropertyStreet] = React.useState('')
    const [newPropertyCity, setNewPropertyCity] = React.useState('')
    const [newPropertyState, setNewPropertyState] = React.useState()
    const [newPropertyZip, setNewPropertyZip] = React.useState()
    const [newPropertyManageName, setNewPropertyManageName] = React.useState('')
    const [newPropertyOfficePhone, setNewPropertyOfficePhone] = React.useState(
        ''
    )
    const [newPropertyCell, setNewPropertyCell] = React.useState('')
    const [newPropertyEmail, setNewPropertyEmail] = React.useState('')
    const [
        newPropertyMaxVoltAmpsBlack,
        setNewPropertyMaxVoltAmpsBlack,
    ] = React.useState('')
    const [
        newPropertyMaxVoltAmpsBlue,
        setNewPropertyMaxVoltAmpsBlue,
    ] = React.useState('')
    const [
        newPropertyMaxVoltAmpsRed,
        setNewPropertyMaxVoltAmpsRed,
    ] = React.useState('')
    const [newPropertyNotes, setNewPropertyNotes] = React.useState('')

    const steps = getSteps()

    const totalSteps = () => {
        return steps.length
    }

    const completedSteps = () => {
        return Object.keys(completed).length
    }

    const isLastStep = () => {
        return activeStep === totalSteps() - 1
    }

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps()
    }

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                  steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1
        setActiveStep(newActiveStep)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleTwoBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 2)
    }

    const handleStep = (step) => () => {
        setActiveStep(step)
    }

    const handleCompleteFirstStep = (formValues) => {
        const newCompleted = completed
        newCompleted[activeStep] = true
        setCompleted(newCompleted)
        setNewPropertyAddress(
            formValues.address1 +
                ', ' +
                formValues.city +
                ', ' +
                formValues.state +
                ' ' +
                formValues.zipcode
        )

        handleNext()
    }

    const handleCompleteSecondStep = (formValues) => {
        const newCompleted = completed
        newCompleted[activeStep] = true
        setCompleted(newCompleted)
        handleNext()
    }

    const validateFirstStep = () => {
        if (
            newPropertyName &&
            newPropertyStreet &&
            newPropertyCity &&
            newPropertyState &&
            newPropertyZip &&
            newPropertyManageName &&
            newPropertyOfficePhone &&
            newPropertyEmail &&
            newPropertyMaxVoltAmpsBlack &&
            newPropertyMaxVoltAmpsBlue &&
            newPropertyMaxVoltAmpsRed
        ) {
            setDisableSelectInstallerButton(false)
        } else {
            setDisableSelectInstallerButton(true)
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

    useEffect(() => {
        if (props.token) {
            fetch(API_URL + 'smart-outlets', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then(
                    async (result) => {
                        setIsLoading(false)
                        console.log('listOfSmartOutlets', result)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }, [])

    useEffect(() => {
        document.querySelector('body').scrollTo(0, 0)
    }, [activeStep])

    const createSmartOutlets = (amountOfOutlets, locationId, soModel) => {
        console.log('this is the amount of outlets', amountOfOutlets)
        console.log('locationId', locationId)
        for (var i = 0; i < amountOfOutlets; i++) {
            setIsLoading(true)
            let locationObject = {
                locationUUID: locationId,
                model: soModel,
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

    const createLocation = async (
        lcuId,
        location,
        photoBinaries,
        index,
        amountOfSmartOutlets,
        propertyId,
        soModel
    ) => {
        let locationId = null
        setIsLoading(true)
        let locationObject = {
            lcuUUID: lcuId,
            maxVoltAmps: location.maxVoltAmps,
            name: location.name,
            propertyUUID: propertyId,
        }
        if (props.token) {
            await fetch(API_URL + 'locations', {
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
                        setIsLoading(true)
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
                                locationId,
                                soModel
                            )
                        }
                        setIsLoading(false)
                        props.goToProperties()
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const createLcu = async (
        lcuName,
        lcuModel,
        locations,
        photoBinaries,
        amountOfSmartOutlets,
        propertyUUID,
        soModel
    ) => {
        setIsLoading(true)
        let lcuObject = {
            modelNumber: lcuModel,
            name: lcuName,
        }
        if (props.token) {
            await fetch(API_URL + 'lcus', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(lcuObject),
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoading(true)
                        locations.forEach((location, index) => {
                            createLocation(
                                result.lcuUUID,
                                location,
                                photoBinaries,
                                index,
                                amountOfSmartOutlets,
                                propertyUUID,
                                soModel
                            )
                        })
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const handleSubmitForInstallation = async (
        lcuName,
        lcuModel,
        locations,
        photoBinaries,
        amountOfSmartOutlets,
        soModel
    ) => {
        // console.log('here lcuName', lcuName)
        // console.log('here lcuModel', lcuModel)
        // console.log('lhere ocations', locations)
        // console.log('here photoBinaries', photoBinaries)
        // console.log('here amountOfSmartOutlets', amountOfSmartOutlets)
        setIsLoading(true)
        await fetch(API_URL + 'properties', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(propertyInfo),
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setPropertyUUID(result.propertyUUID)
                    if (photoFile) {
                        uploadPropertyImg(result.propertyUUID, propertyInfo)
                    }
                    createLcu(
                        lcuName,
                        lcuModel,
                        locations,
                        photoBinaries,
                        amountOfSmartOutlets,
                        result.propertyUUID,
                        soModel
                    )
                },
                (error) => {}
            )
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

    const uploadPropertyImg = (propertyId) => {
        setIsLoading(true)
        fetch(API_URL_ADMIN + 'api/property/image/hero/' + propertyId, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'image/jpg',
            },
            body: photoBinary,
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoading(false)
                },
                (error) => {
                    setIsLoading(false)
                }
            )
    }

    const goToStepTwo = () => {
        handleCompleteFirstStep(propertyInfo)
    }

    const addInstaller = () => {
        let tempPropertyInfo = propertyInfo
        tempPropertyInfo.installerUUID = installerUuid
        setPropertyInfo(tempPropertyInfo)
        handleCompleteSecondStep(tempPropertyInfo)
        console.log(
            'here step 2. Installer being added.' +
                JSON.stringify(tempPropertyInfo)
        )
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

    const handlePhotoChange = (event) => {
        event.preventDefault()
        const files = event.target.files
        setPhotoAdded(true)
        setPhotoFile(files[0])
        getBinaryFromImg(files[0])
        setPhotoFileName(files[0].name)
    }

    const fileDrop = (e) => {
        e.preventDefault()
        const files = e.dataTransfer.files
        setPhotoAdded(true)
        setPhotoFile(files[0])
        getBinaryFromImg(files[0])
        setPhotoFileName(files[0].name)
    }

    const hiddenFileInput = React.useRef(null)

    const handlePhotoClick = (event) => {
        hiddenFileInput.current.click()
    }

    const handleFormChange = (fieldType, value) => {
        let tempPropertyInfo = propertyInfo
        if (fieldType === 'name') {
            setNewPropertyName(value)
            propertyInfo.name = value
        } else if (fieldType === 'street') {
            setNewPropertyStreet(value)
            propertyInfo.address1 = value
        } else if (fieldType === 'city') {
            setNewPropertyCity(value)
            propertyInfo.city = value
        } else if (fieldType === 'state') {
            setNewPropertyState(value)
            propertyInfo.state = value
        } else if (fieldType === 'zip') {
            setNewPropertyZip(value)
            propertyInfo.zipcode = value
        } else if (fieldType === 'managerName') {
            setNewPropertyManageName(value)
            propertyInfo.contactName = value
        } else if (fieldType === 'officePhone') {
            setNewPropertyOfficePhone(value)
            propertyInfo.contactPhone1 = value
        } else if (fieldType === 'cell') {
            setNewPropertyCell(value)
            propertyInfo.contactPhone2 = value
        } else if (fieldType === 'email') {
            setNewPropertyEmail(value)
            propertyInfo.contactEmail = value
        } else if (fieldType === 'maxAmpsBlack') {
            setNewPropertyMaxVoltAmpsBlack(value)
            propertyInfo.maxAmpsBlack = value
        } else if (fieldType === 'maxAmpsBlue') {
            setNewPropertyMaxVoltAmpsBlue(value)
            propertyInfo.maxAmpsRed = value
        } else if (fieldType === 'maxAmpsRed') {
            setNewPropertyMaxVoltAmpsRed(value)
            propertyInfo.maxAmpsRed = value
        } else {
            setNewPropertyNotes(value)
            propertyInfo.detail = value
        }
        setPropertyInfo(tempPropertyInfo)
        validateFirstStep()
    }

    return (
        <div className={classes.root}>
            {activeStep === 0 && (
                <React.Fragment>
                    <Grid className={classes.headerContainer} container>
                        <Grid item xs={12}>
                            <span className={classes.firstHeader}>
                                Setup New Property |{' '}
                            </span>
                            <span className={classes.secondHeader}>
                                Step 1 Add Property Details
                            </span>
                        </Grid>
                    </Grid>
                    <Stepper
                        nonLinear
                        activeStep={activeStep}
                        className={classes.stepperCustom}
                    >
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel
                                    completed={completed[index]}
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
                        <React.Fragment>
                            <Grid
                                className={classes.headerContainer}
                                container
                                spacing={3}
                            >
                                <Grid item lg={6} md={12} sm={12}>
                                    <div className={classes.formContainer}>
                                        <div className={classes.formHeader}>
                                            Property Details*
                                        </div>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    value={newPropertyName}
                                                    onChange={(e) =>
                                                        handleFormChange(
                                                            'name',
                                                            e.target.value
                                                        )
                                                    }
                                                    className={
                                                        classes.textField
                                                    }
                                                    label="Add Property name"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    value={newPropertyStreet}
                                                    onChange={(e) =>
                                                        handleFormChange(
                                                            'street',
                                                            e.target.value
                                                        )
                                                    }
                                                    className={
                                                        classes.textField
                                                    }
                                                    label="Street"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    value={newPropertyCity}
                                                    onChange={(e) =>
                                                        handleFormChange(
                                                            'city',
                                                            e.target.value
                                                        )
                                                    }
                                                    className={
                                                        classes.textField
                                                    }
                                                    label="City"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3}>
                                            <Grid item xs={6}>
                                                <FormControl
                                                    variant="filled"
                                                    fullWidth
                                                >
                                                    <InputLabel
                                                        style={{
                                                            marginTop: '-13px',
                                                        }}
                                                        id="demo-simple-select-filled-label"
                                                    >
                                                        State
                                                    </InputLabel>
                                                    <Select
                                                        className={
                                                            classes.textField
                                                        }
                                                        label="State"
                                                        value={newPropertyState}
                                                        variant="outlined"
                                                        fullWidth
                                                        labelId="demo-simple-select-filled-label"
                                                        name="state"
                                                        onChange={(e) =>
                                                            handleFormChange(
                                                                'state',
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {allStates.map(
                                                            (item, index) => (
                                                                <MenuItem
                                                                    value={
                                                                        item.name
                                                                    }
                                                                    key={index}
                                                                >
                                                                    <em
                                                                        className={
                                                                            classes.formControlState
                                                                        }
                                                                    >
                                                                        {
                                                                            item.abbreviation
                                                                        }
                                                                    </em>
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    value={newPropertyZip}
                                                    onChange={(e) =>
                                                        handleFormChange(
                                                            'zip',
                                                            e.target.value
                                                        )
                                                    }
                                                    className={
                                                        classes.textField
                                                    }
                                                    label="Zip"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item lg={6} md={12} sm={12}>
                                    <div className={classes.formContainer}>
                                        <div className={classes.formHeader}>
                                            Contact Information
                                        </div>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    value={
                                                        newPropertyManageName
                                                    }
                                                    onChange={(e) =>
                                                        handleFormChange(
                                                            'managerName',
                                                            e.target.value
                                                        )
                                                    }
                                                    label="Property Manager's Name"
                                                    className={
                                                        classes.textField
                                                    }
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    value={
                                                        newPropertyOfficePhone
                                                    }
                                                    onChange={(e) =>
                                                        handleFormChange(
                                                            'officePhone',
                                                            e.target.value
                                                        )
                                                    }
                                                    className={
                                                        classes.textField
                                                    }
                                                    label="Office Phone"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    value={newPropertyCell}
                                                    onChange={(e) =>
                                                        handleFormChange(
                                                            'cell',
                                                            e.target.value
                                                        )
                                                    }
                                                    className={
                                                        classes.textField
                                                    }
                                                    label="Cell Phone"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    value={newPropertyEmail}
                                                    onChange={(e) =>
                                                        handleFormChange(
                                                            'email',
                                                            e.target.value
                                                        )
                                                    }
                                                    className={
                                                        classes.textField
                                                    }
                                                    label="Email Address"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.headerContainer}
                                container
                                spacing={3}
                            >
                                <Grid item lg={6} md={12} sm={12}>
                                    <div className={classes.formContainer}>
                                        <div className={classes.formHeader}>
                                            Electric Details
                                        </div>

                                        <Grid container spacing={3}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    value={
                                                        newPropertyMaxVoltAmpsBlack
                                                    }
                                                    onChange={(e) =>
                                                        handleFormChange(
                                                            'maxAmpsBlack',
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    className={
                                                        classes.textField
                                                    }
                                                    label="Property Black Max Volt-Amps"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    value={
                                                        newPropertyMaxVoltAmpsBlue
                                                    }
                                                    onChange={(e) =>
                                                        handleFormChange(
                                                            'maxAmpsBlue',
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    className={
                                                        classes.textField
                                                    }
                                                    label="Property Blue Max Volt-Amps"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    value={
                                                        newPropertyMaxVoltAmpsRed
                                                    }
                                                    onChange={(e) =>
                                                        handleFormChange(
                                                            'maxAmpsRed',
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    className={
                                                        classes.textField
                                                    }
                                                    label="Property Red Max Volt-Amps"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item lg={6} md={12} sm={12}>
                                    <div className={classes.formContainerPhoto}>
                                        <div className={classes.formHeader}>
                                            Property Photo
                                        </div>
                                        <Grid container spacing={3}>
                                            {!photoAdded && (
                                                <Button
                                                    className={
                                                        classes.photoUploadButton
                                                    }
                                                    variant="contained"
                                                    onClick={handlePhotoClick}
                                                    onDragOver={dragOver}
                                                    onDragEnter={dragEnter}
                                                    onDragLeave={dragLeave}
                                                    onDrop={fileDrop}
                                                    startIcon={
                                                        <ImageOutlinedIcon />
                                                    }
                                                    fullWidth
                                                >
                                                    Click here or drag and drop
                                                    photo
                                                </Button>
                                            )}
                                            {photoAdded && (
                                                <div
                                                    className={
                                                        classes.photoSelectedName
                                                    }
                                                >
                                                    <DoneOutlineOutlinedIcon
                                                        style={{
                                                            marginRight: '10px',
                                                            color: green[500],
                                                        }}
                                                    />
                                                    Photo selected:
                                                    {photoFileName}
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
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid
                                className={classes.headerContainer}
                                container
                                spacing={3}
                            >
                                <Grid item lg={6} md={12} sm={12}>
                                    <div className={classes.formContainerNotes}>
                                        <div className={classes.formHeader}>
                                            Property Notes
                                        </div>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <TextField
                                                    value={newPropertyNotes}
                                                    onChange={(e) =>
                                                        handleFormChange(
                                                            'notes',
                                                            e.target.value
                                                        )
                                                    }
                                                    id="outlined-basic"
                                                    className={
                                                        classes.textField
                                                    }
                                                    label="Add Notes"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item lg={6} md={12} sm={12}></Grid>
                            </Grid>
                            <Grid
                                className={classes.headerContainer}
                                container
                                spacing={1}
                            >
                                <Grid item xs={11}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        className={classes.createButton}
                                        disabled={disableSelectInstallerButton}
                                        onClick={() => goToStepTwo()}
                                    >
                                        Continue & Select Installer
                                    </Button>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    )}
                    {isLoading && (
                        <div className="loaderContainer">
                            <CircularProgress style={{ color: '#12BFA2' }} />
                        </div>
                    )}
                </React.Fragment>
            )}
            {activeStep === 1 && (
                <React.Fragment>
                    <AddInstaller
                        steps={steps}
                        activeStep={activeStep}
                        handleStep={handleStep}
                        completed={completed}
                        newPropertyName={newPropertyName}
                        newPropertyAdminName={newPropertyManageName}
                        newPropertyAddress={newPropertyAddress}
                        handleBack={handleBack}
                        addInstaller={addInstaller}
                        handleComplete={handleCompleteSecondStep}
                        installerName={installerName}
                        setInstallerName={setInstallerName}
                        installerUuid={installerUuid}
                        setInstallerUuid={setInstallerUuid}
                        token={props.token}
                    />
                </React.Fragment>
            )}
            {activeStep === 2 && (
                <React.Fragment>
                    <UpdateLcuAndLocation
                        steps={steps}
                        activeStep={activeStep}
                        handleStep={handleStep}
                        completed={completed}
                        newPropertyName={newPropertyName}
                        newPropertyAdminName={newPropertyManageName}
                        newPropertyAddress={newPropertyAddress}
                        installerUuid={installerUuid}
                        setInstallerUuid={setInstallerUuid}
                        setInstallerName={setInstallerName}
                        installerName={installerName}
                        handleBack={handleBack}
                        handleTwoBack={handleTwoBack}
                        token={props.token}
                        handleSubmitForInstallation={
                            handleSubmitForInstallation
                        }
                    />
                </React.Fragment>
            )}
        </div>
    )
}
