import React, { useState, useEffect } from 'react'
import { API_URL } from '../../constants'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import { makeStyles } from '@material-ui/core/styles'
import NoImageAvailable from './../../assets/img/noImageAvailable.png'
import Grid from '@material-ui/core/Grid'
import { API_URL_ADMIN } from '../../constants'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import EvStationOutlinedIcon from '@material-ui/icons/EvStationOutlined'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined'
import WifiOutlinedIcon from '@material-ui/icons/WifiOutlined'
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import SmartOutlets from './propertySmartOutlets/SmartOutlets'
import ApartmentOutlinedIcon from '@material-ui/icons/ApartmentOutlined'
import './Properties.css'
import { getBadgeClass, getBadgeText } from './utils/PropertyUtils'
import LocationCard from './LocationCard'

const useStyles = makeStyles(() => ({
    editPropertyField: { fontWeight: '700', height: '3px' },
}))

const CurrentlyViewedProperty = (props) => {
    const classes = useStyles()

    const [isLoading, setIsLoading] = useState(false)
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [updateIsLoading, setUpdateIsLoading] = useState(false)
    const [property, setProperty] = useState({})
    const [propertyContactName, setPropertyContactName] = useState('')
    const [propertyInfoOpened, setPropertyInfoOpened] = useState(true)
    const [lcuInfoOpened, setLcuInfoOpened] = useState(false)
    const [lcuInfoOpened2, setLcuInfoOpened2] = useState(false)
    const locations = props.locations
    const lcus = props.lcus
    const smartOutlets = props.smartOutlets

    const [
        editingPropertyContactName,
        setEditingPropertyContactName,
    ] = useState(false)
    const [
        editingPropertyContactEmail,
        setEditingPropertyContactEmail,
    ] = useState(false)
    const [
        editingPropertyPhoneNumber,
        setEditingPropertyPhoneNumber,
    ] = useState(false)
    const [
        editingPropertyAssignedInstaller,
        setEditingPropertyAssignedInstaller,
    ] = useState(false)
    const [editingPropertNotes, setEditingPropertNotes] = useState(false)

    const togglePropertyInfo = () => {
        setPropertyInfoOpened(!propertyInfoOpened)
    }

    const toggleLcuInfo = () => {
        setLcuInfoOpened(!lcuInfoOpened)
    }

    const savePropertyInfo = () => {
        console.log('about to save this info', property)
        setIsLoading(true)
        if (props.token) {
            fetch(API_URL + 'properties/' + property.propertyUUID, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'image/jpg',
                },
                body: JSON.stringify(property),
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

    const handleContactNameEditChange = (value) => {
        console.log(value)
        let tempPropertyData = property
        tempPropertyData['contactName'] = value
        setProperty(tempPropertyData)
        setPropertyContactName(value)
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
        document.querySelector('body').scrollTo(0, 0)
        console.log('prop details', props.property)
        setPropertyContactName(props.property.contactName)
        setProperty(props.property)
        console.log('locations', locations)
        console.log('lcus', lcus)
        console.log('smart outlets', smartOutlets)
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
                <span className="boldTex"> > Property</span>
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
                                        <Grid item xs={6}>
                                            <div className="editInfoItem">
                                                <FlashOnOutlinedIcon />
                                                <span>
                                                    {property.maxVoltAmps} Max
                                                    Volt Amps
                                                </span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="editInfoItem">
                                                <WifiOutlinedIcon />
                                                <span>
                                                    {smartOutlets.length} Smart
                                                    Outlets
                                                </span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="editInfoItem">
                                                <EvStationOutlinedIcon />
                                                <span>
                                                    {lcus.length} LCU(s)
                                                </span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
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
                                                value={property.name}
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
                                                value={property.streetAddress1}
                                                InputProps={{
                                                    endAdornment: (
                                                        <EditOutlinedIcon />
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                id="filled-basic"
                                                label="City"
                                                variant="filled"
                                                value={property.city}
                                                InputProps={{
                                                    endAdornment: (
                                                        <EditOutlinedIcon />
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                id="filled-basic"
                                                label="Zip Code"
                                                variant="filled"
                                                value={property.zip}
                                                InputProps={{
                                                    endAdornment: (
                                                        <EditOutlinedIcon />
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                id="filled-basic"
                                                label="State"
                                                variant="filled"
                                                value={property.state}
                                                InputProps={{
                                                    endAdornment: (
                                                        <EditOutlinedIcon />
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        {!updateIsLoading && !updateSuccess && (
                                            <Grid item xs={6}>
                                                <Button
                                                    className="updateOutletSoftwareBtn"
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
                            value={property.contactEmail}
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
                            value={property.contactPhone1}
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
                                spacing={3}
                                className="editLcuDetailsContainer"
                            >
                                <Grid
                                    item
                                    xs={3}
                                    className="lcuDetailsContainer"
                                >
                                    <Grid container>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item xs={9}>
                                                <div className="lcuDetailsHeader">
                                                    LCU Name
                                                </div>
                                                <div className="lcuDetailsText">
                                                    {lcu.name}
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1}
                                                className="greyIconEdit"
                                            >
                                                <EditOutlinedIcon />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={3}
                                    className="lcuDetailsContainer"
                                >
                                    <Grid container>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item xs={5}>
                                                <div className="lcuDetailsHeader">
                                                    IMEI
                                                </div>
                                                <div className="lcuDetailsText">
                                                    XXXXXXXXXXXXXXXXXXX
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1}
                                                className="greyIconEdit"
                                            >
                                                <EditOutlinedIcon />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={3}
                                    className="lcuDetailsContainer"
                                >
                                    <Grid container>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item xs={5}>
                                                <div className="lcuDetailsHeader">
                                                    Confirmation Code
                                                </div>
                                                <div className="lcuDetailsText">
                                                    {lcu.cellConfirmationCode ??
                                                        '-'}
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1}
                                                className="greyIconEdit"
                                            >
                                                <EditOutlinedIcon />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                spacing={3}
                                className="editLcuDetailsContainer"
                            >
                                <Grid
                                    item
                                    xs={3}
                                    className="lcuDetailsContainer"
                                >
                                    <Grid container>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item xs={5}>
                                                <div className="lcuDetailsHeader">
                                                    Admin State
                                                </div>
                                                <div className="lcuDetailsText">
                                                    Pre-Config
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1}
                                                className="greyIconEdit"
                                            >
                                                <EditOutlinedIcon />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={3}
                                    className="lcuDetailsContainer"
                                >
                                    <Grid container>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item xs={5}>
                                                <div className="lcuDetailsHeader">
                                                    SIM
                                                </div>
                                                <div className="lcuDetailsText">
                                                    XXXXXXXXXXXXXXXXXXX
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1}
                                                className="greyIconEdit"
                                            >
                                                <EditOutlinedIcon />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={3}
                                    className="lcuDetailsContainer"
                                >
                                    <Grid container>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item xs={5}>
                                                <div className="lcuDetailsHeader">
                                                    Carrier
                                                </div>
                                                <div className="lcuDetailsText">
                                                    {lcu.cellCarrier ?? '-'}
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1}
                                                className="greyIconEdit"
                                            >
                                                <EditOutlinedIcon />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                spacing={3}
                                className="editLcuDetailsContainer"
                            >
                                <Grid
                                    item
                                    xs={3}
                                    className="lcuDetailsContainer"
                                >
                                    <Grid container>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item xs={9}>
                                                <div className="lcuDetailsHeader">
                                                    Model
                                                </div>
                                                <div className="lcuDetailsText">
                                                    {lcu.modelNumber ?? '-'}
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1}
                                                className="greyIconEdit"
                                            >
                                                <EditOutlinedIcon />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={3}
                                    className="lcuDetailsContainer"
                                >
                                    <Grid container>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item xs={5}>
                                                <div className="lcuDetailsHeader">
                                                    Serial
                                                </div>
                                                <div className="lcuDetailsText">
                                                    XXXXXXXXXXXXXXXXXXX
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1}
                                                className="greyIconEdit"
                                            >
                                                <EditOutlinedIcon />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={3}
                                    className="lcuDetailsContainer"
                                >
                                    <Grid container>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item xs={5}>
                                                <div className="lcuDetailsHeader">
                                                    Line
                                                </div>
                                                <div className="lcuDetailsText">
                                                    555-555-5555
                                                </div>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={1}
                                                className="greyIconEdit"
                                            >
                                                <EditOutlinedIcon />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                spacing={3}
                                className="editLcuDetailsContainer"
                            >
                                <Grid
                                    item
                                    xs={3}
                                    className="lcuDetailsContainer"
                                >
                                    <Grid container>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item xs={6}>
                                                <div className="lcuDetailsHeader">
                                                    Hardware Version
                                                </div>
                                                <div className="lcuDetailsText">
                                                    {lcu.hwVersion ?? '-'}
                                                </div>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <div className="lcuDetailsHeader">
                                                    Last Updated
                                                </div>
                                                <div className="lcuDetailsTextSmall">
                                                    11:20:10PM PST 09/20/2021
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={3}
                                    className="lcuDetailsContainer"
                                >
                                    <Grid container>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item xs={5}>
                                                <div className="lcuDetailsHeader">
                                                    Software Version
                                                </div>
                                                <div className="lcuDetailsText">
                                                    {lcu.swVersion ?? '-'}
                                                </div>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <div className="lcuDetailsHeader">
                                                    Last Updated
                                                </div>
                                                <div className="lcuDetailsTextSmall">
                                                    11:20:10PM PST 09/20/2021
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={3}
                                    className="lcuDetailsContainer"
                                >
                                    <Grid container>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item xs={5}>
                                                <div className="lcuDetailsHeader">
                                                    Firmware Version
                                                </div>
                                                <div className="lcuDetailsText">
                                                    {lcu.fwVersion ?? '-'}
                                                </div>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <div className="lcuDetailsHeader">
                                                    Last Updated
                                                </div>
                                                <div className="lcuDetailsTextSmall">
                                                    11:20:10PM PST 09/20/2021
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
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
