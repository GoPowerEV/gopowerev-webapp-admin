import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import { makeStyles } from '@material-ui/core/styles'
import { API_URL } from './../../../constants'
import Grid from '@material-ui/core/Grid'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import EvStationOutlinedIcon from '@material-ui/icons/EvStationOutlined'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined'
import WifiOutlinedIcon from '@material-ui/icons/WifiOutlined'
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined'
import CallOutlinedIcon from '@material-ui/icons/CallOutlined'
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined'
import TextField from '@material-ui/core/TextField'
import SmartOutlets from './propertySmartOutlets/SmartOutlets'
import './Properties.css'
import { getBadgeClass } from './utils/PropertyUtils'
import LocationCard from './LocationCard'

const useStyles = makeStyles(() => ({
    editPropertyField: { fontWeight: '700', height: '3px' },
}))

const CurrentlyViewedProperty = (props) => {
    const classes = useStyles()

    const [property, setProperty] = useState({})
    const [propertyContactName, setPropertyContactName] = useState('')
    const [openEditor, setOpenEditor] = useState(false)
    const [propertyInfoOpened, setPropertyInfoOpened] = useState(true)
    const [lcuInfoOpened, setLcuInfoOpened] = useState(false)
    const [lcuInfoOpened2, setLcuInfoOpened2] = useState(false)
    const locations = props.locations
    const lcus = props.lcus
    const smartOutlets = props.smartOutlets
    const locationsFake = [
        {
            name: 'North-East Parking Lot',
            pictureUrl1:
                'https://media.istockphoto.com/photos/europe-modern-complex-of-residential-buildings-picture-id1165384568?k=6&m=1165384568&s=612x612&w=0&h=EFKcg8aMptUfpr5TCFTyYnHEdDmUL0tmsOT3TWeXl8I=',
            smartOutletsAmount: 10,
            maxVoltAmps: 13,
        },
        {
            name: 'South-West Parking Lot',
            pictureUrl1:
                'https://media.istockphoto.com/photos/europe-modern-complex-of-residential-buildings-picture-id1165384568?k=6&m=1165384568&s=612x612&w=0&h=EFKcg8aMptUfpr5TCFTyYnHEdDmUL0tmsOT3TWeXl8I=',
            smartOutletsAmount: 10,
            maxVoltAmps: 13,
        },
    ]

    const openEditForm = () => {
        setOpenEditor(true)
    }

    const closeEditForm = () => {
        setOpenEditor(false)
    }

    const togglePropertyInfo = () => {
        setPropertyInfoOpened(!propertyInfoOpened)
    }

    const toggleLcuInfo = () => {
        setLcuInfoOpened(!lcuInfoOpened)
    }

    const handleContactNameEditChange = (value) => {
        console.log(value)
        let tempPropertyData = property
        tempPropertyData['contactName'] = value
        setProperty(tempPropertyData)
        setPropertyContactName(value)
        console.log(tempPropertyData)
    }

    useEffect(() => {
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
                    <Grid item xs={3} className="lcuHeaderColumn rightBorder">
                        <span className="lcuLocation">{property.name}</span>
                    </Grid>
                    <Grid item xs={3} className="rightBorder">
                        13000 Maple st, Beverly Hills, 90210
                    </Grid>
                    <Grid item xs={5}>
                        John Smith
                    </Grid>
                    <Grid item xs={1}>
                        <ExpandMoreIcon
                            className="expandIcon"
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
                            src={property.pictureUrl1}
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
                                            className="expandIcon"
                                            onClick={togglePropertyInfo}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="viewedPropertyLocation">
                                <LocationOnOutlinedIcon /> 13000 Maple st,
                                Beverly Hills, 90210
                            </div>
                            {property.status !== undefined && (
                                <div className={getBadgeClass(property.status)}>
                                    {property.status.charAt(0).toUpperCase() +
                                        property.status.slice(1)}
                                </div>
                            )}
                            <div className="propertyDetailsEditText">
                                <span>Property Details</span>
                                <Button
                                    endIcon={<EditOutlinedIcon />}
                                    onClick={openEditForm}
                                    className="propertyEditIcon"
                                >
                                    Edit
                                </Button>
                            </div>
                            {!openEditor && (
                                <div className="editInfoContainer">
                                    <Grid container xs={12} spacing={1}>
                                        <Grid item xs={6}>
                                            <div className="editInfoItem">
                                                <PersonOutlineOutlinedIcon />
                                                <span>
                                                    {propertyContactName}
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
                                                <MailOutlineOutlinedIcon />
                                                <span>
                                                    {property.contactEmail}
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
                                                <CallOutlinedIcon />
                                                <span>
                                                    {property.contactPhone1}
                                                </span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="editInfoItem">
                                                <FlashOnOutlinedIcon />
                                                <span>
                                                    {property.maxVoltAmps} Max
                                                    Volt Amps
                                                </span>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            )}
                            {openEditor && (
                                <div className="editInfoContainer">
                                    <Grid container xs={12} spacing={3}>
                                        <Grid item xs={6}>
                                            <div className="editInfoItem">
                                                <PersonOutlineOutlinedIcon />
                                                <TextField
                                                    InputProps={{
                                                        classes: {
                                                            input:
                                                                classes.editPropertyField,
                                                        },
                                                    }}
                                                    name="name"
                                                    value={propertyContactName}
                                                    onChange={(e) =>
                                                        handleContactNameEditChange(
                                                            e.target.value
                                                        )
                                                    }
                                                    label="Administrator's Name"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="editInfoItem">
                                                <EvStationOutlinedIcon />
                                                <TextField
                                                    InputProps={{
                                                        classes: {
                                                            input:
                                                                classes.editPropertyField,
                                                        },
                                                    }}
                                                    name="numberOfLcus"
                                                    value={lcus.length}
                                                    disabled
                                                    label="Number of LCUs"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="editInfoItem">
                                                <MailOutlineOutlinedIcon />
                                                <TextField
                                                    InputProps={{
                                                        classes: {
                                                            input:
                                                                classes.editPropertyField,
                                                        },
                                                    }}
                                                    name="email"
                                                    value={
                                                        property.contactEmail
                                                    }
                                                    // onChange={
                                                    //     props.handleChange
                                                    // }
                                                    // onBlur={props.handleBlur}
                                                    label="Email"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="editInfoItem">
                                                <WifiOutlinedIcon />
                                                <TextField
                                                    InputProps={{
                                                        classes: {
                                                            input:
                                                                classes.editPropertyField,
                                                        },
                                                    }}
                                                    name="smartOutlets"
                                                    disabled
                                                    value={smartOutlets.length}
                                                    label="Number of Smart Outlets"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="editInfoItem">
                                                <CallOutlinedIcon />
                                                <TextField
                                                    InputProps={{
                                                        classes: {
                                                            input:
                                                                classes.editPropertyField,
                                                        },
                                                    }}
                                                    name="phoneNumber"
                                                    value={
                                                        property.contactPhone1
                                                    }
                                                    // onChange={
                                                    //     props.handleChange
                                                    // }
                                                    // onBlur={props.handleBlur}
                                                    label="Phone Number"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="editInfoItem">
                                                <FlashOnOutlinedIcon />
                                                <TextField
                                                    InputProps={{
                                                        classes: {
                                                            input:
                                                                classes.editPropertyField,
                                                        },
                                                    }}
                                                    name="maxVoltAmpts"
                                                    value={property.maxVoltAmps}
                                                    // onChange={
                                                    //     props.handleChange
                                                    // }
                                                    // onBlur={props.handleBlur}
                                                    label="Max Volt Amps"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        className="editInfoSaveButton"
                                        variant="contained"
                                        onClick={closeEditForm}
                                    >
                                        Save
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Grid>
                </Grid>
            </Collapse>
            {lcus.map((lcu, index) => (
                <React.Fragment>
                    <hr className="propertiesHrLcu" />
                    <Grid
                        container
                        xs={12}
                        spacing={2}
                        className="lcuContainer"
                    >
                        <Grid
                            item
                            xs={2}
                            className="lcuHeaderColumn rightBorder"
                        >
                            <span className="greyHeader">
                                <EvStationOutlinedIcon />
                                LCU
                            </span>
                            <span className="lcuLocation">
                                {lcu.name ?? 'No LCU Name'}
                            </span>
                        </Grid>
                        <Grid item xs={2} className="rightBorder">
                            <div className={getBadgeClass('preConfig')}>
                                Pre-Config
                            </div>
                        </Grid>
                        <Grid item xs={2} className="rightBorder">
                            <div className="lcuHeader">Operational Status</div>
                            <div className="lcuRowText">
                                {lcu.operationalStatus[0].toUpperCase() +
                                    lcu.operationalStatus.slice(1)}
                            </div>
                        </Grid>
                        <Grid item xs={3} className="rightBorder">
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
                            <Grid item xs={3} className="lcuDetailsContainer">
                                <Grid container>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Grid item xs={5}>
                                            <div className="lcuDetailsHeader">
                                                LCU Name
                                            </div>
                                            <div className="lcuDetailsText">
                                                Main Office
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
                            <Grid item xs={3} className="lcuDetailsContainer">
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
                            <Grid item xs={3} className="lcuDetailsContainer">
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
                                                32144412
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
                            <Grid item xs={3} className="lcuDetailsContainer">
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
                            <Grid item xs={3} className="lcuDetailsContainer">
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
                            <Grid item xs={3} className="lcuDetailsContainer">
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
                                                Verizon
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
                            <Grid item xs={3} className="lcuDetailsContainer">
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
                                                MOTOROLA MG7540 16x4
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
                            <Grid item xs={3} className="lcuDetailsContainer">
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
                            <Grid item xs={3} className="lcuDetailsContainer">
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
                            <Grid item xs={3} className="lcuDetailsContainer">
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
                                                Alpha-1,001
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
                            <Grid item xs={3} className="lcuDetailsContainer">
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
                                                Alpha-1,001
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
                            <Grid item xs={3} className="lcuDetailsContainer">
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
                                                Alpha-1,001
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
                    <div className="tabHeader inInstallHeader">Locations</div>
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
                                            <LocationCard location={location} />
                                        </Grid>
                                    </Grid>
                                    <SmartOutlets smartOutlets={smartOutlets} />
                                </div>
                            ))}
                        </Grid>
                    </Grid>
                    <hr className="propertiesHrLcu" />
                </React.Fragment>
            ))}
        </div>
    )
}

export default CurrentlyViewedProperty
