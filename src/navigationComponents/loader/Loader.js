import React from 'react'
import { CircularProgress } from '@material-ui/core'
import './Loader.css'

const Loader = () => {
    return (
        <div className="loader-container">
            <CircularProgress color="success" />
        </div>
    )
}

export default Loader
