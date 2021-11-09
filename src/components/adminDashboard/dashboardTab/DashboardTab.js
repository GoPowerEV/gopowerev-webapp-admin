import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { API_URL } from './../../../constants'
import './DashboardTab.css'
import PropertyCardInInstall from './PropertyCardInInstall'
import CircularProgress from '@material-ui/core/CircularProgress'

const DashboardTab = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [readyPropertyCount, setReadyPropertyCount] = useState(0)
    const [pendingPropertyCount, setPendingPropertyCount] = useState(0)
    const [newPropertyCount, setNewPropertyCount] = useState(0)
    const [activePropertyCount, setActivePropertyCount] = useState(0)
    const [propertiesInInstall, setPropertiesInInstall] = useState([])

    const getPropertyCount = (status) => {
        setIsLoading(true)
        if (props.token) {
            fetch(API_URL + 'properties', {
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
                        if (status === 'operational') {
                            setActivePropertyCount(
                                result.properties.filter(
                                    (property) => property.status === status
                                ).length
                            )
                        } else if (status === 'new') {
                            setNewPropertyCount(
                                result.properties.filter(
                                    (property) => property.status === status
                                ).length
                            )
                        } else if (status === 'pending') {
                            setPendingPropertyCount(
                                result.properties.filter(
                                    (property) => property.status === status
                                ).length
                            )
                        } else if (status === 'in-install') {
                            setPropertiesInInstall(
                                result.properties
                                    .filter(
                                        (property) => property.status === status
                                    )
                                    .slice(0, 4)
                            )
                        } else {
                            setReadyPropertyCount(
                                result.properties.filter(
                                    (property) => property.status === status
                                ).length
                            )
                        }
                        console.log('all properties', result.properties)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    useEffect(() => {
        getPropertyCount('operational')
        getPropertyCount('new')
        getPropertyCount('pending')
        getPropertyCount('ready-for-installation')
        getPropertyCount('in-install')
    }, [])

    return (
        <React.Fragment>
            <div className="propertiesMainBody">
                <div className="tabHeader">My Properties</div>
                <Grid
                    container
                    className="allDashboardItemsContainer"
                    xs={12}
                    spacing={2}
                >
                    <Grid item xs={3}>
                        <div className="status-card">
                            <div className="status-card-header boldText">
                                Ready for Install
                            </div>
                            <div className="status-card-amount boldText">
                                {isLoading && (
                                    <div className="propertyCountLoader">
                                        <CircularProgress
                                            style={{ color: '#12BFA2' }}
                                        />
                                    </div>
                                )}
                                {!isLoading && readyPropertyCount}
                            </div>
                            <hr className="status-card-hr" />
                            <Button
                                className="status-card-button"
                                variant="contained"
                                onClick={() => props.goToInstallers()}
                            >
                                Add Installer
                            </Button>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div className="status-card">
                            <div className="status-card-header boldText">
                                Pending
                            </div>
                            <div className="status-card-amount boldText">
                                {isLoading && (
                                    <div className="propertyCountLoader">
                                        <CircularProgress
                                            style={{ color: '#12BFA2' }}
                                        />
                                    </div>
                                )}
                                {!isLoading && pendingPropertyCount}
                            </div>
                            <hr className="status-card-hr" />
                            <Button
                                className="status-card-button"
                                variant="contained"
                                onClick={() => props.goToProperties()}
                            >
                                Resolve
                            </Button>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div className="status-card">
                            <div className="status-card-header boldText">
                                New
                            </div>
                            <div className="status-card-amount boldText">
                                {isLoading && (
                                    <div className="propertyCountLoader">
                                        <CircularProgress
                                            style={{ color: '#12BFA2' }}
                                        />
                                    </div>
                                )}
                                {!isLoading && newPropertyCount}
                            </div>
                            <hr className="status-card-hr" />
                            <Button
                                className="status-card-button"
                                variant="contained"
                                onClick={() => props.goToProperties()}
                            >
                                View All
                            </Button>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div className="status-card">
                            <div className="status-card-header boldText">
                                Active
                            </div>
                            <div className="status-card-amount boldText">
                                {isLoading && (
                                    <div className="propertyCountLoader">
                                        <CircularProgress
                                            style={{ color: '#12BFA2' }}
                                        />
                                    </div>
                                )}
                                {!isLoading && activePropertyCount}
                            </div>
                            <hr className="status-card-hr" />
                            <Button
                                className="status-card-button"
                                variant="contained"
                                onClick={() => props.goToProperties()}
                            >
                                View All
                            </Button>
                        </div>
                    </Grid>
                </Grid>

                <div className="tabHeader inInstallHeader">
                    My Properties In-Install
                </div>
                <Grid
                    container
                    className="allDashboardItemsContainer"
                    xs={12}
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <div className="status-card-ininstall">
                            <Grid
                                container
                                className="allPropertiesContainer"
                                xs={12}
                                spacing={2}
                            >
                                {!isLoading &&
                                    propertiesInInstall?.map(
                                        (property, index) => (
                                            <Grid item xs={3} key={index}>
                                                <PropertyCardInInstall
                                                    property={property}
                                                />
                                            </Grid>
                                        )
                                    )}
                                {!isLoading &&
                                    propertiesInInstall.length === 0 && (
                                        <div className="no-properties-warning">
                                            There are currently no properties
                                            pending installation.
                                        </div>
                                    )}
                                {isLoading && (
                                    <div className="propertyCountLoader">
                                        <CircularProgress
                                            style={{ color: '#12BFA2' }}
                                        />
                                    </div>
                                )}
                            </Grid>
                            <hr className="status-card-hr" />
                            <Button
                                className="view-all-ininstall-button"
                                variant="contained"
                                onClick={() => props.goToProperties()}
                            >
                                View All
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
            {isLoading && (
                <div>
                    <CircularProgress style={{ color: '#12BFA2' }} />
                </div>
            )}
        </React.Fragment>
    )
}

export default DashboardTab
