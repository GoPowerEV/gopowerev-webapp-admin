import React from 'react'
import { Grid } from '@material-ui/core'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import './PropertyTeam.css'

const InviteTeamMemberCard = (props) => {
    const inviteTeamMemberCard = () => {
        props.openModal(false)
    }
    return (
        <Grid item lg={4} xs={12} justify="center">
            <div
                className="invite-team-member-card"
                onClick={() => inviteTeamMemberCard()}
            >
                <Grid container spacing={1} justify="center">
                    <Grid item>Invite manager / owner</Grid>
                    <Grid item>
                        <EmailOutlinedIcon />
                    </Grid>
                </Grid>
            </div>
        </Grid>
    )
}

export default InviteTeamMemberCard
