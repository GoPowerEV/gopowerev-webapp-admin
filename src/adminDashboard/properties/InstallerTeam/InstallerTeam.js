import React, { useState } from 'react'
import { Collapse, CircularProgress, Grid } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined'
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined'
import './InstallerTeam.css'
import InstallerCard from './InstallerCard'
import InviteInstallerCard from './InviteInstallerCard'
const InstallerTeam = (props) => {
    const [installerTeamOpened, setInstallerTeamOpened] = useState(false)

    const installerTeam = []

    const totalAmountInTeam = 3

    const toggleTeamInfo = () => {
        setInstallerTeamOpened(!installerTeamOpened)
    }

    return (
        <>
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
                <Grid item xs={1}>
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
            {!props.isLoading && (
                <Collapse in={installerTeamOpened}>
                    <Grid container spacing={2} xs={11}>
                        {installerTeam.map((teamMember, i) => (
                            <InstallerCard key={i} teamMember={teamMember} />
                        ))}
                        {[
                            ...Array(totalAmountInTeam - installerTeam.length),
                        ].map((e, i) => (
                            <InviteInstallerCard key={i} />
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

export default InstallerTeam
