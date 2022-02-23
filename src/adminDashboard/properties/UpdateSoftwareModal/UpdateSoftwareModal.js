import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { API_URL_ADMIN } from '../../../constants'
import Modal from '@material-ui/core/Modal'
import { Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import './UpdateSoftwareModal.css'
import CircularProgress from '@material-ui/core/CircularProgress'

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
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '10px',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#12BFA2',
        color: '#FFF',
        '&:hover': {
            backgroundColor: '#53BCF9',
            color: '#FFF',
        },
        borderRadius: '5px',
    },
    cancel: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#FFF',
        color: '#000000',
        '&:hover': {
            backgroundColor: '#FFFFFF',
            color: '#000000',
        },
        borderRadius: '5px',
    },
}))

export default function UpdateSoftwareModal(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [modalStyle] = useState(getModalStyle)
    const [soModels, setSoModels] = useState([])
    const classes = useStyles()

    const updateThisModel = (model) => {
        setIsLoading(true)
        if (props.token) {
            let objectToSend = {
                modelName: model,
                propertyUUID: props.propertyUUID,
            }
            fetch(API_URL_ADMIN + 'admin/trigger-so-update', {
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
                        if (result.code) {
                            setIsLoading(false)
                        } else {
                            setIsLoading(false)
                        }
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className="outletModalHeader">
                Select Outlet Type To Update:
            </div>
            <div id="simple-modal-description">
                {isLoading && (
                    <div className="loaderContainer">
                        <CircularProgress
                            style={{ color: '#12BFA2', marginBottom: '35px' }}
                        />
                    </div>
                )}
                {!isLoading && soModels?.length > 0 && (
                    <Grid container xs={12} spacing={2}>
                        <hr className="soHr" />
                        {soModels.map((model) => (
                            <>
                                <Grid item xs={9}>
                                    <div className="soModel">{model.model}</div>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button
                                        className="updateSoButton"
                                        onClick={() =>
                                            updateThisModel(model.model)
                                        }
                                    >
                                        Update
                                    </Button>
                                </Grid>
                                <hr className="soHr" />
                            </>
                        ))}
                    </Grid>
                )}
            </div>
        </div>
    )

    useEffect(() => {
        setIsLoading(true)
        if (props.token) {
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
                        setIsLoading(false)
                        console.log('here  !!! so models', result)
                        setSoModels(result)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }, [])

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    )
}
