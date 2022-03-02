import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function PropertyGallery(props) {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <div>Gallery stuff here</div>
            {isLoading && (
                <div className="loaderContainer">
                    <CircularProgress style={{ color: '#12BFA2' }} />
                </div>
            )}
        </>
    )
}
