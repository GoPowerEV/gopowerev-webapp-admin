import React, { useState, useEffect } from 'react'
import { Collapse, CircularProgress, Grid, Snackbar } from '@material-ui/core'
import MuiAlert from '@mui/material/Alert'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined'
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined'
import './InstallerTeam.css'
import InstallerCard from './InstallerCard'
import InviteInstallerCard from './InviteInstallerCard'
import { API_URL_ADMIN } from '../../../constants'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const InstallerTeam = (props) => {
    const [installerTeamOpened, setInstallerTeamOpened] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [installerTeam, setInstallerTeam] = useState([])
    const [open, setOpen] = useState(false)
    const [errorMsg, setErrorMsg] = useState()

    const totalAmountInTeam = 3

    const showAlert = () => {
        setOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    const getInstallerTeam = () => {
        setIsLoading(true)
        if (props.token && props.propertyUUID) {
            fetch(
                API_URL_ADMIN +
                    'admin/property-installers/' +
                    props.propertyUUID,
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + props.token,
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoading(false)
                        if (result.code) {
                            setInstallerTeam([])
                            setErrorMsg(result.message)
                            showAlert()
                        } else {
                            setInstallerTeam(result)
                        }
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const toggleTeamInfo = () => {
        setInstallerTeamOpened(!installerTeamOpened)
    }

    useEffect(() => {
        getInstallerTeam()
    }, [props.token, props.propertyUUID])

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    Installer Team: {errorMsg}
                </Alert>
            </Snackbar>
            <hr className="propertiesHrLcu" />
            <Grid container justifyContent="space-between">
                <Grid item>
                    <div className="greyHeader">
                        <EngineeringOutlinedIcon
                            fontSize="large"
                            sx={{ marginRight: '5px', marginTop: '-4px' }}
                        />
                        Installer Team
                    </div>
                </Grid>
                <Grid item>
                    {!installerTeamOpened ? (
                        <ExpandMoreIcon
                            className="expandIcon"
                            onClick={toggleTeamInfo}
                        />
                    ) : (
                        <ExpandLessIcon
                            className="expandIcon"
                            onClick={toggleTeamInfo}
                        />
                    )}
                </Grid>
            </Grid>
            {!isLoading && (
                <Collapse in={installerTeamOpened}>
                    <Grid container spacing={2} xs={11}>
                        {installerTeam &&
                            installerTeam?.map((teamMember, i) => (
                                <InstallerCard
                                    key={i}
                                    teamMember={teamMember}
                                    setIsLoading={setIsLoading}
                                    token={props.token}
                                    propertyUUID={props.propertyUUID}
                                    reloadPropertyInfo={
                                        props.reloadPropertyInfo
                                    }
                                />
                            ))}
                        {[
                            ...Array(totalAmountInTeam - installerTeam?.length),
                        ].map((e, i) => (
                            <InviteInstallerCard
                                key={i}
                                openModal={props.openModal}
                            />
                        ))}
                    </Grid>
                </Collapse>
            )}
            {isLoading && (
                <div className="loaderContainer">
                    <CircularProgress style={{ color: '#12BFA2' }} />
                </div>
            )}
        </>
    )
}

export default InstallerTeam
