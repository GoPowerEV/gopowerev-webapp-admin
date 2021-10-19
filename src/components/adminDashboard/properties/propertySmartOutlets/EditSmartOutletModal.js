import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'
import './EditSmartOutletModal.css'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import { GridListTile } from '@material-ui/core'

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
    const [modalStyle] = React.useState(getModalStyle)
    const classes = useStyles()

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div id="simple-modal-description">
                <Grid container xs={12} spacing={2} className="smartOutletEditDetails">
                    <Grid item xs={3}>
                        <div className="smartOutletGridHeader smartOutletGridItem">
                            Smart Outlet <span>1</span>
                        </div>
                        <div className="smartOutletGridLocationHeader smartOutletGridItem">
                            East Side Garage
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className="smartOutletGridHeader smartOutletGridItem">
                            Operational Status
                        </div>
                        <div className="smartOutletGridLocationHeaderSmall smartOutletGridItem">
                            Never connected
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className="smartOutletGridHeader smartOutletGridItem">
                            Heartbeat
                        </div>
                        <div className="smartOutletGridLocationHeaderSmall smartOutletGridItem">
                            11:20:20am PST - 09-20-21
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className="smartOutletGridHeader">Installed</div>
                        <div className="smartOutletGridLocationHeaderSmall">
                            07-10-21
                        </div>
                    </Grid>
                </Grid>
                <Grid container xs={12} spacing={1}>
                    <Grid item xs={5} className="smartOutletDetailsContainer">
                        <Grid container>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                            >
                                <Grid item xs={5}>
                                    <div className="smartOutletDetailsHeader">
                                        LCU Name
                                    </div>
                                    <div className="smartOutletDetailsText">
                                        Main Office
                                    </div>
                                </Grid>
                                <Grid item xs={1} className="greyIconEdit">
                                    <EditOutlinedIcon />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={5} className="smartOutletDetailsContainer">
                        <Grid container>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                            >
                                <Grid item xs={5}>
                                    <div className="smartOutletDetailsHeader">
                                        MAC Address
                                    </div>
                                    <div className="smartOutletDetailsText">
                                        XXXXXXXXXXXXXXXXXXX
                                    </div>
                                </Grid>
                                <Grid item xs={1} className="greyIconEdit">
                                    <EditOutlinedIcon />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={5} className="smartOutletDetailsContainer">
                        <Grid container>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                            >
                                <Grid item xs={5}>
                                    <div className="smartOutletDetailsHeader">
                                        Hardware Version
                                    </div>
                                    <div className="smartOutletDetailsText">
                                        Alpha-1,001
                                    </div>
                                </Grid>
                                <Grid item xs={5}>
                                    <div className="smartOutletDetailsHeader">
                                        Last Updated
                                    </div>
                                    <div className="smartOutletDetailsTextSmall">
                                        11:20:10PM PST 09/20/2021
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={5} className="smartOutletDetailsContainer">
                        <Grid container>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                            >
                                <Grid item xs={7}>
                                    <div className="smartOutletDetailsHeader">
                                        Software Version
                                    </div>
                                    <div className="smartOutletDetailsText">
                                        Alpha-1,001
                                    </div>
                                </Grid>
                                <Grid item xs={5}>
                                    <div className="smartOutletDetailsHeader">
                                        Last Updated
                                    </div>
                                    <div className="smartOutletDetailsTextSmall">
                                        11:20:10PM PST 09/20/2021
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={5} className="smartOutletDetailsContainer">
                        <Grid container>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                            >
                                <Grid item xs={5}>
                                    <div className="smartOutletDetailsHeader">
                                        Firmware Version
                                    </div>
                                    <div className="smartOutletDetailsText">
                                        Alpha-1,001
                                    </div>
                                </Grid>
                                <Grid item xs={5}>
                                    <div className="smartOutletDetailsHeader">
                                        Last Updated
                                    </div>
                                    <div className="smartOutletDetailsTextSmall">
                                        11:20:10PM PST 09/20/2021
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <EditSmartOutletModal />
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
