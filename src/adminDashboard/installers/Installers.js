import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import './Installers.css'
import PartnerTable from './PartnerTable'

const Installers = (props) => {
    const [activeTab, setActiveTab] = useState('all')

    const handleTabChange = (tab) => {
        if (tab === 'all') {
            setActiveTab(tab)
        } else {
            setActiveTab(tab)
        }
    }

    return (
        <React.Fragment>
            <div className="propertiesMainBody">
                <div className="tabHeader">Partners</div>
                <Button
                    className={
                        activeTab === 'all'
                            ? 'topButton activeButton'
                            : 'topButton'
                    }
                    variant="contained"
                    onClick={() => handleTabChange('all')}
                >
                    All
                </Button>
                <Button
                    className={
                        activeTab === 'installers'
                            ? 'topButton activeButton'
                            : 'topButton'
                    }
                    variant="contained"
                    onClick={() => handleTabChange('installers')}
                >
                    Installers
                </Button>
                <Grid
                    container
                    className="allPropertiesContainer"
                    xs={12}
                    spacing={2}
                >
                    <PartnerTable token={props.token} />
                </Grid>
            </div>
        </React.Fragment>
    )
}

export default Installers
