import React, { useState, useEffect } from 'react'
import { API_URL } from '../../constants'
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
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddInstaller from './AddInstaller'
import UpdateLcuAndLocation from './UpdateLcuAndLocation'

const useStyles = makeStyles((theme) => ({
    stepperCustom: {
        marginLeft: '3%',
    },
    root: {
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
    const classes = useStyles()
    const [isLoading, setIsLoading] = useState(false)
    const [activeStep, setActiveStep] = React.useState(0)
    const [installerName, setInstallerName] = React.useState('')
    const [completed, setCompleted] = React.useState({})
    const [newPropertyName, setNewPropertyName] = React.useState('')
    const [newPropertyAdminName, setNewPropertyAdminName] = React.useState('')
    const [propertyUUID, setPropertyUUID] = React.useState()
    const [newPropertyAddress, setNewPropertyAddress] = React.useState('')
    const [photoAdded, setPhotoAdded] = React.useState(false)
    const [photoFile, setPhotoFile] = React.useState(null)
    const [photoBinary, setPhotoBinary] = React.useState(null)
    const [photoFileName, setPhotoFileName] = React.useState('')
    const [propertyInfo, setPropertyInfo] = React.useState({})
    const allStates = getAllStates()

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

    const handleComplete = (formValues) => {
        const newCompleted = completed
        newCompleted[activeStep] = true
        setCompleted(newCompleted)
        console.log('here you go', formValues)
        if (activeStep === 0) {
            setPropertyInfo(formValues)
            setNewPropertyName(formValues.name)
            setNewPropertyAdminName(formValues.contactName)
            setNewPropertyAddress(
                formValues.address1 +
                    ', ' +
                    formValues.city +
                    ', ' +
                    formValues.state +
                    ' ' +
                    formValues.zipcode
            )
        } else {
            setPropertyInfo(formValues)
        }
        handleNext()
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

    const createSmartOutlets = (amountOfOutlets, locationId) => {
        console.log('this is the amount of outlets', amountOfOutlets)
        console.log('locationId', locationId)
        for (var i = 0; i < amountOfOutlets; i++) {
            setIsLoading(true)
            let locationObject = {
                locationUUID: locationId,
                model: 'Proto X0-Frank',
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
            maxVoltAmps: location.maxVoltAmps,
            name: location.name,
            propertyUUID: propertyUUID,
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
                        props.goToProperties()
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const createLcu = (
        lcuName,
        lcuModel,
        locations,
        photoBinaries,
        amountOfSmartOutlets
    ) => {
        setIsLoading(true)
        let lcuObject = {
            modelNumber: lcuModel,
            name: lcuName,
        }
        if (props.token) {
            fetch(API_URL + 'lcus', {
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
                        setIsLoading(false)
                        console.log('created lcu successfully', result)
                        locations.forEach((location, index) => {
                            createLocation(
                                result.lcuUUID,
                                location,
                                photoBinaries,
                                index,
                                amountOfSmartOutlets
                            )
                        })
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const handleSubmitForInstallation = (
        lcuName,
        lcuModel,
        locations,
        photoBinaries,
        amountOfSmartOutlets
    ) => {
        console.log('lcuName', lcuName)
        console.log('lcuModel', lcuModel)
        console.log('locations', locations)
        console.log('photoBinaries', photoBinaries)
        console.log('amountOfSmartOutlets', amountOfSmartOutlets)
        createLcu(
            lcuName,
            lcuModel,
            locations,
            photoBinaries,
            amountOfSmartOutlets
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

    const uploadPropertyImg = (propertyId, thisPropertyInfo) => {
        setIsLoading(true)
        if (props.token) {
            fetch(API_URL + 'properties-image/' + propertyId, {
                method: 'PUT',
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
                        console.log('here image result', result)
                        handleComplete(thisPropertyInfo)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const createProperty = (propertyInfo) => {
        console.log(
            'step 1. Property is being created.' + JSON.stringify(propertyInfo)
        )
        setIsLoading(true)
        if (props.token) {
            console.log(JSON.stringify(propertyInfo))
            fetch(API_URL + 'properties', {
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
                        setIsLoading(false)
                        if (photoFile) {
                            uploadPropertyImg(result.propertyUUID, propertyInfo)
                        } else {
                            handleComplete(propertyInfo)
                        }
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const addInstaller = () => {
        let tempPropertyInfo = propertyInfo
        tempPropertyInfo.installerUUID = installerName
        console.log(
            'step 2. Installer being added.' + JSON.stringify(tempPropertyInfo)
        )
        setPropertyInfo(tempPropertyInfo)
        setIsLoading(true)
        if (props.token) {
            fetch(API_URL + 'properties/' + propertyUUID, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempPropertyInfo),
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        setPropertyUUID(result.propertyUUID)
                        setIsLoading(false)
                        handleComplete(tempPropertyInfo)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
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

    const handlePhotoChange = (e) => {
        if (e.target.files.length) {
            //   setImage({
            //     preview: URL.createObjectURL(e.target.files[0]),
            //     raw: e.target.files[0]
            //   });
        }
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

    const parseAndHandleChange = (value, setFieldValue, id) => {
        const parsed = parseInt(value)
        setFieldValue(id, parsed)
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        address1: Yup.string().required(),
        city: Yup.string().required(),
        state: Yup.string().required(),
        zipcode: Yup.string().required(),
        contactEmail: Yup.string().required(),
        contactName: Yup.string().required(),
        contactPhone1: Yup.string().required(),
        maxVoltAmps: Yup.string().required(),
    })

    const initialValues = {
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
        pictureUrl1:
            'https://images1.apartments.com/i2/i4D0nFh0v5R9HeXnm7lA1l9lG2yR-94eCx7kGtYCvBM/117/boulders-at-overland-park-overland-park-ks-building-photo.jpg',
        state: '',
        status: 'NEW',
        updatedAt: '',
        zipcode: '',
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
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                createProperty(values)
                            }}
                        >
                            {(props) => (
                                <Form
                                    onSubmit={props.handleSubmit}
                                    autocomplete="on"
                                >
                                    <Grid
                                        className={classes.headerContainer}
                                        container
                                        spacing={3}
                                    >
                                        <Grid item lg={6} md={12} sm={12}>
                                            <div
                                                className={
                                                    classes.formContainer
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes.formHeader
                                                    }
                                                >
                                                    Property Details*
                                                </div>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            name="name"
                                                            onChange={
                                                                props.handleChange
                                                            }
                                                            onBlur={
                                                                props.handleBlur
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
                                                            name="address1"
                                                            onChange={
                                                                props.handleChange
                                                            }
                                                            onBlur={
                                                                props.handleBlur
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
                                                            name="city"
                                                            onChange={
                                                                props.handleChange
                                                            }
                                                            onBlur={
                                                                props.handleBlur
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
                                                            <InputLabel id="demo-simple-select-filled-label">
                                                                State
                                                            </InputLabel>
                                                            <Select
                                                                className={
                                                                    classes.textField
                                                                }
                                                                label="State"
                                                                variant="outlined"
                                                                fullWidth
                                                                labelId="demo-simple-select-filled-label"
                                                                name="state"
                                                                onChange={
                                                                    props.handleChange
                                                                }
                                                                onBlur={
                                                                    props.handleBlur
                                                                }
                                                            >
                                                                {allStates.map(
                                                                    (
                                                                        item,
                                                                        index
                                                                    ) => (
                                                                        <MenuItem
                                                                            value={
                                                                                item.name
                                                                            }
                                                                            key={
                                                                                index
                                                                            }
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
                                                            name="zipcode"
                                                            onChange={
                                                                props.handleChange
                                                            }
                                                            onBlur={
                                                                props.handleBlur
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
                                            <div
                                                className={
                                                    classes.formContainer
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes.formHeader
                                                    }
                                                >
                                                    Contact Information
                                                </div>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            name="contactName"
                                                            onChange={
                                                                props.handleChange
                                                            }
                                                            onBlur={
                                                                props.handleBlur
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
                                                            name="contactPhone1"
                                                            onChange={
                                                                props.handleChange
                                                            }
                                                            onBlur={
                                                                props.handleBlur
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
                                                            name="contactPhone2"
                                                            onChange={
                                                                props.handleChange
                                                            }
                                                            onBlur={
                                                                props.handleBlur
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
                                                            name="contactEmail"
                                                            onChange={
                                                                props.handleChange
                                                            }
                                                            onBlur={
                                                                props.handleBlur
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
                                            <div
                                                className={
                                                    classes.formContainer
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes.formHeader
                                                    }
                                                >
                                                    Electric Details
                                                </div>

                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            name="maxVoltAmps"
                                                            onChange={(e) =>
                                                                parseAndHandleChange(
                                                                    e.target
                                                                        .value,
                                                                    props.setFieldValue,
                                                                    'maxVoltAmps'
                                                                )
                                                            }
                                                            onBlur={
                                                                props.handleBlur
                                                            }
                                                            className={
                                                                classes.textField
                                                            }
                                                            label="Property Max Volt-Amps"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            name="maxAmps"
                                                            onChange={(e) =>
                                                                parseAndHandleChange(
                                                                    e.target
                                                                        .value,
                                                                    props.setFieldValue,
                                                                    'maxAmps'
                                                                )
                                                            }
                                                            onBlur={
                                                                props.handleBlur
                                                            }
                                                            className={
                                                                classes.textField
                                                            }
                                                            label="Property Max Amps"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>
                                        <Grid item lg={6} md={12} sm={12}>
                                            <div
                                                className={
                                                    classes.formContainerPhoto
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes.formHeader
                                                    }
                                                >
                                                    Property Photo
                                                </div>
                                                <Grid container spacing={3}>
                                                    {!photoAdded && (
                                                        <Button
                                                            className={
                                                                classes.photoUploadButton
                                                            }
                                                            variant="contained"
                                                            onClick={
                                                                handlePhotoClick
                                                            }
                                                            onDragOver={
                                                                dragOver
                                                            }
                                                            onDragEnter={
                                                                dragEnter
                                                            }
                                                            onDragLeave={
                                                                dragLeave
                                                            }
                                                            onDrop={fileDrop}
                                                            startIcon={
                                                                <ImageOutlinedIcon />
                                                            }
                                                            fullWidth
                                                        >
                                                            Click here or drag
                                                            and drop photo
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
                                                                    marginRight:
                                                                        '10px',
                                                                    color:
                                                                        green[500],
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
                                                        onChange={
                                                            handlePhotoChange
                                                        }
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
                                            <div
                                                className={
                                                    classes.formContainerNotes
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes.formHeader
                                                    }
                                                >
                                                    Property Notes
                                                </div>
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <TextField
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
                                        <Grid
                                            item
                                            lg={6}
                                            md={12}
                                            sm={12}
                                        ></Grid>
                                    </Grid>
                                    <Grid
                                        className={classes.headerContainer}
                                        container
                                        spacing={1}
                                    >
                                        <Grid item xs={11}>
                                            <Button
                                                type="submit"
                                                disabled={
                                                    !props.isValid ||
                                                    !props.dirty
                                                }
                                                fullWidth
                                                variant="contained"
                                                className={classes.createButton}
                                            >
                                                Continue & Select Installer
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
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
                        newPropertyAdminName={newPropertyAdminName}
                        newPropertyAddress={newPropertyAddress}
                        handleBack={handleBack}
                        addInstaller={addInstaller}
                        handleComplete={handleComplete}
                        installerName={installerName}
                        setInstallerName={setInstallerName}
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
                        newPropertyAdminName={newPropertyAdminName}
                        newPropertyAddress={newPropertyAddress}
                        installerName={installerName}
                        setInstallerName={setInstallerName}
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