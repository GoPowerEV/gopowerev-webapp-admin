import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Phone1 from './../../assets/img/phone1.png'
import Phone2 from './../../assets/img/phone2.png'
import { API_URL } from './../../constants'
import {
    TextField,
    InputAdornment,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
} from '@material-ui/core'
import AlternateEmailOutlined from '@material-ui/icons/AlternateEmailOutlined'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Loader from '../loader/Loader'
import { Auth } from 'aws-amplify'
import './Login.css'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [disabledButton, setDisabledButton] = useState(false)
    const [wrongPassword, setWrongPassword] = useState(false)
    const [token, setToken] = useState(null)
    const [
        displayAccountIsNotAdminError,
        setDisplayAccountIsNotAdminError,
    ] = useState(false)

    const history = useHistory()

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked)
    }

    const isUserAdmin = (token) => {
        if (token) {
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
                        console.log()
                        props.setIsAdmin(result?.includes('ADMIN'))
                        if (result?.includes('ADMIN')) {
                            history.push('/admin-dashboard')
                            props.setIsAdmin(true)
                            setDisplayAccountIsNotAdminError(false)
                            props.setDisplayAccountIsNotAdminError(false)
                            props.setLoggedIn(true)
                            console.log('here setting login as true')
                        } else {
                            logOut()
                            props.setIsAdmin(false)
                            setDisplayAccountIsNotAdminError(true)
                            props.setDisplayAccountIsNotAdminError(true)
                            props.setLoggedIn(false)
                            console.log('here setting login as false')
                        }
                    },
                    (error) => {}
                )
        }
    }

    const getToken = async () => {
        await Auth.currentSession()
            .then((response) => {
                setToken(response.idToken.jwtToken)
                props.setToken(response.idToken.jwtToken)
                isUserAdmin(response.idToken.jwtToken)
            })
            .catch((err) => {
                console.log('ERROR', err)
            })
    }

    const logOut = async () => {
        try {
            console.log('here loggin out')
            await Auth.signOut()
            props.setIsAdmin(false)
            props.setLoggedIn(false)
            history.push('/login')
        } catch (error) {
            console.log('error signing out: ', error)
        }
    }

    const logIn = async (e) => {
        setIsLoading(true)
        await Auth.signIn({
            username: email,
            password,
        })
            .then((user) => {
                setEmail('')
                setPassword('')
                setIsLoading(false)
                getToken()
            })
            .catch((err) => {
                console.log(err)
                if (err.code === 'NotAuthorizedException') {
                    setWrongPassword(true)
                }
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if (password.length > 0 && email.length > 0) {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    }, [email, password])

    return (
        <React.Fragment>
            {isLoading && <Loader />}
            {!isLoading && (
                <div className="login-page-container">
                    <Grid container>
                        <Grid item xs={12} md={5}>
                            <div className="login-page-container-left">
                                <div className="medium-header">
                                    Admin Sign In
                                </div>
                                <hr />
                                <div className="login-subtext-left">
                                    Welcome back, you've been missed!
                                </div>
                                <div className="login-form-container">
                                    <TextField
                                        id="email"
                                        error={
                                            wrongPassword ||
                                            displayAccountIsNotAdminError ||
                                            props.displayAccountIsNotAdminError
                                        }
                                        label="Your Email"
                                        variant="outlined"
                                        value={email}
                                        onChange={(e) => handleEmailChange(e)}
                                        className="login-field"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AlternateEmailOutlined className="iconStuff" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        id="password"
                                        error={
                                            wrongPassword ||
                                            displayAccountIsNotAdminError ||
                                            props.displayAccountIsNotAdminError
                                        }
                                        helperText={
                                            wrongPassword
                                                ? 'Incorrect email or password'
                                                : displayAccountIsNotAdminError ||
                                                  props.displayAccountIsNotAdminError
                                                ? 'Your account does not have admin access.'
                                                : ''
                                        }
                                        label="Password"
                                        variant="outlined"
                                        value={password}
                                        type="password"
                                        onChange={(e) =>
                                            handlePasswordChange(e)
                                        }
                                        className="login-field password-field"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOutlinedIcon className="iconStuff" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    style={{
                                                        color: '#12bfa2',
                                                        fontFamily:
                                                            'Nunito Sans, sans-serif',
                                                    }}
                                                    checked={rememberMe}
                                                    onChange={(e) =>
                                                        handleRememberMeChange(
                                                            e
                                                        )
                                                    }
                                                />
                                            }
                                            label="Remember me"
                                        />
                                    </FormGroup>
                                    <Button
                                        className="sign-up-button"
                                        variant="contained"
                                        disabled={disabledButton}
                                        onClick={logIn}
                                    >
                                        Sign In
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <div className="login-page-container-right">
                                <div className="small-header">
                                    Newest Update
                                </div>
                                <div className="large-header">
                                    Added Stripe!
                                </div>
                                <div className="login-subtext">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Vestibulum justo risus,
                                    fermentum vel facilisis at, commodo eget
                                    velit. Usto risus, fermentum vel facilis.
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Vestibulum justo risus,
                                        fermentum vel facilisis at, commodo eget
                                        velit.
                                    </p>
                                </div>
                                <div className="login-image-container">
                                    <img
                                        className="phone-one-img"
                                        src={Phone1}
                                        alt="phoneOne"
                                    />
                                    <img
                                        className="phone-two-img"
                                        src={Phone2}
                                        alt="phoneOne"
                                    />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )}
        </React.Fragment>
    )
}

export default Login
