import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { API_URL_ADMIN } from '../../constants'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import './AddNewInstaller.css'

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
        color: 'black !important',
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
}))

const allRoles = [
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Installer', value: 'INSTALLER' },
    { label: 'Property Manager', value: 'PROPERTY_MANAGER' },
    { label: 'Property Owner', value: 'PROPERTY_OWNER' },
]

export default function AddNewInstaller(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [userId, setUserId] = useState(undefined)
    const [role, setRole] = useState(undefined)
    const [showNoInfoEnteredMessage, setShowNoInfoEnteredMessage] = useState(
        false
    )
    const [callFailedError, setCallFailedError] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [disableButton, setdDisableButton] = useState(true)

    const classes = useStyles()

    const handleRoleChange = (value) => {
        setRole(value)
    }

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(
            'https://devapp.gopowerev.com/contractorSignUp/' + userId
        )
    }

    const sendInvite = () => {
        if (userId.length === 0) {
            setShowNoInfoEnteredMessage(true)
            setShowSuccessMessage(false)
            setCallFailedError(false)
        } else {
            setShowNoInfoEnteredMessage(false)
            setIsLoading(true)
            let objectToSend = {
                email: userId,
                role: role,
            }
            if (props.token) {
                fetch(API_URL_ADMIN + 'admin/invites', {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + props.token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(objectToSend),
                })
                    .then((res) => res.json())
                    .then(
                        (result) => {
                            console.log('here it is', result)
                            copyToClipBoard()
                            if (result.code) {
                                setIsLoading(false)
                                setCallFailedError(true)
                                setRole(undefined)
                            } else {
                                setRole(undefined)
                                setIsLoading(false)
                                setCallFailedError(false)
                                setShowSuccessMessage(true)
                                setTimeout(() => {
                                    setShowSuccessMessage(false)
                                }, 10000)
                            }
                        },
                        (error) => {
                            setIsLoading(false)
                        }
                    )
            }
        }
    }

    useEffect(() => {
        if (!userId || !role) {
            setdDisableButton(true)
        } else {
            setdDisableButton(false)
        }
    }, [userId, role])

    return (
        <div className={classes.root}>
            <React.Fragment>
                <Grid className={classes.headerContainer} container>
                    {!isLoading && (
                        <>
                            <Grid item xs={6}>
                                <span className={classes.firstHeader}>
                                    Add New Partner
                                </span>
                                <div className="addNewInstallerMainContainer">
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="userId"
                                        label="User Email"
                                        name="id"
                                        autoComplete="id"
                                        autoFocus
                                        value={userId}
                                        onChange={(e) =>
                                            setUserId(e.target.value)
                                        }
                                    />
                                    {showNoInfoEnteredMessage && (
                                        <div className="installerErrorMessageText">
                                            Please enter a proper user email.
                                        </div>
                                    )}
                                    <FormControl
                                        fullWidth
                                        className="editRoleContainer"
                                    >
                                        <InputLabel
                                            id="userRole"
                                            style={{ paddingLeft: '15px' }}
                                        >
                                            Role
                                        </InputLabel>
                                        <Select
                                            labelId="userRole"
                                            variant="outlined"
                                            id="userRole"
                                            value={role}
                                            onChange={(e) =>
                                                handleRoleChange(e.target.value)
                                            }
                                        >
                                            {allRoles?.map((role) => (
                                                <MenuItem value={role.value}>
                                                    {role.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Button
                                        className="addInstallerButton"
                                        variant="contained"
                                        disabled={disableButton}
                                        onClick={() => sendInvite()}
                                    >
                                        Send Invite
                                    </Button>
                                    <br />
                                    <Button
                                        className="addInstallerButton"
                                        variant="contained"
                                        onClick={() => copyToClipBoard()}
                                    >
                                        Copy Invite Link To Clipboard
                                    </Button>
                                    {showSuccessMessage && (
                                        <div className="installerSuccessrMessageText">
                                            Invite sent!
                                        </div>
                                    )}
                                    {callFailedError && (
                                        <div className="installerErrorMessageText">
                                            Encountered an internal server
                                            error. Try again later.
                                        </div>
                                    )}
                                    <div></div>
                                </div>
                            </Grid>
                        </>
                    )}
                    {isLoading && (
                        <Grid item xs={12}>
                            <CircularProgress style={{ color: '#12BFA2' }} />
                        </Grid>
                    )}
                </Grid>
            </React.Fragment>
        </div>
    )
}
