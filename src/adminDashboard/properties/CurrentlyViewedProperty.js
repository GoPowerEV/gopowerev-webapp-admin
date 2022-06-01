import React, { useState, useEffect } from 'react'
import { API_URL, API_URL_ADMIN } from '../../constants'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import NoImageAvailable from './../../assets/img/noImageAvailable.png'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import EvStationOutlinedIcon from '@material-ui/icons/EvStationOutlined'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined'
import WifiOutlinedIcon from '@material-ui/icons/WifiOutlined'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
    Grid,
    Box,
    FormControl,
    InputLabel,
    Select,
    Tab,
    MenuItem,
    Tabs,
} from '@material-ui/core'
import './Properties.css'
import {
    getBadgeClass,
    getAllStates,
    getTypesOfPowerServiceOptions,
} from './utils/PropertyUtils'
import AddNewLcuModal from './AddNewLcuModal/AddNewLcuModal'
import AddTeamMemberModal from './AddTeamMemberModal/AddTeamMemberModal'
import UpdateSoftwareModal from './UpdateSoftwareModal/UpdateSoftwareModal'
import LcuCard from './LcuCard'
import PropertyTeam from './PropertyTeam/PropertyTeam'
import InstallerTeam from './InstallerTeam/InstallerTeam'
import ElectricityRatePlan from './ElectricityRatePlan/ElectricityRatePlan'
import {
    getPropertyLcus,
    getPropertyLocations,
    getPropertySmartOutletsByPropertyId,
} from './../dashboardService'
import PropertyGallery from './PropertyGallery'

const CurrentlyViewedProperty = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [dataWithInstallerRole, setDataWithInstallerRole] = useState(false)
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
    const [propertyBlackMaxVoltAmps, setPropertyBlackMaxVoltAmps] = useState()
    const [propertyBlueMaxVoltAmps, setPropertyBlueMaxVoltAmps] = useState()
    const [propertyRedMaxVoltAmps, setPropertyRedMaxVoltAmps] = useState()
    const [propertyPowerType, setPropertyPowerType] = useState('')
    const [propertyNotes, setPropertyNotes] = useState('')
    const [locations, setLocations] = useState([])
    const [lcus, setLcus] = useState([])
    const [smartOutlets, setSmartOutlets] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [openTeamMemberModal, setOpenTeamMemberModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [tabValue, setTabValue] = useState('info')
    const allStates = getAllStates()
    const allPowerTypes = getTypesOfPowerServiceOptions()

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    const togglePropertyInfo = () => {
        setPropertyInfoOpened(!propertyInfoOpened)
    }

    const reloadPropertyLocations = () => {
        getPropertyLocations(
            props.token,
            props.property.propertyUUID,
            setLocations,
            setIsLoading
        )
    }

    const setInstaller = (installerId) => {
        setIsLoading(true)
        const bodyToPost = { cognitoUUID: installerId }
        fetch(
            API_URL_ADMIN +
                'admin/property-installers/' +
                property.propertyUUID,
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyToPost),
            }
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoading(false)
                    props.reloadPropertyInfo(property.propertyUUID)
                },
                (error) => {
                    setIsLoading(false)
                }
            )
    }

    const setAdmin = (adminId) => {
        setIsLoading(true)
        const bodyToPost = { cognitoUUID: adminId }
        fetch(
            API_URL_ADMIN +
                'admin/property-administrators/' +
                property.propertyUUID,
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyToPost),
            }
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoading(false)
                    props.reloadPropertyInfo(property.propertyUUID)
                },
                (error) => {
                    setIsLoading(false)
                }
            )
    }

    const savePropertyInfo = () => {
        setIsLoading(true)
        if (props.token) {
            let tempPropertyData = property
            Object.keys(tempPropertyData).forEach(function (key, index) {
                if (tempPropertyData[key] === 'None') {
                    tempPropertyData[key] = null
                    setProperty(tempPropertyData)
                }
            })
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
        } else if (field === 'address1') {
            setPropertyAddress(value)
        } else if (field === 'city') {
            setPropertyCity(value)
        } else if (field === 'state') {
            setPropertyState(value)
        } else if (field === 'zipcode') {
            setPropertyZip(value)
        } else if (field === 'maxAmpsBlack') {
            setPropertyBlackMaxVoltAmps(value)
        } else if (field === 'maxAmpsBlue') {
            setPropertyBlueMaxVoltAmps(value)
        } else if (field === 'maxAmpsRed') {
            setPropertyRedMaxVoltAmps(value)
        } else if (field === 'detail') {
            setPropertyNotes(value)
        } else if (field === 'powerType') {
            setPropertyPowerType(value)
        }
        let tempPropertyData = property
        tempPropertyData[field] = value
        setProperty(tempPropertyData)
    }

    const handleOpen = () => {
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    const handleTeamMemberModalOpen = (showInstaller) => {
        setDataWithInstallerRole(showInstaller)
        setOpenTeamMemberModal(true)
    }

    const handleTeamMemberModalClose = () => {
        setOpenTeamMemberModal(false)
    }

    const addNewLocationAndLcu = () => {
        handleOpen()
    }

    const handleOpenUpdateModal = () => {
        setOpenUpdateModal(true)
    }

    const handleCloseUpdateModal = () => {
        setOpenUpdateModal(false)
    }

    const openUpdateSmartOutletSoftwareModal = () => {
        handleOpenUpdateModal()
    }

    useEffect(() => {
        console.log('here is there property', props.property)
        setProperty(props.property)
        setPropertyName(props.property.name)
        setPropertyAddress(props.property.address1)
        setPropertyCity(props.property.city)
        setPropertyState(props.property.state)
        setPropertyZip(props.property.zipcode)
        setPropertyContactName(props.property.contactName)
        setPropertyContactEmail(props.property.contactEmail)
        setPropertyContactPhone(props.property.contactPhone1)
        setPropertyNotes(props.property.detail)
        setPropertyRedMaxVoltAmps(props.property.maxAmpsRed)
        setPropertyBlackMaxVoltAmps(props.property.maxAmpsBlack)
        setPropertyBlueMaxVoltAmps(props.property.maxAmpsBlue)
        setPropertyPowerType(props.property.powerType)
        document.querySelector('body').scrollTo(0, 0)
        getPropertyLcus(
            props.token,
            props.property.propertyUUID,
            setLcus,
            setIsLoading
        )
        getPropertyLocations(
            props.token,
            props.property.propertyUUID,
            setLocations,
            setIsLoading
        )
        getPropertySmartOutletsByPropertyId(
            props.token,
            props.property.propertyUUID,
            setSmartOutlets,
            setIsLoading
        )
    }, [props.property, props.token])

    return (
        <div className="propertiesMainBody">
            <div className="tabHeader">
                <span
                    className="textAsLink"
                    onClick={props.closeOpenedProperty}
                >
                    All Properties -
                    <span className="lcuLocation">{property.name}</span>
                </span>
            </div>
            <Box
                sx={{ width: '100%', marginBottom: '25px', marginTop: '20px' }}
            >
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    TabIndicatorProps={{
                        style: { background: '#12bfa2' },
                    }}
                    aria-label="tabs"
                >
                    <Tab
                        style={{
                            color: 'black',
                            textTransform: 'none',
                            fontSize: '17px',
                            fontFamily: 'Nunito Sans, sans-serif',
                            fontWeight: '700',
                        }}
                        value="info"
                        label="Property Details"
                    />
                    <Tab
                        style={{
                            color: 'black',
                            textTransform: 'none',
                            fontSize: '17px',
                            fontFamily: 'Nunito Sans, sans-serif',
                            fontWeight: '700',
                        }}
                        value="gallery"
                        label="Manage Gallery"
                    />
                </Tabs>
            </Box>
            {tabValue === 'info' && (
                <>
                    {!propertyInfoOpened && (
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            className="lcuContainer"
                        >
                            <Grid item xs={5}>
                                <div className="viewedPropertyTitle">
                                    {property.name}
                                    {property.status !== undefined && (
                                        <span
                                            className={getBadgeClass(
                                                property.status
                                            )}
                                        >
                                            {property.status
                                                .charAt(0)
                                                .toUpperCase() +
                                                property.status.slice(1)}
                                        </span>
                                    )}
                                </div>
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
                            <Grid item xs={3}>
                                {property.contactName}
                            </Grid>
                            <Grid item>
                                <ExpandMoreIcon
                                    className="expandIconFirstPortion"
                                    onClick={togglePropertyInfo}
                                />
                            </Grid>
                        </Grid>
                    )}
                    <Collapse in={propertyInfoOpened}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                >
                                    <div className="viewedPropertyTitle">
                                        {property.name}
                                        {property.status !== undefined && (
                                            <span
                                                className={getBadgeClass(
                                                    property.status
                                                )}
                                            >
                                                {property.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    property.status.slice(1)}
                                            </span>
                                        )}
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <div>
                                    <ExpandLessIcon
                                        className="expandIconFirstPortionOpened"
                                        onClick={togglePropertyInfo}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            className="singlePropertyContainer"
                            xs={12}
                        >
                            <Grid item xs={4}>
                                <img
                                    alt="Property Img"
                                    src={
                                        property?.hero?.length > 0
                                            ? property.hero[2].url
                                            : NoImageAvailable
                                    }
                                    className="viewedPropertyMainImage"
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <div className="viewedPropertyInfoContainer">
                                    {!isLoading && (
                                        <div className="editInfoContainer">
                                            <Grid container xs={12} spacing={3}>
                                                <Grid item lg={6} xs={12}>
                                                    <div className="editInfoItem">
                                                        <WifiOutlinedIcon />
                                                        <span>
                                                            {smartOutlets !==
                                                            undefined
                                                                ? smartOutlets.length
                                                                : '0'}{' '}
                                                            {smartOutlets?.length ===
                                                            1
                                                                ? 'Smart Outlet'
                                                                : 'Smart Outlets'}
                                                        </span>
                                                    </div>
                                                </Grid>
                                                <Grid item lg={6} xs={12}>
                                                    <div className="editInfoItem">
                                                        <EvStationOutlinedIcon />
                                                        <span>
                                                            {lcus
                                                                ? lcus.length
                                                                : '0'}{' '}
                                                            LCU(s)
                                                        </span>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        className="editableField"
                                                        id="propertyName"
                                                        label="Property Name"
                                                        variant="outlined"
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
                                                        className="editableField"
                                                        fullWidth
                                                        id="propertyAddress"
                                                        label="Street"
                                                        variant="outlined"
                                                        value={propertyAddress}
                                                        onChange={(e) =>
                                                            handlePropertyFieldChange(
                                                                e.target.value,
                                                                'address1'
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
                                                <Grid item lg={3} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        className="editableField"
                                                        id="propertyZip"
                                                        label="Zip Code"
                                                        variant="outlined"
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
                                                        className="editableField"
                                                        id="propertyCity"
                                                        label="City"
                                                        variant="outlined"
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
                                                <Grid item lg={3} xs={12}>
                                                    <FormControl
                                                        fullWidth
                                                        className="editableFieldSelectContainerState"
                                                    >
                                                        <InputLabel id="state">
                                                            State
                                                        </InputLabel>
                                                        <Select
                                                            labelId="state"
                                                            variant="outlined"
                                                            id="state"
                                                            value={
                                                                propertyState
                                                            }
                                                            label="State"
                                                            onChange={(e) =>
                                                                handlePropertyFieldChange(
                                                                    e.target
                                                                        .value,
                                                                    'state'
                                                                )
                                                            }
                                                            onBlur={() =>
                                                                savePropertyInfo()
                                                            }
                                                        >
                                                            {allStates?.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <MenuItem
                                                                        value={
                                                                            item.name
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {
                                                                            item.abbreviation
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item lg={4} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        id="maxVoltAmps"
                                                        className="editableField"
                                                        label="Black Max Amps"
                                                        variant="outlined"
                                                        value={
                                                            propertyBlackMaxVoltAmps
                                                        }
                                                        onChange={(e) =>
                                                            handlePropertyFieldChange(
                                                                e.target.value,
                                                                'maxAmpsBlack'
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
                                                {propertyPowerType !==
                                                    '1P-240' && (
                                                    <Grid item lg={4} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            id="maxVoltAmpsBlue"
                                                            className="editableField"
                                                            label="Blue Max Amps"
                                                            variant="outlined"
                                                            value={
                                                                propertyBlueMaxVoltAmps
                                                            }
                                                            onChange={(e) =>
                                                                handlePropertyFieldChange(
                                                                    e.target
                                                                        .value,
                                                                    'maxAmpsBlue'
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
                                                )}
                                                <Grid item lg={4} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        id="maxVoltAmpsRed"
                                                        className="editableField"
                                                        label="Red Max Amps"
                                                        variant="outlined"
                                                        value={
                                                            propertyRedMaxVoltAmps
                                                        }
                                                        onChange={(e) =>
                                                            handlePropertyFieldChange(
                                                                e.target.value,
                                                                'maxAmpsRed'
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
                                                <Grid item lg={4} xs={12}>
                                                    <FormControl
                                                        fullWidth
                                                        className="editableFieldSelectContainer"
                                                    >
                                                        <InputLabel id="typeOfPowerService">
                                                            Type Of Power
                                                            Service
                                                        </InputLabel>
                                                        <Select
                                                            labelId="typeOfPowerService"
                                                            variant="outlined"
                                                            id="typeOfPowerService"
                                                            value={
                                                                propertyPowerType
                                                            }
                                                            label="Type Of Power Service"
                                                            onChange={(e) =>
                                                                handlePropertyFieldChange(
                                                                    e.target
                                                                        .value,
                                                                    'powerType'
                                                                )
                                                            }
                                                            onBlur={() =>
                                                                savePropertyInfo()
                                                            }
                                                        >
                                                            {allPowerTypes?.map(
                                                                (type) => (
                                                                    <MenuItem
                                                                        value={
                                                                            type.value
                                                                        }
                                                                    >
                                                                        {
                                                                            type.value
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                {!updateIsLoading &&
                                                    !updateSuccess && (
                                                        <Grid
                                                            item
                                                            lg={4}
                                                            xs={12}
                                                        >
                                                            <Button
                                                                className="updateOutletSoftwareBtn"
                                                                variant="contained"
                                                                onClick={() =>
                                                                    openUpdateSmartOutletSoftwareModal()
                                                                }
                                                            >
                                                                Update Smart
                                                                Outlet Software
                                                            </Button>
                                                        </Grid>
                                                    )}
                                                {updateIsLoading &&
                                                    !updateSuccess && (
                                                        <div className="updateLoaderContainer">
                                                            <CircularProgress
                                                                style={{
                                                                    color:
                                                                        '#12BFA2',
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                {!updateIsLoading &&
                                                    updateSuccess && (
                                                        <div className="update-success">
                                                            Updated
                                                            successfully.
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
                                            <span>Property Details</span>
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
                                        id="propertyContactName"
                                        className="editableField"
                                        fullWidth
                                        label="Property Contact Name"
                                        variant="outlined"
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
                                        id="propertyContactEmail"
                                        className="editableField"
                                        fullWidth
                                        label="Property Contact Email"
                                        variant="outlined"
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
                                        className="editableField"
                                        id="propertyContactPhone"
                                        label="Property Contact Phone"
                                        variant="outlined"
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
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="propNotes"
                                        className="editableField"
                                        label="Notes"
                                        variant="outlined"
                                        value={propertyNotes}
                                        onChange={(e) =>
                                            handlePropertyFieldChange(
                                                e.target.value,
                                                'detail'
                                            )
                                        }
                                        onBlur={() => savePropertyInfo()}
                                        InputProps={{
                                            endAdornment: <EditOutlinedIcon />,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Collapse>
                </>
            )}
            {tabValue === 'info' && (
                <>
                    {/* ADD NEW PARTNER MODAL */}
                    <AddTeamMemberModal
                        showInstaller={dataWithInstallerRole}
                        handleOpen={handleTeamMemberModalOpen}
                        handleClose={handleTeamMemberModalClose}
                        open={openTeamMemberModal}
                        close={handleTeamMemberModalClose}
                        token={props.token}
                        propertyUUID={property.propertyUUID}
                        setInstaller={setInstaller}
                        setAdmin={setAdmin}
                    />
                    <ElectricityRatePlan
                        token={props.token}
                        propertyUUID={property.propertyUUID}
                        isLoading={isLoading}
                    />
                    <PropertyTeam
                        openModal={handleTeamMemberModalOpen}
                        isLoading={isLoading}
                        propertyUUID={property.propertyUUID}
                        token={props.token}
                        reloadPropertyInfo={props.reloadPropertyInfo}
                    />
                    <InstallerTeam
                        openModal={handleTeamMemberModalOpen}
                        isLoading={isLoading}
                        propertyUUID={property.propertyUUID}
                        token={props.token}
                        reloadPropertyInfo={props.reloadPropertyInfo}
                    />
                    <React.Fragment>
                        {/* ADD NEW CLU MODAL */}
                        <AddNewLcuModal
                            handleOpen={handleOpen}
                            handleClose={handleClose}
                            open={openModal}
                            close={handleClose}
                            token={props.token}
                            propertyUUID={property.propertyUUID}
                            openPropertyDetailsOnLoad={
                                props.openPropertyDetailsOnLoad
                            }
                        />
                        <hr className="propertiesHrLcu" />
                        <Grid container justifyContent="space-between">
                            <div className="greyHeader">
                                <EvStationOutlinedIcon />
                                LCUs
                            </div>
                            {lcus?.length === 0 && <div>No LCUs</div>}
                            <Button
                                className="addNewLocationButton"
                                variant="outlined"
                                onClick={() => addNewLocationAndLcu()}
                            >
                                Add New LCU & Location
                            </Button>
                        </Grid>
                    </React.Fragment>
                </>
            )}
            {/* UPDATE OUTLET MODAL */}
            <UpdateSoftwareModal
                handleOpen={handleOpenUpdateModal}
                propertyUUID={property.propertyUUID}
                handleClose={handleCloseUpdateModal}
                open={openUpdateModal}
                close={handleCloseUpdateModal}
                token={props.token}
            />
            {tabValue === 'info' && (
                <>
                    {lcus &&
                        lcus.map((lcu, index) => (
                            <LcuCard
                                propertyPowerType={propertyPowerType}
                                token={props.token}
                                lcu={lcu}
                                setIsLoading={setIsLoading}
                                isLoading={isLoading}
                                locations={locations}
                                reloadPropertyLocations={
                                    reloadPropertyLocations
                                }
                            />
                        ))}
                </>
            )}
            {tabValue === 'gallery' && (
                <PropertyGallery
                    token={props.token}
                    propertyUuid={property.propertyUUID}
                    reloadPropertyInfo={props.reloadPropertyInfo}
                />
            )}
        </div>
    )
}

export default CurrentlyViewedProperty
