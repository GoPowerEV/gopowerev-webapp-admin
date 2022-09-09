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
import { getConsumerChargingHistory } from './ConsumerTabService'

const ConsumerDetails = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [billingOpened, setBillingOpened] = useState(true)
    const [sessionsOpened, setSessionsOpened] = useState(true)
    const [userData, setUserData] = useState({})
    const [propertyData, setPropertyData] = useState({})
    const [vehicleData, setVehicleData] = useState({})
    const [chargingSessions, setChargingSessions] = useState([])
    const [billingData, setBillingData] = useState([])
    const [snapshotData, setSnapshotData] = useState({})
    const history = useHistory()

    const toggleBillingInfo = () => {
        setBillingOpened(!billingOpened)
    }

    const toggleSessionsInfo = () => {
        setSessionsOpened(!sessionsOpened)
    }

    const goToUsersProperty = () => {
        history.push('/property/' + propertyData.uuid)
    }

    useEffect(() => {
        setUserData(props.currentlyViewedCustomer[0].user)
        setPropertyData(props.currentlyViewedCustomer[0].property)
        setVehicleData(props.currentlyViewedCustomer[0].user.vehicles)
        if (userData.cognitoUuid) {
            getConsumerChargingHistory(
                userData.cognitoUuid,
                props.token,
                setIsLoading,
                setChargingSessions,
                setBillingData,
                setSnapshotData
            )
        }
    }, [props.currentlyViewedCustomer, props.token, userData.cognitoUuid])

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
                <hr className="consumerHr" />
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
                                {vehicleData?.length === 0 && (
                                    <Grid item lg={8} md={12}>
                                        <span className="consumer-detail-grey-none">
                                            No Vehicle
                                        </span>
                                    </Grid>
                                )}
                                {vehicleData?.length > 0 &&
                                    vehicleData?.map((vehicle, i) => (
                                        <Grid item lg={8} md={12}>
                                            <ElectricCarOutlinedIcon />
                                            <span className="consumer-detail-grey">
                                                {vehicle.year} {vehicle.make}{' '}
                                                {vehicle.model} | {vehicle.name}
                                            </span>
                                        </Grid>
                                    ))}
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
                                            {snapshotData?.totalSessions}
                                        </span>{' '}
                                        Total Sessions
                                    </Grid>
                                    <Grid item xs={6}>
                                        <span className="smallBlackHeader">
                                            {snapshotData?.totalChargeTime}
                                        </span>{' '}
                                        Total Charge Time
                                    </Grid>
                                    <Grid item xs={6}>
                                        <span className="smallBlackHeader">
                                            {snapshotData?.totalKwh?.power}
                                        </span>{' '}
                                        Total {snapshotData?.totalKwh?.unit}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <span className="smallBlackHeader">
                                            {snapshotData?.totalDebited}
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
                        className="buttonSection"
                    >
                        <Grid item xs={12}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={4}
                            >
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
                                <Grid item>
                                    <Button
                                        className="regular-button"
                                        variant="contained"
                                        onClick={() => goToUsersProperty()}
                                    >
                                        View User's Property
                                    </Button>
                                </Grid>
                            </Grid>
                            <hr className="consumerHr" />
                        </Grid>
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
                        <div className="grey-text">
                            You have no billing history
                        </div>
                        {/* <BillingTable /> */}
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
                                    <span className="blackHeader billingSection">
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
                        {/* <SessionsTable /> */}
                        <div className="grey-text">
                            You have no charging session history
                        </div>
                    </Collapse>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ConsumerDetails
