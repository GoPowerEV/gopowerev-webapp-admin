import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import './DashboardTab.css'
import PropertyCardInInstall from './PropertyCardInInstall'
import CircularProgress from '@material-ui/core/CircularProgress'

const DashboardTab = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [allPropertiesFake, setAllPropertiesFake] = useState([
        {
            name: 'Terracina Lakeside Apartments',
            status: 'Installed',
            pictureUrl1:
                'https://media.istockphoto.com/photos/europe-modern-complex-of-residential-buildings-picture-id1165384568?k=6&m=1165384568&s=612x612&w=0&h=EFKcg8aMptUfpr5TCFTyYnHEdDmUL0tmsOT3TWeXl8I=',
            amountOfLcus: 2,
            smartOutletsAmount: 24,
            maxAmps: 13,
        },
        {
            name: 'Evergreen Apartments',
            status: 'Inspected',
            pictureUrl1:
                'https://media.istockphoto.com/photos/europe-modern-complex-of-residential-buildings-picture-id1165384568?k=6&m=1165384568&s=612x612&w=0&h=EFKcg8aMptUfpr5TCFTyYnHEdDmUL0tmsOT3TWeXl8I=',
            amountOfLcus: 2,
            smartOutletsAmount: 24,
            maxAmps: 13,
        },
        {
            name: 'Kelly Park Apartments',
            status: 'Inspected',
            pictureUrl1:
                'data:image/jpeg;base64,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',
            amountOfLcus: 2,
            smartOutletsAmount: 24,
            maxAmps: 13,
        },
        {
            name: 'Hallbrook Apartments',
            status: 'Installed',
            pictureUrl1:
                'https://res.cloudinary.com/g5-assets-cld/image/upload/x_0,y_491,h_4413,w_7356,c_crop/q_auto,f_auto,fl_lossy,g_center,h_1200,w_2000/g5/g5-c-5g13txeqo-mark-taylor-companies-client/g5-cl-1j73ew2zby-the-core-scottsdale/uploads/DSC_7198-Edit-2_1_n06pxw.jpg',
            amountOfLcus: 2,
            smartOutletsAmount: 24,
            maxAmps: 13,
        },
    ])

    useEffect(() => {
        console.log('page loading')
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
                                15
                            </div>
                            <hr className="status-card-hr" />
                            <Button
                                className="status-card-button"
                                variant="contained"
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
                                21
                            </div>
                            <hr className="status-card-hr" />
                            <Button
                                className="status-card-button"
                                variant="contained"
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
                            <div className="status-card-amount boldText">4</div>
                            <hr className="status-card-hr" />
                            <Button
                                className="status-card-button"
                                variant="contained"
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
                                92
                            </div>
                            <hr className="status-card-hr" />
                            <Button
                                className="status-card-button"
                                variant="contained"
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
                                {allPropertiesFake.map((property, index) => (
                                    <Grid item xs={3} key={index}>
                                        <PropertyCardInInstall
                                            property={property}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            <hr className="status-card-hr" />
                            <Button
                                className="view-all-ininstall-button"
                                variant="contained"
                            >
                                View All
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
            {isLoading && (
                <div>
                    <CircularProgress />
                </div>
            )}
        </React.Fragment>
    )
}

export default DashboardTab
