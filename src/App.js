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
import './App.css'

function App() {
    const [loggedIn, setLoggedIn] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [token, setToken] = useState(null)

    const history = useHistory()

    const logout = () => {
        setOpenModal(true)
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
            })
            .catch((err) => {
                console.log('ERROR', err)
                setLoggedIn(false)
            })
    }

    const getToken = async () => {
        await Auth.currentSession()
            .then((response) => {
                setToken(response.idToken.jwtToken)
                console.log('here app token set', response.idToken.jwtToken)
            })
            .catch((err) => {
                console.log('ERROR', err)
            })
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

    useEffect(() => {
        if (loggedIn) {
            getToken()
        }
    }, [loggedIn])

    return (
        <Router>
            <div className="App">
                {/* ARE YOU SURE YOU WANT TO LOGOUT MODAL */}
                <LogoutModal handleClose={handleClose} open={openModal} />
                <Navbar loggedIn={loggedIn} logout={logout} />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            console.log('here you go', loggedIn)
                            return loggedIn === true ? (
                                <Redirect to="/admin-dashboard" />
                            ) : (
                                <Redirect to="/login" />
                            )
                        }}
                    />
                    <Route
                        exact
                        path="/admin-dashboard"
                        render={() => (
                            <AdminDashboard
                                loggedIn={loggedIn}
                                history={history}
                                token={token}
                                path="admin-dashboard"
                            />
                        )}
                    />
                    <Route
                        path="/dashboard/:menuItem"
                        render={(props) => (
                            <AdminDashboard
                                path={props.match.params.menuItem}
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
                    <Route exact path="/login" component={Login} />
                </Switch>
                <Footer />
            </div>
        </Router>
    )
}

export default App
