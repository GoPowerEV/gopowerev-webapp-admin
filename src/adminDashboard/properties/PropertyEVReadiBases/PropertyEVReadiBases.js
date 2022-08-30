import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import './PropertyEVReadiBases.css'
import { makeStyles } from '@material-ui/core/styles'
import AddNewBaseModal from './AddNewBaseModal'
import EditBaseModal from './EditBaseModal'

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

const PropertyEVReadiBases = (props) => {
    const classes = useStyles()
    const [currentlyViewedOutlet, setCurrentlyViewedOutlet] = useState({})
    const [
        createSmartOutletForThisLocation,
        setCreateSmartOutletForThisLocation,
    ] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [openNewModal, setOpenNewModal] = useState(false)
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

    const addNewBase = () => {
        setCreateSmartOutletForThisLocation(props.locationdUuid)
        handleNewOpen()
    }

    return (
        <div className="smartOutletsContainer">
            <Grid container justifyContent="space-between">
                <div className="outletHeader">
                    EVReadiBases ({props.readiBases?.length})
                </div>
                <Button
                    className="addNewLocButton"
                    variant="outlined"
                    onClick={addNewBase}
                >
                    Add New
                </Button>
            </Grid>
            <>
                {props.readiBases?.length === 0 && <div>-</div>}
                {props.readiBases?.length > 0 && (
                    <>
                        <Grid container xs={12} spacing={2}>
                            {props.readiBases?.map((base, index) => (
                                <React.Fragment>
                                    <Grid item xl={4} lg={4} md={6} xs={12}>
                                        <Card className={classes.root}>
                                            <CardContent
                                                className={classes.content}
                                            >
                                                <Grid
                                                    container
                                                    spacing={1}
                                                    justifyContent="space-between"
                                                >
                                                    <Grid item xs={12}>
                                                        <span
                                                            className={
                                                                classes.cardHeader
                                                            }
                                                        >
                                                            RB:{' '}
                                                        </span>
                                                        <span className="smartSo">
                                                            {index + 1}
                                                        </span>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography
                                                            className={
                                                                classes.operationalStatusHeader
                                                            }
                                                        >
                                                            Model
                                                        </Typography>
                                                        <Typography
                                                            className={
                                                                classes.status
                                                            }
                                                        >
                                                            {base.baseModel}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography
                                                            className={
                                                                classes.operationalStatusHeader
                                                            }
                                                        >
                                                            Admin Status
                                                        </Typography>
                                                        <Typography
                                                            className={
                                                                classes.status
                                                            }
                                                        >
                                                            {base.adminStatus}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid
                                                    container
                                                    spacing={1}
                                                    justifyContent="space-between"
                                                >
                                                    <Grid item xs={4}>
                                                        <Typography
                                                            className={
                                                                classes.operationalStatusHeader
                                                            }
                                                        >
                                                            Feed Colors
                                                        </Typography>
                                                        <Typography
                                                            className={
                                                                classes.status
                                                            }
                                                        >
                                                            {base.feedColors}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography
                                                            className={
                                                                classes.operationalStatusHeader
                                                            }
                                                        >
                                                            BreakNumA
                                                        </Typography>
                                                        <Typography
                                                            className={
                                                                classes.status
                                                            }
                                                        >
                                                            {base.breakNumA}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Typography
                                                            className={
                                                                classes.operationalStatusHeader
                                                            }
                                                        >
                                                            BreakNumB
                                                        </Typography>
                                                        <Typography
                                                            className={
                                                                classes.status
                                                            }
                                                        >
                                                            {base.breakNumB}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </React.Fragment>
                            ))}
                        </Grid>
                    </>
                )}
            </>
            {/* EDIT READIBASE MODAL */}
            <EditBaseModal
                handleOpen={handleOpen}
                handleClose={handleClose}
                open={openModal}
                token={props.token}
                outletData={currentlyViewedOutlet}
                outletIndex={outletIndex}
                powerTypeIs1P240={props.powerTypeIs1P240}
            />
            {/* ADD NEW READIBASE MODAL */}
            <AddNewBaseModal
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

export default PropertyEVReadiBases
