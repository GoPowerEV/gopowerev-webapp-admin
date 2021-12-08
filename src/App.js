import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
    const [token, setToken] = useState('')

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

    const getToken = () => {
        Auth.currentSession()
            .then((response) => {
                setToken(response.idToken.jwtToken)
                setLoggedIn(true)
            })
            .catch((err) => {
                setLoggedIn(false)
                console.log('ERROR', err)
            })
    }

    const checkIfUserIsLoggedIn = () => {
        Auth.currentAuthenticatedUser()
            .then((user) => {
                getToken()
                setLoggedIn(true)
            })
            .catch((err) => {
                setLoggedIn(false)
                console.log('ERROR', err)
            })
    }

    useEffect(() => {
        // Configure Amplify
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
                <LogoutModal handleClose={handleClose} open={openModal} />
                <Navbar loggedIn={loggedIn} logout={logout} />
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/dashboard" component={AdminDashboard} />
                    <Route
                        path="/dashboard/:menuItem"
                        render={(properties) => (
                            <AdminDashboard
                                path={properties.match.params.menuItem}
                                loggedIn={loggedIn}
                                token={token}
                                history={history}
                            />
                        )}
                    />
                    <Route path="/login" component={Login} />
                </Switch>
                <Footer />
            </div>
        </Router>
    )
}

export default App
