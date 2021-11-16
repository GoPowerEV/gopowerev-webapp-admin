import React, { useState, useEffect } from 'react'
import { Redirect, Switch, Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './../../styling/App.css'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Zoom from '@material-ui/core/Zoom'
import Grid from '@material-ui/core/Grid'
import MainLogoWhite from './../../assets/images/mainLogoWhite.png'
import MainNav from '../navigations/mainNav/MainNav'
import LoginNew from './../loginNew/LoginNew'
import LogoutModal from './LogoutModal'
import { Auth } from 'aws-amplify'
import CircularProgress from '@material-ui/core/CircularProgress'
import AdminDashboard from '../adminDashboard/AdminDashboard'
import ForgotPassword from './../login/ForgotPassword'
import ResetPassword from './../login/ResetPassword'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    goUpButton: {
        backgroundColor: '#53BCF9',
    },
}))

function ScrollTop(props) {
    const { children, window } = props
    const classes = useStyles()
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    })

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor'
        )

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }

    return (
        <Zoom in={trigger}>
            <div
                onClick={handleClick}
                role="presentation"
                className={classes.root}
            >
                {children}
            </div>
        </Zoom>
    )
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
}

const MainBody = (props) => {
    const classes = useStyles()
    const [value, setValue] = useState(5)
    const [openModal, setOpenModal] = useState(false)
    const [token, setToken] = useState('')
    const [
        usernameToChangePasswordFor,
        setUsernameToChangePasswordFor,
    ] = useState('')
    const [loading, setLoading] = useState(false)

    const handleMenuChange = (index, goHere) => {
        if (goHere === 'logout') {
            setOpenModal(true)
        } else {
            // this moves the top nav menu selector
            setValue(Number(index))
            // this sets the route and renders the body
            props.history.push('/' + goHere)
        }
    }

    const logOut = async () => {
        setLoading(true)
        try {
            await Auth.signOut()
            setLoading(false)
            props.history.push('/login')
            setValue(1)
        } catch (error) {
            console.log('error signing out: ', error)
        }
    }

    const handleOpen = () => {
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    const handleCloseAndSubmit = () => {
        setOpenModal(false)
        setTimeout(function () {
            logOut()
        }, 1000)
    }

    const handleLogoClick = () => {
        setValue(0)
        props.history.push('/admin-dashboard/dashboard')
    }

    useEffect(() => {
        console.log('here logged in', props.loggedIn)
        if (!props.loggedIn) {
            props.history.push('/login')
        }
    }, [])

    useEffect(() => {
        console.log('here token changed', props.token)
        setToken(props.token)
    }, [props.token])

    useEffect(() => {
        if (props.history.location) {
            var tabName = props.history.location.pathname.replace(/\\|\//g, '')
            if (tabName === 'dashboard') {
                setValue('0')
            } else {
                setValue('0')
            }
        }
    }, [props.history.location])

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar className="main-app-bar" position="relative">
                <Toolbar>
                    <Grid container spacing={8}>
                        <Grid item xs={props.loggedIn ? 9 : 9}>
                            <img
                                src={MainLogoWhite}
                                className="main-logo"
                                alt="fireSpot"
                                onClick={handleLogoClick}
                            />
                        </Grid>
                        <Grid item xs={props.loggedIn ? 3 : 3}>
                            <MainNav
                                handleMenuChange={handleMenuChange}
                                loggedIn={props.loggedIn}
                                value={value}
                                history={props.history}
                            />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {!loading && (
                <div className="main-body-container">
                    <Box className="main-box">
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/admin-dashboard/dashboard" />
                            </Route>
                            <Route exact path="/gopowerev-webapp-admin">
                                <Redirect to="/admin-dashboard/dashboard" />
                            </Route>
                            <Route
                                path="/admin-dashboard/:menuItem"
                                render={(properties) => (
                                    <AdminDashboard
                                        path={properties.match.params.menuItem}
                                        loggedIn={props.loggedIn}
                                        token={token}
                                        history={props.history}
                                    />
                                )}
                            />
                            />
                            <Route path="/login">
                                <LoginNew
                                    history={props.history}
                                    handleMenuChange={handleMenuChange}
                                    loggedIn={props.loggedIn}
                                    setToken={setToken}
                                />
                            </Route>
                            <Route exact path="/admin-dashboard">
                                <Redirect to="/admin-dashboard/dashboard" />
                            </Route>
                            <Route path="/forgotPassword">
                                <ForgotPassword
                                    history={props.history}
                                    setUsernameToChangePasswordFor={
                                        setUsernameToChangePasswordFor
                                    }
                                />
                            </Route>
                            <Route path="/resetPassword">
                                <ResetPassword
                                    email={usernameToChangePasswordFor}
                                    history={props.history}
                                />
                            </Route>
                        </Switch>
                    </Box>
                    {/* ARE YOU SURE YOU WANT TO LOGOUT MODAL */}
                    <LogoutModal
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                        handleCloseAndSubmit={handleCloseAndSubmit}
                        open={openModal}
                        logOut={logOut}
                    />
                </div>
            )}
            {loading && (
                <div className={classes.loaderClass}>
                    <CircularProgress style={{ color: '#12BFA2' }} />
                </div>
            )}
            <ScrollTop {...props}>
                <Fab
                    color="secondary"
                    size="small"
                    aria-label="scroll back to top"
                    className={classes.goUpButton}
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </React.Fragment>
    )
}

export default withRouter(MainBody)
