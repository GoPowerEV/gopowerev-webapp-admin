import React, { useState, useEffect } from 'react'
import { API_URL } from '../../constants'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import NoImageAvailable from './../../assets/img/noImageAvailable.png'
import Grid from '@material-ui/core/Grid'
import { API_URL_ADMIN } from '../../constants'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import EvStationOutlinedIcon from '@material-ui/icons/EvStationOutlined'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined'
import WifiOutlinedIcon from '@material-ui/icons/WifiOutlined'
import TextField from '@material-ui/core/TextField'
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'
import SmartOutlets from './propertySmartOutlets/SmartOutlets'
import './Properties.css'
import { getBadgeClass, getBadgeText } from './utils/PropertyUtils'
import LocationCard from './LocationCard'
import { useHistory } from 'react-router-dom'

const CurrentlyViewedProperty = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [updateIsLoading, setUpdateIsLoading] = useState(false)
    const [property, setProperty] = useState({})
    const [propertyName, setPropertyName] = useState('')
    const [propertyAddress, setPropertyAddress] = useState('')
    const [propertyCity, setPropertyCity] = useState('')
    const [propertyState, setPropertyState] = useState('')
    const [propertyZip, setPropertyZip] = useState('')
    const [propertyContactName, setPropertyContactName] = useState('')
    const [propertyContactEmail, setPropertyContactEmail] = useState('')
    const [propertyContactPhone, setPropertyContactPhone] = useState('')
    const [propertyInfoOpened, setPropertyInfoOpened] = useState(true)
    const [lcuInfoOpened, setLcuInfoOpened] = useState(false)
    const [lcuInfoOpened2, setLcuInfoOpened2] = useState(false)
    const locations = props.locations ?? null
    const lcus = props.lcus ?? null
    const smartOutlets = props.smartOutlets ?? null

    const history = useHistory()

    const togglePropertyInfo = () => {
        setPropertyInfoOpened(!propertyInfoOpened)
    }

    const toggleLcuInfo = () => {
        setLcuInfoOpened(!lcuInfoOpened)
    }

    const savePropertyInfo = () => {
        setIsLoading(true)
        if (props.token) {
            let tempPropertyData = property
            Object.keys(tempPropertyData).forEach(function (key, index) {
                console.log('here it is', key)
                console.log('here it is', tempPropertyData[key])
                if (tempPropertyData[key] === 'None') {
                    tempPropertyData[key] = null
                    setProperty(tempPropertyData)
                }
            })
            console.log('about to save this info', tempPropertyData)
            fetch(API_URL + 'properties/' + property.propertyUUID, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempPropertyData),
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoading(false)
                        console.log('save property success', result)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const handlePropertyFieldChange = (value, field) => {
        if (field === 'name') {
            setPropertyName(value)
        } else if (field === 'contactName') {
            setPropertyContactName(value)
        } else if (field === 'contactEmail') {
            setPropertyContactEmail(value)
        } else if (field === 'contactPhone1') {
            setPropertyContactPhone(value)
        } else if (field === 'streetAddress1') {
            setPropertyAddress(value)
        } else if (field === 'city') {
            setPropertyCity(value)
        } else if (field === 'state') {
            setPropertyState(value)
        } else if (field === 'zipcode') {
            setPropertyZip(value)
        }
        console.log('changing name of the property to ', value)
        let tempPropertyData = property
        tempPropertyData[field] = value
        setProperty(tempPropertyData)
        console.log(tempPropertyData)
    }

    const updateSmartOutletSoftware = () => {
        setUpdateIsLoading(true)
        if (props.token) {
            const bodyToSend = { propertyUUID: property.propertyUUID }
            fetch(API_URL_ADMIN + 'admin/trigger-so-update', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyToSend),
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        setUpdateIsLoading(false)
                        console.log('update firmware success', result)
                        setUpdateSuccess(true)
                        setTimeout(function () {
                            setUpdateSuccess(false)
                        }, 2000)
                    },
                    (error) => {
                        setUpdateIsLoading(false)
                    }
                )
        }
    }

    useEffect(() => {
        console.log('prop details', props.property)
        setProperty(props.property)
        setPropertyName(props.property.name)
        setPropertyAddress(props.property.address1)
        setPropertyCity(props.property.city)
        setPropertyState(props.property.state)
        setPropertyZip(props.property.zipcode)
        setPropertyContactName(props.property.contactName)
        setPropertyContactEmail(props.property.contactEmail)
        setPropertyContactPhone(props.property.contactPhone1)
        console.log('locations', locations)
        console.log('lcus', lcus)
        console.log('smart outlets', smartOutlets)
        document.querySelector('body').scrollTo(0, 0)
    }, [])

    return (
        <div className="propertiesMainBody">
            <div className="tabHeader">
                <span
                    className="textAsLink"
                    onClick={props.closeOpenedProperty}
                >
                    My Properties
                </span>
                <span className="boldTex"> - Property</span>
            </div>
            {!propertyInfoOpened && (
                <Grid container xs={12} spacing={3} className="lcuContainer">
                    <Grid item xs={3} className="lcuHeaderColumn">
                        <span className="lcuLocation">{property.name}</span>
                    </Grid>
                    <Grid item xs={3}>
                        {property.address1 !== null && (
                            <span>
                                {property.address1}, {property.city},{' '}
                                {property.state} {property.zipcode}
                            </span>
                        )}
                        {!property.address1 && (
                            <span>No address available</span>
                        )}
                    </Grid>
                    <Grid item xs={5}>
                        {property.contactName}
                    </Grid>
                    <Grid item xs={1}>
                        <ExpandMoreIcon
                            className="expandIconFirstPortion"
                            onClick={togglePropertyInfo}
                        />
                    </Grid>
                </Grid>
            )}
            <Collapse in={propertyInfoOpened}>
                <Grid container className="singlePropertyContainer" xs={12}>
                    <Grid item xs={4}>
                        <img
                            alt="Property Img"
                            src={property.pictureUrl1 ?? NoImageAvailable}
                            className="viewedPropertyMainImage"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <div className="viewedPropertyInfoContainer">
                            <Grid container xs={12}>
                                <Grid item xs={11}>
                                    <div className="viewedPropertyTitle">
                                        {property.name}
                                    </div>
                                </Grid>
                                <Grid item xs={1}>
                                    <div>
                                        <ExpandLessIcon
                                            className="expandIconFirstPortionOpened"
                                            onClick={togglePropertyInfo}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            {property.status !== undefined && (
                                <div className={getBadgeClass(property.status)}>
                                    {property.status.charAt(0).toUpperCase() +
                                        property.status.slice(1)}
                                </div>
                            )}
                            {!isLoading && (
                                <div className="editInfoContainer">
                                    <Grid container xs={12} spacing={3}>
                                        <Grid item lg={6} xs={12}>
                                            <div className="editInfoItem">
                                                <FlashOnOutlinedIcon />
                                                <span>
                                                    {property.maxVoltAmps} Max
                                                    Volt Amps
                                                </span>
                                            </div>
                                        </Grid>
                                        <Grid item lg={6} xs={12}>
                                            <div className="editInfoItem">
                                                <WifiOutlinedIcon />
                                                <span>
                                                    {smartOutlets
                                                        ? smartOutlets.length
                                                        : '0'}{' '}
                                                    Smart Outlets
                                                </span>
                                            </div>
                                        </Grid>
                                        <Grid item lg={6} xs={12}>
                                            <div className="editInfoItem">
                                                <EvStationOutlinedIcon />
                                                <span>
                                                    {lcus ? lcus.length : '0'}{' '}
                                                    LCU(s)
                                                </span>
                                            </div>
                                        </Grid>
                                        <Grid item lg={6} xs={12}>
                                            <div className="editInfoItem">
                                                Type Of Power Service:
                                                <span> 1P-240</span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="filled-basic"
                                                label="Property Name"
                                                variant="filled"
                                                value={propertyName}
                                                onChange={(e) =>
                                                    handlePropertyFieldChange(
                                                        e.target.value,
                                                        'name'
                                                    )
                                                }
                                                onBlur={() =>
                                                    savePropertyInfo()
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <EditOutlinedIcon />
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="filled-basic"
                                                label="Street"
                                                variant="filled"
                                                value={propertyAddress}
                                                onChange={(e) =>
                                                    handlePropertyFieldChange(
                                                        e.target.value,
                                                        'streetAddress1'
                                                    )
                                                }
                                                onBlur={() =>
                                                    savePropertyInfo()
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <EditOutlinedIcon />
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item lg={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                id="filled-basic"
                                                label="City"
                                                variant="filled"
                                                value={propertyCity}
                                                onChange={(e) =>
                                                    handlePropertyFieldChange(
                                                        e.target.value,
                                                        'city'
                                                    )
                                                }
                                                onBlur={() =>
                                                    savePropertyInfo()
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <EditOutlinedIcon />
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item lg={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                id="filled-basic"
                                                label="Zip Code"
                                                variant="filled"
                                                value={propertyZip}
                                                onChange={(e) =>
                                                    handlePropertyFieldChange(
                                                        e.target.value,
                                                        'zipcode'
                                                    )
                                                }
                                                onBlur={() =>
                                                    savePropertyInfo()
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <EditOutlinedIcon />
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item lg={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                id="filled-basic"
                                                label="State"
                                                variant="filled"
                                                value={propertyState}
                                                InputProps={{
                                                    endAdornment: (
                                                        <EditOutlinedIcon />
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        {!updateIsLoading && !updateSuccess && (
                                            <Grid item lg={6} xs={12}>
                                                <Button
                     x                               className="updateOutletSoftwareBtn"
                                                    variant="contained"
                                                    onClick={() =>
                                                        updateSmartOutletSoftware()
                                                    }
                                                >
                                                    Update Smart Outlet Software
                                                </Button>
                                            </Grid>
                                        )}
                                        {updateIsLoading && !updateSuccess && (
                                            <div className="updateLoaderContainer">
                                                <CircularProgress
                                                    style={{ color: '#12BFA2' }}
                                                />
                                            </div>
                                        )}
                                        {!updateIsLoading && updateSuccess && (
                                            <div className="update-success">
                                                Updated successfully.
                                            </div>
                                        )}
                                    </Grid>
                                </div>
                            )}

                            {isLoading && (
                                <div className="loaderContainer">
                                    <CircularProgress
                                        style={{ color: '#12BFA2' }}
                                    />
                                </div>
                            )}
                        </div>
                    </Grid>
                </Grid>
                {!isLoading && (
                    <Grid
                        container
                        className="singlePropertyContainer"
                        xs={12}
                        spacing={3}
                    >
                        <Grid item xs={12}>
                            <div className="viewedPropertyContactInfoContainer">
                                <div className="propertyContactDetailsHeader">
                                    <span>Property Contact Details</span>
                                </div>
                                {isLoading && (
                                    <div className="loaderContainer">
                                        <CircularProgress
                                            style={{ color: '#12BFA2' }}
                                        />
                                    </div>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="filled-basic"
                                fullWidth
                                label="Property Contact Name"
                                variant="filled"
                                value={propertyContactName}
                                onChange={(e) =>
                                    handlePropertyFieldChange(
                                        e.target.value,
                                        'contactName'
                                    )
                                }
                                onBlur={() => savePropertyInfo()}
                                InputProps={{
                                    endAdornment: <EditOutlinedIcon />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="filled-basic"
                                fullWidth
                                label="Property Contact Email"
                                variant="filled"
                                value={propertyContactEmail}
                                onChange={(e) =>
                                    handlePropertyFieldChange(
                                        e.target.value,
                                        'contactEmail'
                                    )
                                }
                                onBlur={() => savePropertyInfo()}
                                InputProps={{
                                    endAdornment: <EditOutlinedIcon />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="filled-basic"
                                label="Property Contact Phone"
                                variant="filled"
                                value={propertyContactPhone}
                                onChange={(e) =>
                                    handlePropertyFieldChange(
                                        e.target.value,
                                        'contactPhone1'
                                    )
                                }
                                onBlur={() => savePropertyInfo()}
                                InputProps={{
                                    endAdornment: <EditOutlinedIcon />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="filled-basic"
                                label="Current Assigned Installer"
                                variant="filled"
                                value={property.installerUUID}
                                InputProps={{
                                    endAdornment: <EditOutlinedIcon />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="filled-basic"
                                label="Notes"
                                variant="filled"
                                value={property.notes}
                                InputProps={{
                                    endAdornment: <EditOutlinedIcon />,
                                }}
                            />
                        </Grid>
                    </Grid>
                )}
            </Collapse>
            {lcus &&
                lcus.map((lcu, index) => (
                    <React.Fragment>
                        <hr className="propertiesHrLcu" />
                        <div className="greyHeader">
                            <EvStationOutlinedIcon />
                            LCUs
                        </div>
                        <Grid
                            container
                            xs={12}
                            spacing={2}
                            className="lcuContainer"
                        >
                            <Grid item xs={2} className="lcuHeaderColumn">
                                <div className="lcuLocation">
                                    {lcu.name ?? 'No LCU Name'}
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className={getBadgeClass(lcu.adminStatus)}>
                                    {getBadgeText(lcu.adminStatus)}
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className="lcuHeader">
                                    Operational Status
                                </div>
                                <div className="lcuRowText">
                                    {lcu.operationalStatus &&
                                        lcu.operationalStatus[0].toUpperCase() +
                                            lcu.operationalStatus.slice(1)}
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div className="lcuHeader">Heartbeat</div>
                                <div className="lcuRowText">
                                    {lcu.heartbeat ?? '-'}
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className="lcuHeader">Installed</div>
                                <div className="lcuRowText">
                                    {lcu.installedDate ?? '-'}
                                </div>
                            </Grid>
                            <Grid item xs={1}>
                                {!lcuInfoOpened ? (
                                    <ExpandMoreIcon
                                        className="expandIcon"
                                        onClick={toggleLcuInfo}
                                    />
                                ) : (
                                    <ExpandLessIcon
                                        className="expandIcon"
                                        onClick={toggleLcuInfo}
                                    />
                                )}
                            </Grid>
                        </Grid>
                        <Collapse in={lcuInfoOpened}>
                            <Grid
                                container
                                spacing={1}
                                className="editLcuDetailsContainer"
                            >
                                <Grid item lg={3} md={6} s={12} xs={12}>
                                    <TextField
                                        fullWidth
                                        id="filled-basic"
                                        label="LCU Name"
                                        variant="filled"
                                        value={lcu.name}
                                        InputProps={{
                                            endAdornment: <EditOutlinedIcon />,
                                        }}
                                    />
                                </Grid>
                                <Grid item lg={3} md={6} s={12} xs={12}>
                                    <TextField
                                        fullWidth
                                        id="filled-basic"
                                        label="IMEI"
                                        variant="filled"
                                        value="XXXXXXXXXXXXXXXXXXX"
                                        InputProps={{
                                            endAdornment: <EditOutlinedIcon />,
                                        }}
                                    />
                                </Grid>
                                <Grid item lg={3} md={6} s={12} xs={12}>
                                    <TextField
                                        fullWidth
                                        id="filled-basic"
                                        label="SIM"
                                        variant="filled"
                                        value="XXXXXXXXXXXXXXXXXXX"
                                        InputProps={{
                                            endAdornment: <EditOutlinedIcon />,
                                        }}
                                    />
                                </Grid>
                                <Grid item lg={3} md={6} s={12} xs={12}>
                                    <TextField
                                        fullWidth
                                        id="filled-basic"
                                        label="Line"
                                        variant="filled"
                                        value="XXXXXXXXXXXXXXXXXXX"
                                        InputProps={{
                                            endAdornment: <EditOutlinedIcon />,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Collapse>
                        <hr className="propertiesHrLcu" />
                        <div className="tabHeader inInstallHeader">
                            Locations
                        </div>
                        <Grid
                            container
                            className="allDashboardItemsContainer"
                            xs={12}
                            spacing={2}
                        >
                            <Grid item xs={12}>
                                {locations?.map((location, index) => (
                                    <div className="status-card-ininstall">
                                        <Grid
                                            container
                                            className="allPropertiesContainer"
                                            xs={12}
                                            spacing={2}
                                        >
                                            <Grid item xs={12} key={index}>
                                                <LocationCard
                                                    location={location}
                                                />
                                            </Grid>
                                        </Grid>
                                        <SmartOutlets
                                            smartOutlets={smartOutlets}
                                        />
                                    </div>
                                ))}
                                {!locations && (
                                    <div>No Locations Available</div>
                                )}
                            </Grid>
                        </Grid>
                        <hr className="propertiesHrLcu" />
                    </React.Fragment>
                ))}
        </div>
    )
}

export default CurrentlyViewedProperty
