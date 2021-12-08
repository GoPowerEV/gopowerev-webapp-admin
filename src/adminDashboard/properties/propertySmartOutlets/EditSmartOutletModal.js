import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import './EditSmartOutletModal.css'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
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
    const [outletData, setOutletData] = useState({})
    const [modalStyle] = useState(getModalStyle)
    const classes = useStyles()

    useEffect(() => {
        setOutletData(props.outletData)
    }, [props.outletData])

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div id="simple-modal-description">
                <Grid
                    container
                    xs={12}
                    spacing={2}
                    className="smartOutletEditDetails"
                >
                    <Grid item xs={3}>
                        <div className="smartOutletGridHeader smartOutletGridItem">
                            Smart Outlet <span>{props.outletIndex}</span>
                        </div>
                        <div className="smartOutletGridLocationHeader smartOutletGridItem">
                            Parking Spot: {outletData?.parkingSpot}
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className="smartOutletGridHeader smartOutletGridItem">
                            Operational Status
                        </div>
                        <div className="smartOutletGridLocationHeaderSmall smartOutletGridItem">
                            {outletData?.status ?? '-'}
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
                        <div className="smartOutletGridHeader">Installed</div>
                        <div className="smartOutletGridLocationHeaderSmall">
                            {outletData?.installed ?? '-'}
                        </div>
                    </Grid>
                </Grid>
                <Grid container xs={12} spacing={3}>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            id="filled-basic"
                            label="Property Name"
                            variant="filled"
                            value="Main Office"
                            InputProps={{
                                endAdornment: <EditOutlinedIcon />,
                            }}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            id="filled-basic"
                            label="MAC Address"
                            variant="filled"
                            value="XXXXXXXXXXXXXXXXXXX"
                            InputProps={{
                                endAdornment: <EditOutlinedIcon />,
                            }}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            id="filled-basic"
                            label="Hardware Version"
                            variant="filled"
                            value={outletData?.hwVersion}
                            InputProps={{
                                endAdornment: <EditOutlinedIcon />,
                            }}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            id="filled-basic"
                            label="Firmware Version"
                            variant="filled"
                            value={outletData?.fwVersion}
                            InputProps={{
                                endAdornment: <EditOutlinedIcon />,
                            }}
                        />
                    </Grid>
                </Grid>
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
