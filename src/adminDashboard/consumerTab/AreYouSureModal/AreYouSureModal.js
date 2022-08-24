import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Button,
    Modal,
    LoadingButton,
    CircularProgress,
} from '@material-ui/core'
import './../ConsumerTab.css'
import { API_URL_ADMIN } from './../../../constants'

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
    paper: {
        outline: 'none',
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    submit: {
        fontFamily: 'Nunito Sans, sans-serif !important',
        fontWeight: '900',
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#12BFA2',
        color: '#FFF',
        '&:hover': {
            backgroundColor: '#19937e',
            color: '#FFF',
        },
        borderRadius: '5px',
    },
    cancel: {
        fontFamily: 'Nunito Sans, sans-serif !important',
        fontWeight: '900',
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#5B5D60',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#000F20',
            color: '#FFFFFF',
        },
        borderRadius: '5px',
    },
}))

export default function AreYouSureModal(props) {
    const [modalStyle] = useState(getModalStyle)
    const classes = useStyles()
    const [isLoading, setIsLoading] = useState(false)
    const [modalHeader, setModalHeader] = useState('')
    const [modalDesc, setModalDesc] = useState('')
    const [modalButton, setModalButton] = useState('')

    const getModalHeader = (mode) => {
        if (mode === 'activate') {
            return 'Activating User'
        } else if (mode === 'reject') {
            return 'Rejecting User'
        } else {
            return 'Disabling User'
        }
    }

    const getModalDesc = (mode) => {
        if (mode === 'activate') {
            return 'Yes, I want to activate user:'
        } else if (mode === 'reject') {
            return 'Yes, I want to reject user:'
        } else {
            return 'Yes, I want to disable user:'
        }
    }

    const getModalButtonText = (mode) => {
        if (mode === 'activate') {
            return 'Yes - Activate User'
        } else if (mode === 'reject') {
            return 'Yes - reject User'
        } else {
            return 'Yes - disable User'
        }
    }

    const handleYesAction = () => {
        if (props.modalMode && props.userId) {
            setIsLoading(true)
            props.activateThisUser(setIsLoading, props.userRequest)
        }
    }

    useEffect(() => {
        if (props.modalMode) {
            setModalHeader(getModalHeader(props.modalMode))
            setModalDesc(getModalDesc(props.modalMode))
            setModalButton(getModalButtonText(props.modalMode))
        }
    }, [props.modalMode])

    const body = (
        <div
            style={modalStyle}
            className={'are-you-sure-modal ' + classes.paper}
        >
            <h2 id="simple-modal-title">{modalHeader}</h2>
            <div className="modal-desc">{modalDesc}</div>
            <div className="modal-user-info-container">
                <div className="modal-name">{props.userName}</div>
                <div className="modal-name">{props.userEmail}</div>
            </div>
            <div id="simple-modal-description">
                <Grid container spacing={2}>
                    <Grid xs={6} item>
                        <Button
                            fullWidth
                            variant="contained"
                            className={classes.cancel}
                            onClick={props.handleClose}
                            disabled={isLoading}
                        >
                            No
                        </Button>
                    </Grid>
                    <Grid xs={6} item>
                        <Button
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            onClick={() => handleYesAction()}
                        >
                            {isLoading ? (
                                <CircularProgress
                                    style={{
                                        color: 'white',
                                        width: '23px',
                                        height: '23px',
                                    }}
                                />
                            ) : (
                                modalButton
                            )}
                        </Button>
                    </Grid>
                </Grid>
            </div>
            <AreYouSureModal />
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
            {/* <CircularProgress /> */}
        </Modal>
    )
}
