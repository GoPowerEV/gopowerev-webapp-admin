import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined'
import BrokenImageOutlinedIcon from '@material-ui/icons/BrokenImageOutlined'
import EvStationOutlinedIcon from '@material-ui/icons/EvStationOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined'
import SetupNewProperty from './setupNewProperty/SetupNewProperty'
import AddNewInstaller from './addNewInstaller/AddNewInstaller'
import Properties from './properties/Properties'
import DashboardTab from './dashboardTab/DashboardTab'
import ConsumerTab from './consumerTab/ConsumerTab'
import SessionsTab from './sessionsTab/SessionsTab'
import Installers from './installers/Installers'
import { useHistory } from 'react-router-dom'
import './AdminDashboard.css'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'Nunito Sans, sans-serif !important',
        fontWeight: theme.typography.fontWeightBold,
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',
        borderRadius: '25px',
        marginBottom: '70px',
        minHeight: '700px',
        marginLeft: '95px',
        marginRight: '95px',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    menu: {
        textAlign: 'center',
        color: '#FFFFFF',
        backgroundColor: '#12BFA2',
        borderTopLeftRadius: '25px',
        borderBottomLeftRadius: '25px',
        paddingTop: '35px',
        height: '100%',
        minHeight: '1000px',
    },
    mainBody: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: '25px',
        borderBottomRightRadius: '25px',
        height: '100%',
        minHeight: '1000px',
    },
    tabRoot: {
        textTransform: 'initial',
        marginLeft: '12%',
        minHeight: '50px',
        padding: '10px',
        width: '70%',
        display: 'block',
        fontFamily: 'Nunito Sans',
        fontSize: '18px',
        fontWeight: theme.typography.fontWeightBold,
        '@media (max-width: 1300px)': {
            fontSize: '15px',
            padding: '7px',
        },
        '&:hover': {
            color: '#FFFFFF',
            opacity: 1,
            textTransform: 'initial',
        },
        '&$tabSelected': {
            color: '#323438',
            textTransform: 'capitalize',
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
        },
        '&:focus': {
            color: '#323438',
            textTransform: 'capitalize',
        },
    },
    tabSelected: { color: '#323438' },
    sportsHeading: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    alignment: {
        display: 'block',
    },
    outlinedButton: {
        fontFamily: 'Nunito Sans, sans-serif !important',
        color: '#FFFFFF',
        border: '1px solid #15192412',
        backgroundColor: '#0BAC90',
        fontWeight: 'bold',
        borderRadius: '12px',
        fontSize: '17px',
        marginLeft: '30px',
        marginRight: '30px',
        textTransform: 'none',
        textAlign: 'left',
        lineHeight: '1.5',
        padding: '10px',
        '@media (max-width: 780px)': {
            fontSize: '15px',
        },
    },
    outlinedButtonInstaller: {
        fontFamily: 'Nunito Sans, sans-serif !important',
        color: '#FFFFFF',
        border: '1px solid #15192412',
        backgroundColor: '#0BAC90',
        fontWeight: 'bold',
        borderRadius: '12px',
        fontSize: '17px',
        marginLeft: '30px',
        marginRight: '30px',
        marginTop: '15px',
        textTransform: 'none',
        textAlign: 'left',
        lineHeight: '1.5',
        padding: '10px',
        '@media (max-width: 780px)': {
            fontSize: '15px',
        },
    },
    buttonIcon: {
        '@media (min-width: 1600px)': {
            fontSize: '29px !important',
        },
        '@media (max-width: 1599px)': {
            fontSize: '25px !important',
        },
    },
}))

export default function AdminDashboard(props) {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [viewThisProperty, setViewThisProperty] = useState(null)
    const [filterPropertiesBy, setFilterPropertiesBy] = useState(null)
    const [
        displaySetupNewProperty,
        setDisplaySetupNewProperty,
    ] = React.useState(false)
    const [displayAddNewInstaller, setDisplayAddNewInstaller] = React.useState(
        false
    )

    const history = useHistory()

    const handleChange = (event, newValue) => {
        if (newValue === 1) {
            history.push('/dashboard/properties')
        } else if (newValue === 0) {
            history.push('/admin-dashboard')
        } else if (newValue === 2) {
            history.push('/dashboard/installers')
        } else if (newValue === 3) {
            history.push('/dashboard/consumer')
        } else if (newValue === 4) {
            history.push('/dashboard/sessions')
        }
        setDisplaySetupNewProperty(false)
        setDisplayAddNewInstaller(false)
        setValue(newValue)
    }

    const goToInstallers = () => {
        history.push('/dashboard/installers')
        setDisplaySetupNewProperty(false)
        setDisplayAddNewInstaller(false)
        setValue(2)
    }

    const goToPropertiesByType = (status) => {
        setFilterPropertiesBy(status)
        setViewThisProperty(null)
        setDisplaySetupNewProperty(false)
        setDisplayAddNewInstaller(false)
        setValue(1)
    }

    const goToProperties = () => {
        history.push('/dashboard/properties')
        setDisplaySetupNewProperty(false)
        setDisplayAddNewInstaller(false)
        setValue(1)
    }

    const setupNewProperty = () => {
        history.push('/dashboard/setup-new-property')
        // Setting the value to something non-existant
        setValue(7)
        setDisplaySetupNewProperty(true)
        setDisplayAddNewInstaller(false)
    }

    const addNewInstaller = () => {
        history.push('/dashboard/add-new-partner')
        // Setting the value to something non-existant
        setValue(8)
        setDisplaySetupNewProperty(false)
        setDisplayAddNewInstaller(true)
    }

    useEffect(() => {
        setIsLoading(true)
        if (!props.loggedIn) {
            setIsLoading(false)
            return (
                <Redirect
                    to={{
                        pathname: '/login',
                    }}
                />
            )
        } else {
            const urlLocation = props.path
            const propertyStatus = props.propertyStatus

            if (propertyStatus) {
                setFilterPropertiesBy(propertyStatus)
                setViewThisProperty(null)
                history.push('/dashboard/' + urlLocation + '/' + propertyStatus)
                setDisplaySetupNewProperty(false)
                setDisplayAddNewInstaller(false)
                setValue(1)
            } else {
                setFilterPropertiesBy(null)
                if (urlLocation === 'admin-dashboard') {
                    setViewThisProperty(null)
                    history.push('/' + urlLocation)
                    setDisplaySetupNewProperty(false)
                    setDisplayAddNewInstaller(false)
                    setValue(0)
                } else if (urlLocation === 'properties') {
                    setViewThisProperty(null)
                    history.push('/dashboard/' + urlLocation)
                    setDisplaySetupNewProperty(false)
                    setDisplayAddNewInstaller(false)
                    setValue(1)
                } else if (urlLocation === 'installers') {
                    setViewThisProperty(null)
                    history.push('/dashboard/' + urlLocation)
                    setDisplaySetupNewProperty(false)
                    setDisplayAddNewInstaller(false)
                    setValue(2)
                } else if (urlLocation === 'consumer') {
                    setViewThisProperty(null)
                    history.push('/dashboard/' + urlLocation)
                    setDisplaySetupNewProperty(false)
                    setDisplayAddNewInstaller(false)
                    setValue(3)
                } else if (urlLocation === 'sessions') {
                    setViewThisProperty(null)
                    history.push('/dashboard/' + urlLocation)
                    setDisplaySetupNewProperty(false)
                    setDisplayAddNewInstaller(false)
                    setValue(4)
                } else if (urlLocation === 'setup-new-property') {
                    setViewThisProperty(null)
                    history.push('/dashboard/' + urlLocation)
                    setValue(7)
                    setDisplaySetupNewProperty(true)
                    setDisplayAddNewInstaller(false)
                } else if (urlLocation === 'add-new-partner') {
                    setViewThisProperty(null)
                    history.push('/dashboard/' + urlLocation)
                    setValue(8)
                    setDisplaySetupNewProperty(false)
                    setDisplayAddNewInstaller(true)
                } else {
                    history.push('/property/' + urlLocation)
                    setViewThisProperty(urlLocation)
                    setDisplaySetupNewProperty(false)
                    setDisplayAddNewInstaller(false)
                    setValue(1)
                }
            }
            setIsLoading(false)
        }
    }, [
        history,
        props.loggedIn,
        props.path,
        props.propertyStatus,
        props.token,
        value,
    ])

    return (
        <div className={classes.root}>
            {!isLoading && (
                <Grid container>
                    <Grid item lg={2} md={3} sm={12} xs={12}>
                        <Paper className={classes.menu}>
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={value}
                                onChange={handleChange}
                                aria-label="Menu"
                                className={classes.tabs}
                                TabIndicatorProps={{
                                    style: { background: 'none' },
                                }}
                            >
                                <Tab
                                    className={classes.customTab}
                                    icon={
                                        <DashboardOutlinedIcon
                                            style={{
                                                marginTop: '4px',
                                                marginRight: '-20px',
                                                float: 'left',
                                            }}
                                        />
                                    }
                                    classes={{
                                        root: classes.tabRoot,
                                        selected: classes.tabSelected,
                                        wrapper: classes.alignment,
                                    }}
                                    label="Dashboard"
                                    {...a11yProps(0)}
                                />
                                <Tab
                                    className={classes.customTab}
                                    icon={
                                        <BrokenImageOutlinedIcon
                                            style={{
                                                marginTop: '4px',
                                                marginRight: '-20px',
                                                float: 'left',
                                            }}
                                        />
                                    }
                                    classes={{
                                        root: classes.tabRoot,
                                        selected: classes.tabSelected,
                                        wrapper: classes.alignment,
                                    }}
                                    label="Properties"
                                    {...a11yProps(1)}
                                />
                                <Tab
                                    className={classes.customTab}
                                    icon={
                                        <EvStationOutlinedIcon
                                            style={{
                                                marginTop: '4px',
                                                marginRight: '-20px',
                                                float: 'left',
                                            }}
                                        />
                                    }
                                    classes={{
                                        root: classes.tabRoot,
                                        selected: classes.tabSelected,
                                        wrapper: classes.alignment,
                                    }}
                                    label="Partners"
                                    {...a11yProps(2)}
                                />
                                <Tab
                                    className={classes.customTab}
                                    icon={
                                        <PersonOutlineOutlinedIcon
                                            style={{
                                                marginTop: '4px',
                                                marginRight: '-20px',
                                                float: 'left',
                                            }}
                                        />
                                    }
                                    classes={{
                                        root: classes.tabRoot,
                                        selected: classes.tabSelected,
                                        wrapper: classes.alignment,
                                    }}
                                    label="Consumer"
                                    {...a11yProps(3)}
                                />
                                <Tab
                                    className={classes.customTab}
                                    icon={
                                        <FlashOnOutlinedIcon
                                            style={{
                                                marginTop: '4px',
                                                marginRight: '-20px',
                                                float: 'left',
                                            }}
                                        />
                                    }
                                    classes={{
                                        root: classes.tabRoot,
                                        selected: classes.tabSelected,
                                        wrapper: classes.alignment,
                                    }}
                                    label="Sessions"
                                    {...a11yProps(4)}
                                />
                            </Tabs>
                            <div className="hr-container">
                                <hr className="dotted-hr" />
                            </div>
                            <Button
                                className={classes.outlinedButton}
                                variant="outlined"
                                onClick={setupNewProperty}
                                endIcon={
                                    <RoomOutlinedIcon
                                        className={classes.buttonIcon}
                                    />
                                }
                            >
                                Setup New Property
                            </Button>
                            <Button
                                className={classes.outlinedButtonInstaller}
                                variant="outlined"
                                onClick={addNewInstaller}
                                endIcon={
                                    <EvStationOutlinedIcon
                                        className={classes.buttonIcon}
                                    />
                                }
                            >
                                Add New Partner
                            </Button>
                        </Paper>
                    </Grid>
                    {!displaySetupNewProperty && !displayAddNewInstaller && (
                        <Grid item lg={10} md={9} xs={12}>
                            <Paper className={classes.mainBody}>
                                <TabPanel value={value} index={0}>
                                    <DashboardTab
                                        goToInstallers={goToInstallers}
                                        goToPropertiesByType={
                                            goToPropertiesByType
                                        }
                                        token={props.token}
                                        goToProperties={goToProperties}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Properties
                                        filterPropertiesBy={filterPropertiesBy}
                                        token={props.token}
                                        viewThisProperty={viewThisProperty}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <Installers token={props.token} />
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    <ConsumerTab token={props.token} />
                                </TabPanel>
                                <TabPanel value={value} index={4}>
                                    <SessionsTab token={props.token} />
                                </TabPanel>
                            </Paper>
                        </Grid>
                    )}
                    {displaySetupNewProperty && (
                        <Grid item lg={10} md={9} xs={12}>
                            <div>
                                <SetupNewProperty
                                    token={props.token}
                                    goToProperties={goToProperties}
                                    history={history}
                                />
                            </div>
                        </Grid>
                    )}
                    {displayAddNewInstaller && (
                        <Grid item lg={10} md={9} xs={12}>
                            <div>
                                <AddNewInstaller token={props.token} />
                            </div>
                        </Grid>
                    )}
                </Grid>
            )}
            {isLoading && (
                <div className="propertiesLoader">
                    <CircularProgress style={{ color: '#12BFA2' }} />
                </div>
            )}
        </div>
    )
}
