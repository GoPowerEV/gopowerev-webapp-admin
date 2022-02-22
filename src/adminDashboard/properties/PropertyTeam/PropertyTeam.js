import React, { useState } from 'react'
import { Collapse, CircularProgress, Grid } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import './PropertyTeam.css'
import TeamMemberCard from './TeamMemberCard'
import InviteTeamMemberCard from './InviteTeamMemberCard'

const PropertyTeam = (props) => {
    const [propertyTeamOpened, setPropertyTeamOpened] = useState(false)

    const propertyTeam = [
        {
            role: 'Owner',
            fullName: 'Chris Shatrov',
            email: 'shatrovchris@gmail.com',
        },
        {
            role: 'Manager',
            fullName: 'John Smith',
            email: 'smithjohn@gmail.com',
        },
    ]

    const totalAmountInTeam = 3

    const toggleTeamInfo = () => {
        setPropertyTeamOpened(!propertyTeamOpened)
    }

    return (
        <>
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
                <Grid item xs={1}>
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
            {!props.isLoading && (
                <Collapse in={propertyTeamOpened}>
                    <Grid container spacing={2} xs={11}>
                        {propertyTeam.map((teamMember, i) => (
                            <TeamMemberCard key={i} teamMember={teamMember} />
                        ))}
                        {[
                            ...Array(totalAmountInTeam - propertyTeam.length),
                        ].map((e, i) => (
                            <InviteTeamMemberCard key={i} />
                        ))}
                    </Grid>
                </Collapse>
            )}
            {props.isLoading && (
                <div className="loaderContainer">
                    <CircularProgress style={{ color: '#12BFA2' }} />
                </div>
            )}
        </>
    )
}

export default PropertyTeam
