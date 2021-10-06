import React, { useState, useEffect } from 'react'
import { API_URL } from './../../../constants'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import './Installers.css'
import InstallerCard from './InstallerCard'
import CircularProgress from '@material-ui/core/CircularProgress'

const Installers = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [allInstallers, setAllInstallers] = useState([
        {
            name: 'Chris Shatrov',
            location: 'Kansas City, MO',
        },
        {
            name: 'John Smith',
            location: 'Los Angeles, CA',
        },
    ])

    const getAllInstallers = () => {
        setIsLoading(true)
        console.log('getting the list of installers')
        if (props.token) {
            console.log('here', props.token)
            fetch(API_URL + 'admin/users?role=INSTALLER', {
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
                        // setAllInstallers(result.properties)
                        console.log('installers list', result)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    useEffect(() => {
        getAllInstallers()
    }, [])

    return (
        <React.Fragment>
            <div className="propertiesMainBody">
                <div className="tabHeader">All Installers</div>
                <Button className="topButton" variant="contained">
                    All
                </Button>
                <hr className="propertiesHr" />
                <Grid
                    container
                    className="allPropertiesContainer"
                    xs={12}
                    spacing={2}
                >
                    {allInstallers.map((installer, index) => (
                        <Grid item xs={3} key={index}>
                            <InstallerCard installer={installer} />
                        </Grid>
                    ))}
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

export default Installers
