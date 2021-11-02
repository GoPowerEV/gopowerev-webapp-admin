import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './../styling/App.css'
import MainBody from './../components/bodyContent/MainBody'
import Footer from './footer/Footer'
import Amplify, { Auth, Hub } from 'aws-amplify'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
    'pk_test_51IiYQCA1MBSwkfjom2aSA02uJh8CYkyJBZT56wPGArixLPK9qUtbHHytcSYWv2vTAbVj9YvscZOj1jLUMEKZ72Gr007fwYdKXv'
)

const App = () => {
    const [isMobile, setIsMobile] = useState(true)
    const [loggedIn, setLoggedIn] = useState(true)
    const [token, setToken] = useState('')

    // This function is used to autocalculate the screen size and switch navs.
    const handleWindowSizeChange = () => {
        if (window.innerWidth <= 1024) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
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

    useEffect(() => {
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
        // Configure Amplify
        Amplify.configure({
            Auth: {
                region: process.env.REACT_APP_REGION,
                userPoolId: process.env.REACT_APP_USER_POOL_ID,
                userPoolWebClientId:
                    process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
            },
        })
        checkIfUserIsLoggedIn()
        setAuthListener()
        // On screen load calculate the screen size. And start 'listening' to the screen size changes.
        handleWindowSizeChange()
        window.addEventListener('resize', handleWindowSizeChange)
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange)
        }
    }, [])

    return (
        <BrowserRouter>
            <div className="mobileVersionWarning">
                We are sorry, but at this time this app does not support mobile
                devices.
            </div>
            <div className="regularContent">
                <MainBody
                    stripe={stripePromise}
                    isMobile={isMobile}
                    loggedIn={loggedIn}
                    token={token}
                />
            </div>
            <Footer />
        </BrowserRouter>
    )
}
export default App
