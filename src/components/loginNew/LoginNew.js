import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import './LoginNew.css'
import { Auth } from 'aws-amplify'
import CircularProgress from '@material-ui/core/CircularProgress'
import CellPhonePic from './../../../src/assets/images/cellPic.png'

const LoginNew = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [wrongPassword, setWrongPassword] = useState(false)

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            height: '100%',
            borderRadius: '25px',
            marginBottom: '70px',
            minHeight: '700px',
        },
        leftSide: {
            textAlign: 'center',
            color: '#000000',
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: '25px',
            borderBottomLeftRadius: '25px',
            paddingTop: '35px',
            paddingLeft: '170px',
            paddingRight: '170px',
            marginTop: '55px',
            height: '92%',
        },
        rightSide: {
            textAlign: 'center',
            color: '#FFFFFF',
            backgroundColor: '#12BFA2',
            paddingLeft: '100px',
            paddingRight: '100px',
            paddingTop: '130px',
            borderTopRightRadius: '25px',
            borderBottomRightRadius: '25px',
            height: '100%',
        },
        mainHeader: {
            fontWeight: '900',
            fontSize: '48px',
            float: 'left',
        },
        headerDesc: {
            float: 'left',
            marginTop: '15px',
            marginBottom: '15px',
            fontSize: '16px',
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
            width: '130px',
            borderRadius: '15px',
            float: 'left',
            backgroundColor: '#12BFA2',
            fontWeight: 'bold',
            textTransform: 'none',
            color: '#FFF',
            '&:hover': {
                backgroundColor: '#53BCF9',
                color: '#FFF',
            },
        },
        hrBar: {
            marginTop: '80px',
        },
        smallWhiteHeader: {
            fontSize: '16px',
            float: 'left',
            fontWeight: '700',
            marginBottom: '10px',
        },
        largeWhiteHeader: {
            fontWeight: '900',
            fontSize: '48px',
            float: 'left',
        },
        rightSideBackground: {
            display: 'grid',
            textAlign: 'left',
            float: 'left',
        },
        loaderClass: {
            marginLeft: '140px',
        },
    }))

    const classes = useStyles()

    const logIn = async (e) => {
        setLoading(true)
        await Auth.signIn({
            username: email,
            password,
        })
            .then((user) => {
                console.log('here is the user', user)
                setEmail('')
                setPassword('')
                console.log(user)
                props.setToken(user.signInUserSession.idToken.jwtToken)
                setTimeout(function () {
                    props.handleMenuChange('4', 'admin-dashboard')
                    setLoading(false)
                }, 1000)
            })
            .catch((err) => {
                console.log(err)
                if (err.code === 'NotAuthorizedException') {
                    setWrongPassword(true)
                }
                setLoading(false)
            })
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={5}>
                    <Paper className={classes.leftSide}>
                        <div className={classes.mainHeader}>Admin Sign In</div>
                        <hr className={classes.hrBar} />
                        <div className={classes.headerDesc}>Welcome back!</div>
                        {!loading && (
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    error={wrongPassword}
                                    helperText={
                                        wrongPassword
                                            ? 'Incorrect email or password'
                                            : ''
                                    }
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <Grid container xs={12}>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="remember"
                                                    color="primary"
                                                />
                                            }
                                            label="Remember me"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={3}
                                        className="forgotPasswordContainer"
                                    >
                                        <Link
                                            href="/forgotPassword"
                                            variant="body2"
                                            className="login-link"
                                        >
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                    onClick={logIn}
                                >
                                    Log In
                                </Button>
                            </form>
                        )}
                        {loading && (
                            <Grid container>
                                <Grid item>
                                    <div className={classes.loaderClass}>
                                        <CircularProgress
                                            style={{ color: '#12BFA2' }}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        )}
                    </Paper>
                </Grid>

                <Grid item xs={7}>
                    <Paper className={classes.rightSide}>
                        <div className={classes.rightSideBackground}>
                            <div className={classes.smallWhiteHeader}>
                                Newest Update
                            </div>
                            <div className={classes.largeWhiteHeader}>
                                Added Stripe!
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Vestibulum justo risus,
                                fermentum vel facilisis at, commodo eget velit.
                                Usto risus, fermentum vel facilis Lorem ipsum
                                dolor sit amet, consectetur adipiscing elit.
                                Vestibulum justo risus, fermentum vel facilisis
                                at, commodo eget velit.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Vestibulum justo risus,
                                fermentum vel facilisis at, commodo eget velit.
                                Usto risus, fermentum vel facilis Lorem ipsum
                                dolor sit amet, consectetur adipiscing elit.
                                Vestibulum justo risus, fermentum vel facilisis
                                at, commodo eget velit.
                            </p>
                        </div>
                        <div className="imageContainer">
                            <div className="imageRow">
                                <img
                                    src={CellPhonePic}
                                    className="cellPhonePic"
                                    alt="fireSpot"
                                />
                            </div>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default LoginNew
