import React, { useState } from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import './InstallerTeam.css'
import AreYouSureModal from './AreYouSureModal'

const InstallerCard = (props) => {
    const fontColor = {
        style: { color: 'black' },
    }
    const memberInfo = props.teamMember

    const [openModal, setOpenModal] = useState(false)

    const handleClose = () => {
        setOpenModal(false)
    }

    return (
        <Grid item lg={4} xs={12} justify="center">
            <Grid container spacing={2}>
                <Grid xs={5} item>
                    <TextField
                        fullWidth
                        className="editableField"
                        id="teamMemberRole"
                        label="Role"
                        variant="outlined"
                        disabled
                        inputProps={fontColor}
                        value="Installer"
                    />
                </Grid>
                <Grid xs={7} item>
                    <TextField
                        fullWidth
                        className="editableField"
                        id="teamMemberName"
                        label="Full Name"
                        variant="outlined"
                        disabled
                        inputProps={fontColor}
                        value={
                            !memberInfo.firstName
                                ? 'No name'
                                : memberInfo.firstName +
                                  ' ' +
                                  memberInfo.lastName
                        }
                    />
                </Grid>
                <Grid xs={12} item>
                    <TextField
                        fullWidth
                        className="editableField"
                        id="teamMemberEmail"
                        label="Email"
                        variant="outlined"
                        disabled
                        inputProps={fontColor}
                        value={memberInfo.email}
                    />
                </Grid>
                <Grid xs={12} item>
                    <Button
                        className="deleteTeamMemberButton"
                        onClick={() => setOpenModal(true)}
                    >
                        Unassign
                    </Button>
                </Grid>
            </Grid>
            <AreYouSureModal
                installerId={memberInfo?.cognitoUUID}
                handleClose={handleClose}
                open={openModal}
                setIsLoading={props.setIsLoading}
                token={props.token}
                propertyUUID={props.propertyUUID}
                reloadPropertyInfo={props.reloadPropertyInfo}
            />
        </Grid>
    )
}

export default InstallerCard
