import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import { API_URL_ADMIN } from './../../../constants'

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

export default function AreYouSureModal(props) {
    const [modalStyle] = React.useState(getModalStyle)
    const classes = useStyles()

    const deletePerson = () => {
        if (props.token && props.installerId) {
            props.setIsLoading(true)
            const bodyToPost = { cognitoUUID: props.installerId }
            fetch(
                API_URL_ADMIN +
                    'admin/property-administrators/' +
                    props.propertyUUID,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ' + props.token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bodyToPost),
                }
            )
                .then((res) => {
                    props.setIsLoading(false)
                    props.reloadPropertyInfo(props.propertyUUID)
                    res.json()
                })
                .then(
                    (result) => {},
                    (error) => {
                        props.setIsLoading(false)
                    }
                )
        }
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">
                Are you sure you want to remove this person from this property?
            </h2>
            <div id="simple-modal-description">
                <Button
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    onClick={deletePerson}
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
            <AreYouSureModal />
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
