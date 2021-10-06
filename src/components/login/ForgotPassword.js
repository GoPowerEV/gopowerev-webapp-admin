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

const ForgotPassword = (props) => {
    const [emailField, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const classes = useStyles()

    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Does not match email format')
            .email('Does not match email format'),
    })

    const setEmailField = (setFieldValue, value) => {
        // This is needed to pass to the next, reset password screen.
        props.setUsernameToChangePasswordFor(value)
        setFieldValue('email', value)
        setEmail(value)
    }

    const sendEmail = (values) => {
        setLoading(true)
        Auth.forgotPassword(emailField)
            .then((data) => {
                console.log(data)
                setEmail('')
                setLoading(false)
                
                props.history.push('/resetPassword')
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
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
                    Reset Password
                </Typography>
                {!loading && (
                    <Formik
                        initialValues={{
                            email: '',
                        }}
                        validationSchema={schema}
                        onSubmit={(values) => {
                            sendEmail(values)
                        }}
                    >
                        {(formikProps) => (
                            <Form className={classes.form}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={emailField}
                                    onChange={(e) =>
                                        setEmailField(
                                            formikProps.setFieldValue,
                                            e.target.value
                                        )
                                    }
                                />
                                {formikProps.errors.email ? (
                                    <div
                                        style={{
                                            color: 'red',
                                        }}
                                    >
                                        {formikProps.errors.email}
                                    </div>
                                ) : null}
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
                                    Send email
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

export default ForgotPassword
