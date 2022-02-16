import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { API_URL } from '../../../constants'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import './EditSmartOutletModal.css'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'
import moment from 'moment'

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
        position: 'absolute',
        width: 840,
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

export default function EditSmartOutletModal(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [serialNumber, setSerialNumber] = useState(
        props.outletData.serialNumber
    )
    const [firmware, setFirmware] = useState(props.outletData.fwVersion)
    const [hardware, setHardware] = useState(props.outletData.hwVersion)
    const [parkingSpot, setParkingSpot] = useState(props.outletData.parkingSpot)
    const [mac, setMac] = useState(props.outletData.macAddr)
    const [outletData, setOutletData] = useState(props.outletData)
    const [modalStyle] = useState(getModalStyle)
    const classes = useStyles()

    useEffect(() => {
        setOutletData(props.outletData)
        setFirmware(props.outletData.fwVersion)
        setHardware(props.outletData.hwVersion)
        setSerialNumber(props.outletData.serialNumber)
        setParkingSpot(props.outletData.parkingSpot)
        setMac(props.outletData.macAddr)
    }, [props.outletData])

    const saveOutletInfo = () => {
        setIsLoading(true)
        if (props.token) {
            fetch(API_URL + 'smart-outlets/' + outletData.soUUID, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(outletData),
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoading(false)
                        console.log('save outlet success', result)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const handleOutletFieldChange = (value, field) => {
        if (field === 'hwVersion') {
            setHardware(value)
        } else if (field === 'fwVersion') {
            setFirmware(value)
        } else if (field === 'serialNumber') {
            setSerialNumber(value)
        } else if (field === 'parkingSpot') {
            setParkingSpot(value)
        } else {
            setMac(value)
        }
        let tempOutlet = outletData
        tempOutlet[field] = value

        setOutletData(tempOutlet)
    }

    console.log('here it is', outletData)

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div id="simple-modal-description">
                {isLoading && (
                    <div className="loaderContainer">
                        <CircularProgress
                            style={{ color: '#12BFA2', marginBottom: '35px' }}
                        />
                    </div>
                )}
                {!isLoading && (
                    <Grid
                        container
                        xs={12}
                        spacing={2}
                        className="smartOutletEditDetails"
                    >
                        <Grid item xs={3}>
                            <div className="smartOutletGridHeader smartOutletGridItem">
                                Operational Status
                            </div>
                            <div className="smartOutletGridLocationHeaderSmall smartOutletGridItem">
                                {outletData?.status ?? '-'}
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="smartOutletGridHeader smartOutletGridItem">
                                Admin Status
                            </div>
                            <div className="smartOutletGridLocationHeaderSmall smartOutletGridItem">
                                {outletData?.adminStatus
                                    ?.charAt(0)
                                    .toUpperCase() +
                                    outletData?.adminStatus?.slice(1) ?? '-'}
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="smartOutletGFridHeader smartOutletGridItem">
                                Heartbeat
                            </div>
                            <div className="smartOutletGridLocationHeaderSmall smartOutletGridItem">
                                {moment(outletData?.lastHeartbeat).format(
                                    'MM/DD/YYYY, h:mm:ss a'
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="smartOutletGridHeader">
                                Installed
                            </div>
                            <div className="smartOutletGridLocationHeaderSmall">
                                {outletData?.installed ?? '-'}
                            </div>
                        </Grid>
                    </Grid>
                )}
                {!isLoading && (
                    <Grid container xs={12} spacing={3}>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                className="editableField"
                                id="parkingSpot"
                                label="Parking Spot"
                                variant="filled"
                                value={parkingSpot}
                                onChange={(e) =>
                                    handleOutletFieldChange(
                                        e.target.value,
                                        'parkingSpot'
                                    )
                                }
                                onBlur={() => saveOutletInfo()}
                                InputProps={{
                                    endAdornment: <EditOutlinedIcon />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                className="editableField"
                                id="parkingSpot"
                                label="Model"
                                disabled
                                variant="filled"
                                value={outletData?.model ?? '-'}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                className="editableField"
                                id="soMac"
                                label="MAC Address"
                                variant="filled"
                                value={mac}
                                onChange={(e) =>
                                    handleOutletFieldChange(
                                        e.target.value,
                                        'macAddr'
                                    )
                                }
                                onBlur={() => saveOutletInfo()}
                                InputProps={{
                                    endAdornment: <EditOutlinedIcon />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                className="editableField"
                                id="soSerial"
                                label="Serial Number"
                                variant="filled"
                                value={serialNumber}
                                onChange={(e) =>
                                    handleOutletFieldChange(
                                        e.target.value,
                                        'serialNumber'
                                    )
                                }
                                onBlur={() => saveOutletInfo()}
                                InputProps={{
                                    endAdornment: <EditOutlinedIcon />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                className="editableField"
                                id="soHwVersion"
                                label="Hardware Version"
                                variant="filled"
                                value={hardware}
                                onChange={(e) =>
                                    handleOutletFieldChange(
                                        e.target.value,
                                        'hwVersion'
                                    )
                                }
                                onBlur={() => saveOutletInfo()}
                                InputProps={{
                                    endAdornment: <EditOutlinedIcon />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                className="editableField"
                                id="soFwVersion"
                                label="Firmware Version"
                                variant="filled"
                                value={firmware}
                                onChange={(e) =>
                                    handleOutletFieldChange(
                                        e.target.value,
                                        'fwVersion'
                                    )
                                }
                                onBlur={() => saveOutletInfo()}
                                InputProps={{
                                    endAdornment: <EditOutlinedIcon />,
                                }}
                            />
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
