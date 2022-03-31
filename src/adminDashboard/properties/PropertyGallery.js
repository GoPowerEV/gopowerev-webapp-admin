import React, { useState, useEffect } from 'react'
import { Button, Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { API_URL_ADMIN } from './../../constants'
import NoImageAvailable from './../../assets/img/noImageAvailable.png'
import './PropertyGallery.css'

export default function PropertyGallery(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [heroImage, setHeroImage] = useState(null)
    const [photoHeroBinary, setHeroPhotoBinary] = useState(null)
    const [logo, setLogo] = useState(null)
    const [marketingImage, setMarketingImage] = useState(null)
    const [photoLogoBinary, setPhotoLogoBinary] = useState(null)
    const [photoBinary, setPhotoBinary] = useState(null)

    const uploadImage = (imageType, binary) => {
        setIsLoading(true)
        fetch(
            API_URL_ADMIN +
                'admin/property/image/' +
                imageType +
                '/' +
                props.propertyUuid,
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'image/jpg',
                },
                body: binary,
            }
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    getImage(imageType)
                    setIsLoading(false)
                },
                (error) => {
                    setIsLoading(false)
                }
            )
    }

    const getImage = (imageType) => {
        setIsLoading(true)
        fetch(
            API_URL_ADMIN +
                'admin/property/image/' +
                imageType +
                '/' +
                props.propertyUuid,
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
                    if (result) {
                        if (imageType === 'hero') {
                            setHeroImage(result[2])
                        } else if (imageType === 'logo') {
                            setLogo(result[2])
                        } else {
                            setMarketingImage(result[2].url)
                        }
                    }
                    setIsLoading(false)
                },
                (error) => {
                    setIsLoading(false)
                }
            )
    }

    const getBinaryFromImg = (picFile, type) => {
        new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (event) => {
                resolve(event.target.result)
            }

            reader.onerror = (err) => {
                reject(err)
            }

            reader.readAsArrayBuffer(picFile)
        }).then((result) => {
            if (type === 'hero') {
                setHeroPhotoBinary(result)
            } else if (type === 'logo') {
                setPhotoLogoBinary(result)
            } else {
                setPhotoBinary(result)
            }
        })
    }

    // PROPERTY IMAGE
    const hiddenFileInput = React.useRef(null)

    const handleEditImage = () => {
        hiddenFileInput.current.click()
    }

    const handleImagePhotoChange = (event) => {
        event.preventDefault()
        const files = event.target.files
        getBinaryFromImg(files[0], '')
    }

    // HERO IMAGE
    const hiddenHeroFileInput = React.useRef(null)

    const handleEditHero = () => {
        hiddenHeroFileInput.current.click()
    }

    const handleHeroPhotoChange = (event) => {
        event.preventDefault()
        const files = event.target.files
        getBinaryFromImg(files[0], 'hero')
    }

    // LOGO IMAGE
    const hiddenLogoFileInput = React.useRef(null)

    const handleEditLogo = () => {
        hiddenLogoFileInput.current.click()
    }

    const handleLogoPhotoChange = (event) => {
        event.preventDefault()
        const files = event.target.files
        getBinaryFromImg(files[0], 'logo')
    }

    useEffect(() => {
        if (props.token && props.propertyUuid) {
            getImage('logo')
            getImage('hero')
            getImage('marketing')
        }
    }, [props.token, props.propertyUuid])

    useEffect(() => {
        if (photoHeroBinary) {
            uploadImage('hero', photoHeroBinary)
        }
    }, [photoHeroBinary])

    useEffect(() => {
        if (photoLogoBinary) {
            uploadImage('logo', photoLogoBinary)
        }
    }, [photoLogoBinary])

    useEffect(() => {
        if (photoBinary) {
            uploadImage('marketing', photoBinary)
        }
    }, [photoBinary])

    return (
        <div className="gallery-container">
            {!isLoading && (
                <Grid container xs={12} spacing={3}>
                    <Grid item xs={3}>
                        <div>Marketing Image</div>
                        <img
                            alt="Hero Img"
                            src={
                                heroImage?.url.length > 0
                                    ? heroImage.url
                                    : NoImageAvailable
                            }
                            className="galleryImage"
                        />
                        <Button
                            size="small"
                            className="editPropertyImageButton"
                            variant="contained"
                            onClick={() => handleEditHero()}
                        >
                            Edit Property Hero Image
                        </Button>
                        <input
                            type="file"
                            ref={hiddenHeroFileInput}
                            style={{
                                display: 'none',
                            }}
                            onChange={handleHeroPhotoChange}
                        />
                    </Grid>
                    <Grid item xs={3} className="galleryImageContainer">
                        <div>Logo</div>
                        <img
                            alt="Logo Img"
                            src={
                                logo?.url.length > 0
                                    ? logo.url
                                    : NoImageAvailable
                            }
                            className="galleryImage"
                        />
                        <Button
                            size="small"
                            className="editPropertyImageButton"
                            variant="contained"
                            onClick={() => handleEditLogo()}
                        >
                            Edit Logo
                        </Button>
                        <input
                            type="file"
                            ref={hiddenLogoFileInput}
                            style={{
                                display: 'none',
                            }}
                            onChange={handleLogoPhotoChange}
                        />
                    </Grid>
                    <Grid
                        container
                        xs={12}
                        spacing={3}
                        className="gallery-photo-container"
                    >
                        <Grid item xs={3}>
                            <div>Property Images</div>
                            <img
                                alt="Property Img"
                                src={
                                    marketingImage
                                        ? marketingImage
                                        : NoImageAvailable
                                }
                                className="galleryImage"
                            />
                            <Button
                                size="small"
                                className="editPropertyImageButton"
                                variant="contained"
                                onClick={() => handleEditImage()}
                            >
                                Edit
                            </Button>
                            <input
                                type="file"
                                ref={hiddenFileInput}
                                style={{
                                    display: 'none',
                                }}
                                onChange={handleImagePhotoChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            )}
            {isLoading && (
                <div className="loaderContainer">
                    <CircularProgress style={{ color: '#12BFA2' }} />
                </div>
            )}
        </div>
    )
}
