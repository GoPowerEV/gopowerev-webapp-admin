import React, { useState, useEffect } from 'react'
import { Collapse, CircularProgress, Grid, Snackbar } from '@material-ui/core'
import MuiAlert from '@mui/material/Alert'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import './PropertyTeam.css'
import TeamMemberCard from './TeamMemberCard'
import InviteTeamMemberCard from './InviteTeamMemberCard'
import { API_URL_ADMIN } from '../../../constants'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const PropertyTeam = (props) => {
    const [propertyTeamOpened, setPropertyTeamOpened] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [propertyTeam, setPropertyTeam] = useState([])
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

    const getPropertyTeam = () => {
        setIsLoading(true)
        if (props.token && props.propertyUUID) {
            fetch(
                API_URL_ADMIN +
                    'admin/property-administrators/' +
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
                            setPropertyTeam([])
                            setErrorMsg(result.message)
                            showAlert()
                        } else {
                            setPropertyTeam(result)
                        }
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const toggleTeamInfo = () => {
        setPropertyTeamOpened(!propertyTeamOpened)
    }

    useEffect(() => {
        getPropertyTeam()
    }, [props.token, props.propertyUUID])

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    Property Team: {errorMsg}
                </Alert>
            </Snackbar>
            <hr className="propertiesHrLcu" />
            <Grid container justifyContent="space-between">
                <Grid item>
                    <div className="greyHeader">
                        <GroupsOutlinedIcon
                            fontSize="large"
                            sx={{ marginRight: '5px', marginTop: '-4px' }}
                        />
                        Property Team
                    </div>
                </Grid>
                <Grid item justifyContent="flex-end">
                    {!propertyTeamOpened ? (
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
                <Collapse in={propertyTeamOpened}>
                    <Grid container spacing={2} xs={11}>
                        {propertyTeam &&
                            propertyTeam?.map((teamMember, i) => (
                                <TeamMemberCard
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
                            ...Array(totalAmountInTeam - propertyTeam.length),
                        ].map((e, i) => (
                            <InviteTeamMemberCard
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

export default PropertyTeam
