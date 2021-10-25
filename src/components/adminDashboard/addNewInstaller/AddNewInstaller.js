import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { API_URL_ADMIN } from './../../../constants'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import './AddNewInstaller.css'

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

export default function AddNewInstaller(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [userId, setUserId] = useState('')
    const [showNoInfoEnteredMessage, setShowNoInfoEnteredMessage] = useState(
        false
    )
    const [callFailedError, setCallFailedError] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const classes = useStyles()

    const addInstaller = () => {
        console.log('token stuff', props.token)
        if (userId.length === 0) {
            setShowNoInfoEnteredMessage(true)
            setShowSuccessMessage(false)
            setCallFailedError(false)
        } else {
            setShowNoInfoEnteredMessage(false)
            setIsLoading(true)
            let objectToSend = {
                email: userId,
                role: 'INSTALLER',
            }
            if (props.token) {
                fetch(API_URL_ADMIN + 'admin/set-user-role', {
                    method: 'PUT',
                    headers: {
                        Authorization: 'Bearer ' + props.token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(objectToSend),
                })
                    .then((res) => res.json())
                    .then(
                        (result) => {
                            console.log(result)
                            if (result.code) {
                                setIsLoading(false)
                                setCallFailedError(true)
                            } else {
                                setIsLoading(false)
                                setCallFailedError(false)
                                setShowSuccessMessage(true)
                            }
                        },
                        (error) => {
                            setIsLoading(false)
                        }
                    )
            }
        }
    }

    return (
        <div className={classes.root}>
            <React.Fragment>
                <Grid className={classes.headerContainer} container>
                    {!isLoading && (
                        <Grid item xs={6}>
                            <span className={classes.firstHeader}>
                                Create New Installer
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
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                                {showNoInfoEnteredMessage && (
                                    <div className="installerErrorMessageText">
                                        Please enter a proper user ID.
                                    </div>
                                )}
                                {showSuccessMessage && (
                                    <div className="installerSuccessrMessageText">
                                        Success!
                                    </div>
                                )}
                                {callFailedError && (
                                    <div className="installerErrorMessageText">
                                        Encountered an internal server error.
                                        Try again later.
                                    </div>
                                )}
                                <Button
                                    className="addInstallerButton"
                                    variant="contained"
                                    onClick={addInstaller}
                                >
                                    Assign Installer Role
                                </Button>
                            </div>
                        </Grid>
                    )}
                    {isLoading && (
                        <Grid item xs={12}>
                            <CircularProgress />
                        </Grid>
                    )}
                </Grid>
            </React.Fragment>
        </div>
    )
}
