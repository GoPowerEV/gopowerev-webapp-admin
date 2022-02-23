import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import './InstallerTeam.css'

const InstallerCard = (props) => {
    const fontColor = {
        style: { color: 'black' },
    }
    const memberInfo = props.teamMember
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
            </Grid>
        </Grid>
    )
}

export default InstallerCard
