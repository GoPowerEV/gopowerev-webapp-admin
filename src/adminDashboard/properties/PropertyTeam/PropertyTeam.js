import React, { useState, useEffect } from 'react'
import { Collapse, CircularProgress, Grid } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import './PropertyTeam.css'
import TeamMemberCard from './TeamMemberCard'
import InviteTeamMemberCard from './InviteTeamMemberCard'
import { API_URL_ADMIN } from '../../../constants'

const PropertyTeam = (props) => {
    const [propertyTeamOpened, setPropertyTeamOpened] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [propertyTeam, setPropertyTeam] = useState([])

    const totalAmountInTeam = 3

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
                        setPropertyTeam(result)
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
                        {propertyTeam?.map((teamMember, i) => (
                            <TeamMemberCard key={i} teamMember={teamMember} />
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
