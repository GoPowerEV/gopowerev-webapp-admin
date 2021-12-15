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
import CircularProgress from '@material-ui/core/CircularProgress'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined'
import SetupNewProperty from './setupNewProperty/SetupNewProperty'
import AddNewInstaller from './addNewInstaller/AddNewInstaller'
import Properties from './properties/Properties'
import DashboardTab from './dashboardTab/DashboardTab'
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
    },
    mainBody: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: '25px',
        borderBottomRightRadius: '25px',
        minHeight: '700px',
        height: '100%',
    },
    tabRoot: {
        textTransform: 'initial',
        marginLeft: '12%',
        minHeight: '50px',
        padding: '10px',
        width: '70%',
        display: 'block',
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
        color: '#FFFFFF',
        fontWeight: 'bold',
        borderColor: '#FFFFFF',
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
        color: '#FFFFFF',
        fontWeight: 'bold',
        borderColor: '#FFFFFF',
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
        history.push('/dashboard/add-new-installer')
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
            } else if (urlLocation === 'setup-new-property') {
                setViewThisProperty(null)
                history.push('/dashboard/' + urlLocation)
                setValue(7)
                setDisplaySetupNewProperty(true)
                setDisplayAddNewInstaller(false)
            } else if (urlLocation === 'add-new-installer') {
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
            setIsLoading(false)
        }
    }, [props.loggedIn])

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
                                aria-label="Vertical tabs example"
                                className={classes.tabs}
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
                                    label="Installers"
                                    {...a11yProps(2)}
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
                                Add New Installer
                            </Button>
                        </Paper>
                    </Grid>
                    {!displaySetupNewProperty && !displayAddNewInstaller && (
                        <Grid item lg={10} md={9} xs={12}>
                            <Paper className={classes.mainBody}>
                                <TabPanel value={value} index={0}>
                                    <DashboardTab
                                        goToInstallers={goToInstallers}
                                        token={props.token}
                                        goToProperties={goToProperties}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Properties
                                        token={props.token}
                                        viewThisProperty={viewThisProperty}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <Installers token={props.token} />
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
