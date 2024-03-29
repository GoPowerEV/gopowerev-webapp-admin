import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { API_URL, API_URL_ADMIN } from '../../../constants'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import './AddNewSmartOutletModal.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

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
        width: 840,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        paddingTop: '55px',
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

export default function AddNewSmartOutletModal(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedModel, setSelectedModel] = useState(undefined)
    const [models, setModels] = useState([])
    const [soData, setSoData] = useState({
        locationUUID: props.createSmartOutletForThisLocation,
        model: 'Proto X2',
        installationState: 'powered',
    })
    const [modalStyle] = useState(getModalStyle)
    const classes = useStyles()

    const addNewSmartOutlet = () => {
        setIsLoading(true)
        if (props.token) {
            fetch(API_URL + 'smart-outlets', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(soData),
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        props.getSmartOutletData()
                        setIsLoading(false)
                        props.handleClose()
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const handleOutletTypeChange = (value) => {
        setSelectedModel(value)
        setSoData({
            locationUUID: props.createSmartOutletForThisLocation,
            model: value,
            installationState: 'powered',
        })
    }

    useEffect(() => {
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
                        if (result?.length > 0) {
                            let allModels = []
                            result.forEach((element) => {
                                const tempModel = {
                                    label: element.model,
                                    value: element.model,
                                }
                                allModels.push(tempModel)
                            })
                            console.log('here are all models', allModels)
                            setModels(allModels)
                        }
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }, [props.token])

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div id="simple-modal-description">
                {isLoading && (
                    <div className="loaderContainer">
                        <CircularProgress
                            style={{
                                color: '#12BFA2',
                                marginBottom: '35px',
                            }}
                        />
                    </div>
                )}
                {!isLoading && (
                    <Grid
                        container
                        xs={12}
                        spacing={1}
                        justify="center"
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                    >
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel
                                    id="model"
                                    style={{ paddingLeft: '15px' }}
                                >
                                    Model
                                </InputLabel>
                                <Select
                                    labelId="model"
                                    variant="outlined"
                                    id="model"
                                    value={selectedModel}
                                    onChange={(e) =>
                                        handleOutletTypeChange(e.target.value)
                                    }
                                >
                                    {models?.map((model) => (
                                        <MenuItem value={model.value}>
                                            {model.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid
                            container
                            xs={12}
                            spacing={1}
                            justify="center"
                            alignItems="center"
                            justifyContent="center"
                            direction="row"
                        >
                            <Grid item>
                                <Button
                                    className="addNewSOButton"
                                    variant="outlined"
                                    onClick={() => addNewSmartOutlet()}
                                >
                                    Add New Smart Outlet To This Location
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </div>
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
        </Modal>
    )
}
