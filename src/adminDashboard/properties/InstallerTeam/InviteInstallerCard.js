import React from 'react'
import { Grid } from '@material-ui/core'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import './InstallerTeam.css'

const InviteInstallerCard = (props) => {
    return (
        <Grid item lg={4} xs={12} justify="center">
            <div className="invite-team-member-card">
                <Grid container spacing={1} justify="center">
                    <Grid item>Invite Installer</Grid>
                    <Grid item>
                        <EmailOutlinedIcon />
                    </Grid>
                </Grid>
            </div>
        </Grid>
    )
}

export default InviteInstallerCard
