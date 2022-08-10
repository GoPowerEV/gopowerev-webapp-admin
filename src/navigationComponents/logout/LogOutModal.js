import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Auth } from 'aws-amplify'

function getModalStyle() {
    const top = 50
    const left = 50
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const useStyles = makeStyles((theme) => ({
    paper: {
        outline: 'none',
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    submit: {
        fontFamily: 'Nunito Sans, sans-serif !important',
        fontWeight: '900',
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#12BFA2',
        color: '#FFF',
        '&:hover': {
            backgroundColor: '#53BCF9',
            color: '#FFF',
        },
        borderRadius: '5px',
    },
    cancel: {
        fontFamily: 'Nunito Sans, sans-serif !important',
        fontWeight: '900',
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#FFF',
        color: '#000000',
        '&:hover': {
            backgroundColor: '#FFFFFF',
            color: '#000000',
        },
        borderRadius: '5px',
    },
}))

export default function LogoutModal(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [modalStyle] = React.useState(getModalStyle)
    const classes = useStyles()

    const history = useHistory()

    const logOut = async () => {
        setIsLoading(true)
        try {
            await Auth.signOut()
            setIsLoading(false)
            props.setIsAdmin(false)
            props.setLoggedIn(false)
            props.handleClose()
            history.push('/login')
        } catch (error) {
            console.log('error signing out: ', error)
        }
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Are you sure you want to logout?</h2>
            <div id="simple-modal-description">
                <Button
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    onClick={logOut}
                >
                    Yes
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.cancel}
                    onClick={props.handleClose}
                >
                    No
                </Button>
            </div>
            <LogoutModal />
        </div>
    )

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
            {/* <CircularProgress /> */}
        </Modal>
    )
}
