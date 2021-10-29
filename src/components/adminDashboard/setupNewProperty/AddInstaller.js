import React, { useState, useEffect } from 'react'
import { API_URL } from './../../../constants'
import { API_URL_ADMIN } from './../../../constants'
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
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
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
        marginTop: '20px',
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
        marginTop: '20px',
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
}))

export default function AddInstaller(props) {
    const classes = useStyles()
    const [isLoading, setIsLoading] = useState(false)
    const [selectedInstaller, setSelectedInstaller] = useState('')
    const [installers, setInstallers] = useState([])

    const handleSelectInstaller = (installerId) => {
        setSelectedInstaller(installerId)
        console.log('selecting this installer', installerId)
        props.setInstallerName(installerId)
    }

    const getAllInstallers = () => {
        setIsLoading(true)
        if (props.token) {
            fetch(API_URL_ADMIN + 'admin/users?role=INSTALLER', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        console.log('all installers', result)
                        setIsLoading(false)
                        setInstallers(result)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const getAllLcus = () => {
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
                        console.log('here it is', result)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    useEffect(() => {
        getAllLcus()
        getAllInstallers()
    }, [])

    return (
        <div className={classes.root}>
            <Grid className={classes.headerContainer} container>
                <Grid item xs={6}>
                    <span className={classes.firstHeader}>
                        Setup New Property |{' '}
                    </span>
                    <span>Step 2 Add Installer</span>
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
                                onClick={props.handleBack}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.formContainer}>
                        <div className={classes.formHeader}>
                            Select Installer
                        </div>
                        <Grid container xs={12}>
                            <FormControl
                                fullWidth
                                variant="outlined"
                                className={classes.formControl}
                            >
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Company Installers
                                </InputLabel>
                                <Select
                                    fullWidth
                                    className={classes.textField}
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={selectedInstaller}
                                    onChange={(event) =>
                                        handleSelectInstaller(
                                            event.target.value,
                                        )
                                    }
                                    label="Company Installers"
                                >
                                    {installers?.map((installer) => (
                                        <MenuItem
                                            value={installer.cognitoUUID}
                                            key={installer.cognitoUUID}
                                        >
                                            {installer.email}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </div>
                    <Grid
                        className={classes.headerContainer}
                        container
                        spacing={1}
                    >
                        <Grid item xs={11}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => props.addInstaller()}
                                className={classes.createButton}
                            >
                                Create Property & Submit to Installer
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
