import React, { useState } from 'react'
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
        }
        handleNext()
    }

    const handleSubmitForInstallation = () => {
        console.log('done')
        // setIsLoading(true)
        // if (props.token) {
        //     console.log(JSON.stringify(propertyInfo))
        //     fetch(API_URL + 'properties', {
        //         method: 'PUT',
        //         headers: {
        //             Authorization: 'Bearer ' + props.token,
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(propertyInfo),
        //     })
        //         .then((res) => res.json())
        //         .then(
        //             (result) => {
        //                 setPropertyUUID(result.propertyUUID)
        //                 setIsLoading(false)
        //                 handleComplete(propertyInfo)
        //             },
        //             (error) => {
        //                 setIsLoading(false)
        //             }
        //         )
        // }
    }

    const createProperty = (propertyInfo) => {
        setIsLoading(true)
        let formData = new FormData()
        for (let value in propertyInfo) {
            formData.append(value, propertyInfo[value])
        }
        console.log('formData object', formData)
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
                        console.log('new property id', result.propertyUUID)
                        handleComplete(propertyInfo)
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
        setIsLoading(true)
        if (props.token) {
            fetch(API_URL + 'properties/' + propertyUUID, {
                method: 'PUT',
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
                        handleComplete(propertyInfo)
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
        alert('Image added')
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
                        <Grid item xs={6}>
                            <span className={classes.firstHeader}>
                                Setup New Property |{' '}
                            </span>
                            <span>Step 1 Add Property Details</span>
                        </Grid>
                    </Grid>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel
                                    onClick={handleStep(index)}
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
                                // alert(JSON.stringify(values, null, 2))
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
                                        spacing={1}
                                    >
                                        <Grid item xs={6}>
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
                                        <Grid item xs={6}>
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
                                        spacing={1}
                                    >
                                        <Grid item xs={6}>
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
                                        <Grid item xs={6}>
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
                                        spacing={1}
                                    >
                                        <Grid item xs={12}>
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
                            <CircularProgress />
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
