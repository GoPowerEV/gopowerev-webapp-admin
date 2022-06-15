import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@mui/material/IconButton'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
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
    const history = useHistory()

    const toggleBillingInfo = () => {
        setBillingOpened(!billingOpened)
    }

    const toggleSessionsInfo = () => {
        setSessionsOpened(!sessionsOpened)
    }

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
                                    <span className="blachHeader">Billing</span>
                                </Grid>
                                <Grid item>
                                    <Button
                                        className="regular-button"
                                        variant="contained"
                                    >
                                        Manage Balance
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
