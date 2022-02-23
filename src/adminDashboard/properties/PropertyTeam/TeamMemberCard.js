import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import './PropertyTeam.css'

const TeamMemberCard = (props) => {
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
                        value={memberInfo.role}
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
                        value={memberInfo.fullName}
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

export default TeamMemberCard
