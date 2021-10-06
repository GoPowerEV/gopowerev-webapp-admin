import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import { Formik, Form } from 'formik'
import { Auth } from 'aws-amplify'
import * as yup from 'yup'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#16a44a',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#16a44a',
        color: '#FFF',
        '&:hover': {
            backgroundColor: '#53BCF9',
            color: '#FFF',
        },
    },
}))

const ResetPassword = (props) => {
    const email = useState(props.email)
    const [codeField, setCodeField] = useState('')
    const [passwordField, setPasswordField] = useState('')
    const [passwordNotSafe, setPasswordNotSafe] = useState(false)
    const [loading, setLoading] = useState(false)

    const classes = useStyles()

    const schema = yup.object().shape({
        code: yup.string().required('Code is required. Check your email'),
        password: yup.string().required('Password is required'),
    })

    const changePassword = (values) => {
        setLoading(true)
        Auth.forgotPasswordSubmit(email, codeField, passwordField)
            .then((data) => {
                console.log(data)
                setPasswordField('')
                setCodeField('')
                setPasswordNotSafe(false)
                setLoading(false)
                alert('Password changed. Please log in')
                props.history.push('/login')
            })
            .catch((err) => {
                setLoading(false)
                if (err.code === 'InvalidPasswordException') {
                    setPasswordNotSafe(true)
                }
                console.log(err)
            })
    }

    const setPassword = (setFieldValue, value) => {
        setFieldValue('password', value)
        setPasswordField(value)
    }

    const setCode = (setFieldValue, value) => {
        setFieldValue('code', value)
        setCodeField(value)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography
                    component="h1"
                    variant="h5"
                    className="login-header"
                >
                    Email sent!
                </Typography>
                {!loading && (
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            code: '',
                        }}
                        validationSchema={schema}
                        onSubmit={(values) => {
                            changePassword(values)
                        }}
                    >
                        {(formikProps) => (
                            <Form className={classes.form}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="code"
                                    label="Code"
                                    id="code"
                                    value={codeField}
                                    onChange={(e) =>
                                        setCode(
                                            formikProps.setFieldValue,
                                            e.target.value
                                        )
                                    }
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="New Password"
                                    type="password"
                                    id="password"
                                    value={passwordField}
                                    error={passwordNotSafe}
                                    helperText={
                                        passwordNotSafe
                                            ? 'Password did not conform with our policy: Password must have uppercase and sybmol character(s)'
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setPassword(
                                            formikProps.setFieldValue,
                                            e.target.value
                                        )
                                    }
                                    autoComplete="current-password"
                                />

                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    disabled={
                                        !formikProps.isValid ||
                                        !formikProps.dirty
                                    }
                                    className={classes.submit}
                                >
                                    Reset
                                </Button>
                                <Grid item>
                                    <Link
                                        href="/signUp"
                                        variant="body2"
                                        className="login-link"
                                    >
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                )}
                {loading && (
                    <div className={classes.loaderClass}>
                        <CircularProgress />
                    </div>
                )}
            </div>
        </Container>
    )
}

export default ResetPassword
