import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import Amplify, { Auth, Hub } from 'aws-amplify'
import Navbar from './navBar/Navbar'
import Footer from './footer/Footer'
import Login from './navigationComponents/login/Login'
import LogoutModal from './navigationComponents/logout/LogOutModal'
import AdminDashboard from './adminDashboard/AdminDashboard'
import { useHistory } from 'react-router-dom'
import { API_URL } from './constants'
import './App.css'

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [token, setToken] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [
        displayAccountIsNotAdminError,
        setDisplayAccountIsNotAdminError,
    ] = useState(false)

    const history = useHistory()

    const logout = () => {
        setOpenModal(true)
    }

    const getToken = async () => {
        await Auth.currentSession()
            .then((response) => {
                setToken(response.idToken.jwtToken)
                isUserAdmin(response.idToken.jwtToken)
            })
            .catch((err) => {
                console.log('ERROR', err)
            })
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    const setAuthListener = () => {
        Hub.listen('auth', (data) => {
            switch (data.payload.event) {
                case 'signIn':
                    setLoggedIn(true)
                    break
                case 'signOut':
                    setLoggedIn(false)
                    break
                default:
                    break
            }
        })
    }

    const checkIfUserIsLoggedIn = async () => {
        await Auth.currentAuthenticatedUser()
            .then((user) => {
                setLoggedIn(true)
                getToken()
                console.log('here is app login true')
            })
            .catch((err) => {
                console.log('ERROR', err)
                console.log('here is app login false')
                setLoggedIn(false)
            })
    }

    const logOut = async () => {
        try {
            console.log('here loggin out')
            await Auth.signOut()
            setIsAdmin(false)
            setLoggedIn(false)
        } catch (error) {
            console.log('error signing out: ', error)
        }
    }

    const isUserAdmin = (token) => {
        if (token && !isAdmin) {
            fetch(API_URL + 'roles', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        console.log('here is admin result', result)
                        if (result?.includes('ADMIN')) {
                            setIsAdmin(true)
                        } else {
                            logOut()
                        }
                    },
                    (error) => {}
                )
        }
    }

    useEffect(() => {
        Amplify.configure({
            Auth: {
                region: process.env.REACT_APP_REGION,
                userPoolId: process.env.REACT_APP_USER_POOL_ID,
                userPoolWebClientId:
                    process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
            },
        })
        setAuthListener()
        checkIfUserIsLoggedIn()
    }, [])

    return (
        <Router>
            <div className="App">
                {/* ARE YOU SURE YOU WANT TO LOGOUT MODAL */}
                <LogoutModal
                    handleClose={handleClose}
                    open={openModal}
                    setIsAdmin={setIsAdmin}
                    setLoggedIn={setLoggedIn}
                />
                <Navbar loggedIn={loggedIn} isAdmin={isAdmin} logout={logout} />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return loggedIn === true && isAdmin === true ? (
                                <Redirect to="/admin-dashboard" />
                            ) : (
                                <Redirect to="/login" />
                            )
                        }}
                    />
                    <Route
                        exact
                        path="/admin-dashboard"
                        render={() => {
                            return loggedIn === true && isAdmin === true ? (
                                <AdminDashboard
                                    path={'admin-dashboard'}
                                    loggedIn={loggedIn}
                                    history={history}
                                    token={token}
                                />
                            ) : (
                                <Redirect to="/login" />
                            )
                        }}
                    />
                    <Route
                        path="/dashboard/:menuItem"
                        exact
                        render={(props) => (
                            <AdminDashboard
                                path={props.match.params.menuItem}
                                propertyStatus={
                                    props.match.params.propertyStatus
                                }
                                loggedIn={loggedIn}
                                history={history}
                                token={token}
                            />
                        )}
                    />
                    <Route
                        path="/dashboard/:menuItem/:propertyStatus"
                        exact
                        render={(props) => (
                            <AdminDashboard
                                path={props.match.params.menuItem}
                                propertyStatus={
                                    props.match.params.propertyStatus
                                }
                                loggedIn={loggedIn}
                                history={history}
                                token={token}
                            />
                        )}
                    />
                    <Route
                        path="/property/:propertyId"
                        render={(props) => (
                            <AdminDashboard
                                path={props.match.params.propertyId}
                                loggedIn={loggedIn}
                                history={history}
                                token={token}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/login"
                        render={() => {
                            return loggedIn === true && isAdmin === true ? (
                                <AdminDashboard
                                    path={'admin-dashboard'}
                                    loggedIn={loggedIn}
                                    history={history}
                                    token={token}
                                />
                            ) : loggedIn === false && isAdmin === false ? (
                                <Login
                                    setDisplayAccountIsNotAdminError={
                                        setDisplayAccountIsNotAdminError
                                    }
                                    displayAccountIsNotAdminError={
                                        displayAccountIsNotAdminError
                                    }
                                    setToken={setToken}
                                    setIsAdmin={setIsAdmin}
                                    setLoggedIn={setLoggedIn}
                                />
                            ) : null
                        }}
                    />
                </Switch>
                <Footer />
            </div>
        </Router>
    )
}

export default App
