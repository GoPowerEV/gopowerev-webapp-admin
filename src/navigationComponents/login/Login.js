import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Phone1 from './../../assets/img/phone1.png'
import Phone2 from './../../assets/img/phone2.png'
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

    const logIn = async (e) => {
        setIsLoading(true)
        await Auth.signIn({
            username: email,
            password,
        })
            .then((user) => {
                console.log('here it is', user)
                setEmail('')
                setPassword('')
                setIsLoading(false)
                history.push('/dashboard')
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
                                        error={wrongPassword}
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
                                        error={wrongPassword}
                                        helperText={
                                            wrongPassword
                                                ? 'Incorrect email or password'
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
