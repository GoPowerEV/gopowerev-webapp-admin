import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined'
import Grid from '@material-ui/core/Grid'
import './SmartOutlets.css'
import { makeStyles } from '@material-ui/core/styles'
import EditSmartOutletModal from './EditSmartOutletModal'
import AddNewSmartOutletModal from './AddNewSmartOutletModal'
import { getBadgeText } from './../utils/PropertyUtils'
import moment from 'moment'

const useStyles = makeStyles({
    root: {
        fontFamily: 'Nunito Sans, sans-serif !important',
        minWidth: 275,
        borderRadius: '15px',
        height: '100%',
        cursor: 'pointer',
        '&:hover': {
            background: '#9e9e9e38',
        },
    },
    content: {
        marginTop: '-10px',
        padding: '20px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    cardHeader: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: '15px',
    },
    location: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: '10px',
        color: 'black',
    },
    pos: {
        marginBottom: 12,
    },
    right: {
        marginLeft: 'auto',
        color: 'grey',
    },
    operationalStatusHeader: {
        fontSize: '14px',
        marginTop: '8px',
    },
    status: {
        fontSize: 15,
        fontWeight: '600',
        color: 'black',
    },
})

const SmartOutlets = (props) => {
    const classes = useStyles()
    const [openModal, setOpenModal] = useState(false)
    const [openNewModal, setOpenNewModal] = useState(false)
    const [currentlyViewedOutlet, setCurrentlyViewedOutlet] = useState({})
    const [
        createSmartOutletForThisLocation,
        setCreateSmartOutletForThisLocation,
    ] = useState()
    const [outletIndex, setOutletIndex] = useState()

    const handleOpen = (outletData, index) => {
        setOpenModal(true)
        setCurrentlyViewedOutlet(outletData)
        setOutletIndex(index + 1)
    }

    const handleClose = () => {
        setOpenModal(false)
        setCurrentlyViewedOutlet({})
        setOutletIndex()
    }

    const handleNewOpen = () => {
        setOpenNewModal(true)
    }

    const handleNewClose = () => {
        setCreateSmartOutletForThisLocation()
        setOpenNewModal(false)
    }

    const addNewSmartOutlet = () => {
        setCreateSmartOutletForThisLocation(props.locationdUuid)
        handleNewOpen()
    }

    console.log('here is so data', props.smartOutlets)

    return (
        <div className="smartOutletsContainer">
            <Grid container justifyContent="space-between">
                <div className="outletHeader">
                    <FlashOnOutlinedIcon />
                    Smart Outlets ({props.smartOutlets?.length})
                </div>
                <Button
                    className="addNewLocButton"
                    variant="outlined"
                    onClick={addNewSmartOutlet}
                >
                    Add New Smart Outlet
                </Button>
            </Grid>
            <Grid container xs={12} spacing={2}>
                {props.smartOutlets?.map((outlet, index) => (
                    <React.Fragment>
                        <Grid item xl={4} lg={4} md={6} xs={12}>
                            <Card
                                className={classes.root}
                                onClick={() => handleOpen(outlet, index)}
                            >
                                <CardContent className={classes.content}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <span
                                                className={classes.cardHeader}
                                            >
                                                SO:{' '}
                                            </span>
                                            <span className="smartSo">
                                                Parking Spot{' '}
                                                {outlet.parkingSpot ?? '-'}
                                            </span>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        spacing={2}
                                        justifyContent="space-between"
                                    >
                                        <Grid item xs={4}>
                                            <div className="black barBadge">
                                                <div className="locationBadgeBox">
                                                    <span className="badgeText">
                                                        <div
                                                            className={
                                                                outlet?.rssi
                                                                    ? 'overall-progress greenBar'
                                                                    : 'overall-progress'
                                                            }
                                                        >
                                                            <div
                                                                class="progress"
                                                                data-progress="80"
                                                            ></div>
                                                        </div>
                                                        <div class="overall-progresss">
                                                            <div
                                                                class="progress"
                                                                data-progress="20"
                                                            ></div>
                                                        </div>
                                                        <div
                                                            className={
                                                                outlet?.rssi &&
                                                                outlet?.rssi >
                                                                    -84
                                                                    ? 'overall-progress greenBar'
                                                                    : 'overall-progress'
                                                            }
                                                        >
                                                            <div
                                                                class="progress"
                                                                data-progress="90"
                                                            ></div>
                                                        </div>
                                                        <div
                                                            className={
                                                                outlet?.rssi &&
                                                                outlet?.rssi >
                                                                    -72
                                                                    ? 'overall-progress greenBar'
                                                                    : 'overall-progress'
                                                            }
                                                        >
                                                            <div
                                                                class="progress"
                                                                data-progress="40"
                                                            ></div>
                                                        </div>
                                                        <div
                                                            className={
                                                                outlet?.rssi &&
                                                                outlet?.rssi >
                                                                    -66
                                                                    ? 'overall-progress greenBar'
                                                                    : 'overall-progress'
                                                            }
                                                        >
                                                            <div
                                                                class="progress"
                                                                data-progress="40"
                                                            ></div>
                                                        </div>
                                                        <div
                                                            className={
                                                                outlet?.rssi &&
                                                                outlet?.rssi >
                                                                    -60
                                                                    ? 'overall-progress greenBar'
                                                                    : 'overall-progress'
                                                            }
                                                        >
                                                            <div
                                                                class="progress"
                                                                data-progress="40"
                                                            ></div>
                                                        </div>
                                                        <div
                                                            className={
                                                                outlet?.rssi &&
                                                                outlet?.rssi >
                                                                    -52
                                                                    ? 'overall-progress greenBar'
                                                                    : 'overall-progress'
                                                            }
                                                        >
                                                            <div
                                                                class="progress"
                                                                data-progress="40"
                                                            ></div>
                                                        </div>
                                                        <div
                                                            class="overall-progress greenBar"
                                                            className={
                                                                outlet?.rssi &&
                                                                outlet?.rssi >
                                                                    -41
                                                                    ? 'overall-progress greenBar'
                                                                    : 'overall-progress'
                                                            }
                                                        >
                                                            <div
                                                                class="progress"
                                                                data-progress="40"
                                                            ></div>
                                                        </div>
                                                        <span class="progressDigits">
                                                            {outlet.rssi
                                                                ? outlet.rssi
                                                                : '-00'}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div
                                                className={
                                                    outlet.status
                                                        ? outlet.status === 'Ok'
                                                            ? 'green statusBadge'
                                                            : 'orange statusBadge'
                                                        : 'orange statusBadge'
                                                }
                                            >
                                                <div className="badgeBox">
                                                    <span className="badgeText">
                                                        {outlet.status
                                                            ? getBadgeText(
                                                                  outlet.status
                                                              )
                                                            : 'Never Connected'}
                                                    </span>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Typography
                                        className={
                                            classes.operationalStatusHeader
                                        }
                                    >
                                        Admin Status
                                    </Typography>
                                    <Typography className={classes.status}>
                                        {outlet.adminStatus ?? '-'}
                                    </Typography>
                                    <Typography
                                        className={
                                            classes.operationalStatusHeader
                                        }
                                    >
                                        Heartbeat
                                    </Typography>
                                    <Typography className={classes.status}>
                                        {outlet.lastHeartbeat !== null
                                            ? moment(
                                                  outlet.lastHeartbeat
                                              ).format(
                                                  'MM/DD/YYYY, h:mm:ss a'
                                              ) + ' UTC' ?? '-'
                                            : '-'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </React.Fragment>
                ))}
            </Grid>
            {/* EDIT SMART OUTLET MODAL */}
            <EditSmartOutletModal
                handleOpen={handleOpen}
                handleClose={handleClose}
                open={openModal}
                token={props.token}
                outletData={currentlyViewedOutlet}
                outletIndex={outletIndex}
                powerTypeIs1P240={props.powerTypeIs1P240}
            />
            {/* ADD NEW SMART OUTLET MODAL */}
            <AddNewSmartOutletModal
                handleOpen={handleNewOpen}
                handleClose={handleNewClose}
                createSmartOutletForThisLocation={
                    createSmartOutletForThisLocation
                }
                open={openNewModal}
                token={props.token}
                getSmartOutletData={props.getSmartOutletData}
            />
        </div>
    )
}

export default SmartOutlets
