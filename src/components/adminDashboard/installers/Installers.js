import React, { useState, useEffect } from 'react'
import { API_URL_ADMIN } from './../../../constants'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import './Installers.css'
import InstallerCard from './InstallerCard'
import CircularProgress from '@material-ui/core/CircularProgress'

const Installers = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [allInstallers, setAllInstallers] = useState([])

    const getAllInstallers = () => {
        setIsLoading(true)
        if (props.token) {
            fetch(API_URL_ADMIN + 'admin/users?role=INSTALLER', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        console.log('result', result)
                        setIsLoading(false)
                        setAllInstallers(result)
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
                    {allInstallers &&
                        allInstallers.map((installer, index) => (
                            <Grid item xs={3} key={index}>
                                <InstallerCard installer={installer} />
                            </Grid>
                        ))}
                    {allInstallers.length === 0 && !isLoading && (
                        <div>There are no installers available.</div>
                    )}
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

export default Installers
