import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@mui/material/IconButton'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ElectricCarOutlinedIcon from '@mui/icons-material/ElectricCarOutlined'
import Grid from '@material-ui/core/Grid'
import './ConsumerTab.css'
import { useHistory } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import BillingTable from './tables/BillingTable'
import SessionsTable from './tables/SessionsTable'
import { Collapse } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined'

const ConsumerDetails = (props) => {
    const [billingOpened, setBillingOpened] = useState(true)
    const [sessionsOpened, setSessionsOpened] = useState(true)
    const [userData, setUserData] = useState({})
    const [propertyData, setPropertyData] = useState({})
    const [vehicleData, setVehicleData] = useState({})
    const history = useHistory()

    const toggleBillingInfo = () => {
        setBillingOpened(!billingOpened)
    }

    const toggleSessionsInfo = () => {
        setSessionsOpened(!sessionsOpened)
    }

    useEffect(() => {
        console.log('here it is!!', props.currentlyViewedCustomer)
        setUserData(props.currentlyViewedCustomer[0].user)
        setPropertyData(props.currentlyViewedCustomer[0].property)
        // setVehicleData(props.currentlyViewedCustomer[0].property)
    }, [props.currentlyViewedCustomer])

    return (
        <React.Fragment>
            <div className="consumerMainBody">
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Grid item>
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            className="go-back-button"
                            onClick={props.goBack}
                        >
                            <ArrowBackOutlinedIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <span className="tabHeader">Search Results</span>
                    </Grid>
                    <Grid item>
                        <span className="consumer-step-icon">
                            <ArrowForwardIosOutlinedIcon fontSize="small" />
                        </span>
                    </Grid>
                    <Grid item>
                        <span className="tabHeader">Users</span>
                    </Grid>
                </Grid>
                <div
                    className={
                        billingOpened
                            ? 'table-container'
                            : 'table-container grey-border'
                    }
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="spacing-between"
                        alignItems="center"
                        spacing={4}
                    >
                        {/* LEFT SIDE */}
                        <Grid item xs={6}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="spacing-between"
                                alignItems="center"
                                spacing={1}
                            >
                                <Grid item xs={12}>
                                    <span className="blackHeader">
                                        {userData.firstName} {userData.lastName}
                                    </span>
                                    <span className="divider">|</span>
                                    <span className="greyHeader">
                                        {userData.cognitoUuid}
                                    </span>
                                </Grid>
                                <Grid item xs={12}>
                                    <FmdGoodOutlinedIcon />
                                    <span className="consumer-detail-grey">
                                        {propertyData.name}
                                    </span>
                                </Grid>
                                <Grid item lg={8} md={12}>
                                    <EmailOutlinedIcon />
                                    <span className="consumer-detail-grey">
                                        {userData.email ?? '-'}
                                    </span>
                                </Grid>
                                <Grid item lg={4} md={12}>
                                    <LocalPhoneOutlinedIcon />
                                    <span className="consumer-detail-grey">
                                        {userData.phoneNumber ?? '-'}
                                    </span>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="spacing-between"
                                alignItems="center"
                                spacing={1}
                                className="vehicle-section"
                            >
                                <Grid item xs={12}>
                                    <span className="blackHeaderVehicles">
                                        Vehicles
                                    </span>
                                </Grid>
                                <Grid item lg={8} md={12}>
                                    <ElectricCarOutlinedIcon />
                                    <span className="consumer-detail-grey">
                                        John's Tesla M3
                                    </span>
                                </Grid>
                                <Grid item lg={4} md={12}>
                                    <ElectricCarOutlinedIcon />
                                    <span className="consumer-detail-grey">
                                        John's HummerEV
                                    </span>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* RIGHT SIDE */}
                        <Grid item xs={6}>
                            <div className="snapshot-container">
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="spacing-between"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Grid item xs={12}>
                                        <div className="blackHeader">
                                            Snap Shot
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <span className="smallBlackHeader">
                                            100
                                        </span>{' '}
                                        Total Sessions
                                    </Grid>
                                    <Grid item xs={6}>
                                        <span className="smallBlackHeader">
                                            200
                                        </span>{' '}
                                        hrs{' '}
                                        <span className="smallBlackHeader">
                                            45
                                        </span>{' '}
                                        min Total Charge Time
                                    </Grid>
                                    <Grid item xs={6}>
                                        <span className="smallBlackHeader">
                                            5000
                                        </span>{' '}
                                        Total kWh
                                    </Grid>
                                    <Grid item xs={6}>
                                        <span className="smallBlackHeader">
                                            $5400
                                        </span>{' '}
                                        Total User Debits
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="spacing-between"
                        alignItems="center"
                        xs={12}
                        className="billingSection"
                    >
                        <Grid item xs={11}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={4}
                            >
                                <Grid item>
                                    <span className="blackHeader billingSection">
                                        Billing
                                    </span>
                                </Grid>
                                <Grid item>
                                    <Button
                                        className="regular-button"
                                        variant="contained"
                                    >
                                        Manage Balance
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        className="regular-button"
                                        variant="contained"
                                    >
                                        Reset Password
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                            >
                                <Grid item>
                                    {!billingOpened ? (
                                        <ExpandMoreIcon
                                            className="expandIcon"
                                            onClick={() => toggleBillingInfo()}
                                        />
                                    ) : (
                                        <ExpandLessIcon
                                            className="expandIcon"
                                            onClick={() => toggleBillingInfo()}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Collapse in={billingOpened}>
                        <BillingTable />
                    </Collapse>
                </div>
                <div
                    className={
                        sessionsOpened
                            ? 'table-container'
                            : 'table-container grey-border'
                    }
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="spacing-between"
                        alignItems="center"
                        xs={12}
                    >
                        <Grid item xs={11}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={5}
                            >
                                <Grid item>
                                    <span className="blachHeader">
                                        Charging Sessions
                                    </span>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                            >
                                <Grid item>
                                    {!sessionsOpened ? (
                                        <ExpandMoreIcon
                                            className="expandIcon"
                                            onClick={() => toggleSessionsInfo()}
                                        />
                                    ) : (
                                        <ExpandLessIcon
                                            className="expandIcon"
                                            onClick={() => toggleSessionsInfo()}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Collapse in={sessionsOpened}>
                        <div className="active-chargin-session-bar">
                            No Active Charging Session
                        </div>
                        <SessionsTable />
                    </Collapse>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ConsumerDetails
