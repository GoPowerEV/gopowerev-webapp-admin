import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { API_URL_ADMIN } from '../../../constants'
import ModalDataGrid from './ModalDataGrid'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'
import {
    Button,
    FormControl,
    InputLabel,
    CircularProgress,
    TextField,
    Select,
    MenuItem,
} from '@material-ui/core'
import './AddTeamMemberModal.css'

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
        width: 940,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '10px',
        fontFamily: 'Nunito Sans, sans-serif !important',
    },
}))

const allRoles = [
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Installer', value: 'INSTALLER' },
    { label: 'Property Manager', value: 'PROPERTY_MANAGER' },
    { label: 'Property Owner', value: 'PROPERTY_OWNER' },
]

const installerOnly = [{ label: 'Installer', value: 'INSTALLER' }]

const allRolesWithoutInstaller = [
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Property Manager', value: 'PROPERTY_MANAGER' },
    { label: 'Property Owner', value: 'PROPERTY_OWNER' },
]

export default function AddTeamMemberModal(props) {
    const [inviteRole, setInviteRole] = useState(undefined)
    const [inviteName, setInviteName] = useState(undefined)
    const [inviteEmail, setInviteEmail] = useState(undefined)
    const [role, setRole] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [disableAssignButton, setDisableAssignButton] = useState(true)
    const [disableButton, setDisableButton] = useState(true)
    const [gridData, setGridData] = useState([])
    const [selectionModel, setSelectionModel] = React.useState([])
    const [modalStyle] = useState(getModalStyle)
    const classes = useStyles()

    const handleRoleChange = (value) => {
        setRole(value)
    }

    const handleInviteRoleChange = (value) => {
        setInviteRole(value)
    }

    const loadAllInstallers = () => {
        setIsLoading(true)
        if (props.token) {
            fetch(API_URL_ADMIN + 'admin/users?role=INSTALLER', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoading(false)
                        setGridData(result)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const loadAllAdmins = () => {
        setIsLoading(true)
        if (props.token) {
            fetch(API_URL_ADMIN + 'admin/property-administrators', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoading(false)
                        setGridData(result)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const handleAssignClick = () => {
        if (props.showInstaller) {
            if (selectionModel?.length > 0) {
                selectionModel.forEach((element) => {
                    props.setInstaller(element)
                })
            }
        }
    }

    useEffect(() => {
        props.showInstaller ? loadAllInstallers() : loadAllAdmins()
    }, [props.showInstaller, props.token])

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className="partnerModalHeader">Add Partner</div>
            <div>
                {isLoading && (
                    <div className="loaderContainer">
                        <CircularProgress
                            style={{ color: '#12BFA2', marginBottom: '35px' }}
                        />
                    </div>
                )}
                {!isLoading && (
                    <>
                        <Grid container xs={12} alignItems="center">
                            <Grid item xs={3} className="smallHeader">
                                Search partners by:
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel
                                        id="userRole"
                                        style={{
                                            paddingLeft: '15px',
                                            top: '-7px',
                                        }}
                                    >
                                        Role
                                    </InputLabel>
                                    <Select
                                        labelId="userRole"
                                        variant="outlined"
                                        id="userRole"
                                        value={role}
                                        label="Role"
                                        onChange={(e) =>
                                            handleRoleChange(e.target.value)
                                        }
                                        style={{
                                            fontWeight: 'bold',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        {props.showInstaller
                                            ? installerOnly.map((role) => (
                                                  <MenuItem value={role.value}>
                                                      {role.label}
                                                  </MenuItem>
                                              ))
                                            : allRolesWithoutInstaller.map(
                                                  (role) => (
                                                      <MenuItem
                                                          value={role.value}
                                                      >
                                                          {role.label}
                                                      </MenuItem>
                                                  )
                                              )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <ModalDataGrid
                                    data={gridData}
                                    setSelectionModel={setSelectionModel}
                                    showInstaller={props.showInstaller}
                                    setDisableAssignButton={
                                        setDisableAssignButton
                                    }
                                />
                            </Grid>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Button
                                        className="assignButton"
                                        variant="contained"
                                        disabled={disableAssignButton}
                                        onClick={handleAssignClick}
                                    >
                                        Assign
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <hr className="partner-dotted-hr" />
                        <Grid container xs={12} spacing={1} alignItems="center">
                            <Grid item xs={12} className="smallHeader">
                                -OR- Invite New Partner
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth size="small">
                                    <InputLabel
                                        id="userInviteRole"
                                        style={{
                                            paddingLeft: '15px',
                                            top: '-7px',
                                        }}
                                    >
                                        Role
                                    </InputLabel>
                                    <Select
                                        labelId="userInviteRole"
                                        variant="outlined"
                                        id="userInviteRole"
                                        value={inviteRole}
                                        label="Role"
                                        onChange={(e) =>
                                            handleInviteRoleChange(
                                                e.target.value
                                            )
                                        }
                                        style={{
                                            fontWeight: 'bold',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        {allRoles.map((role) => (
                                            <MenuItem value={role.value}>
                                                {role.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    className="editablePartnerField"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    id="inviteName"
                                    label="Name"
                                    name="id"
                                    autoComplete="id"
                                    autoFocus
                                    value={inviteName}
                                    // onChange={(e) => setUserId(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    className="editablePartnerField"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    id="inviteEmail"
                                    label="Email"
                                    name="id"
                                    autoComplete="id"
                                    autoFocus
                                    value={inviteEmail}
                                    // onChange={(e) => setUserId(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <hr className="partner-dotted-hr" />
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button
                                    className="sendPartnerInviteButton"
                                    variant="contained"
                                    disabled={disableButton}
                                >
                                    Send Invitation
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}
            </div>
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
        </Modal>
    )
}
