import React, { useState } from 'react'
import { API_URL } from '../../constants'
import Grid from '@material-ui/core/Grid'
import {
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'
import Collapse from '@material-ui/core/Collapse'
import LocationCard from './LocationCard'
import './Properties.css'
import { getBadgeClass, getBadgeText } from './utils/PropertyUtils'
import { adminStateOptions } from './../dashboardConstants'
import AddNewLocationModal from './AddNewLocationModal/AddNewLocationModal'

const LcuCard = (props) => {
    const [lcuInfo, setLcuInfo] = useState(props.lcu)
    const [imei, setImei] = useState(props.lcu.imeiNumber)
    const [sim, setSim] = useState(props.lcu.simNumber)
    const [lineNumber, setLineNumber] = useState(props.lcu.lineNumber)
    const [adminState, setAdminState] = useState(props.lcu.adminStatus)
    const [carrier, setCarrier] = useState(props.lcu.cellCarrier)
    const [model, setModel] = useState(props.lcu.modelNumber)
    const [serial, setSerial] = useState(props.lcu.serialNumber)
    const [hardware, setHardware] = useState(props.lcu.hwVersion)
    const [software, setSoftware] = useState(props.lcu.swVersion)
    const [firmware, setFirmware] = useState(props.lcu.fwVersion)
    const [notes, setNotes] = useState(props.lcu.description)
    const [lcuName, setLcuName] = useState(props.lcu.name)
    const [lcuInfoOpened, setLcuInfoOpened] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const toggleLcuInfo = () => {
        setLcuInfoOpened(!lcuInfoOpened)
    }

    const saveLCUInfo = () => {
        props.setIsLoading(true)
        if (props.token) {
            console.log('about to save this  LCU info', lcuInfo)
            fetch(API_URL + 'lcus/' + lcuInfo.lcuUUID, {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(lcuInfo),
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        props.setIsLoading(false)
                        console.log('save lcu success', result)
                    },
                    (error) => {
                        props.setIsLoading(false)
                    }
                )
        }
    }

    const handleLCUFieldChange = (value, field) => {
        if (field === 'name') {
            setLcuName(value)
        } else if (field === 'imeiNumber') {
            setImei(value)
        } else if (field === 'simNumber') {
            setSim(value)
        } else if (field === 'lineNumber') {
            setLineNumber(value)
        } else if (field === 'adminStatus') {
            setAdminState(value)
        } else if (field === 'cellCarrier') {
            setCarrier(value)
        } else if (field === 'serialNumber') {
            setSerial(value)
        } else if (field === 'hwVersion') {
            setHardware(value)
        } else if (field === 'swVersion') {
            setSoftware(value)
        } else if (field === 'fwVersion') {
            setFirmware(value)
        } else if (field === 'description') {
            setNotes(value)
        } else {
            setModel(value)
        }
        let tempLcu = lcuInfo
        tempLcu[field] = value

        setLcuInfo(tempLcu)
    }

    const handleOpen = () => {
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    const addNewLocation = () => {
        handleOpen()
    }

    console.log('this lcu info', lcuInfo)

    return (
        <React.Fragment>
            <Grid container xs={12} spacing={2} className="lcuContainer">
                <Grid item xs={2} className="lcuHeaderColumn">
                    <div className="lcuLocation">
                        {lcuInfo.name ?? 'No LCU Name'}
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div className={getBadgeClass(lcuInfo.adminStatus)}>
                        {getBadgeText(lcuInfo.adminStatus)}
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div className="lcuHeader">Operational Status</div>
                    <div className="lcuRowText">
                        {lcuInfo.operationalStatus &&
                            lcuInfo.operationalStatus[0].toUpperCase() +
                                lcuInfo.operationalStatus.slice(1)}
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className="lcuHeader">Heartbeat</div>
                    <div className="lcuRowText">{lcuInfo.heartbeat ?? '-'}</div>
                </Grid>
                <Grid item xs={2}>
                    <div className="lcuHeader">Installed</div>
                    <div className="lcuRowText">
                        {lcuInfo.installedDate ?? '-'}
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
            {props.isLoading && (
                <div className="loaderContainer">
                    <CircularProgress style={{ color: '#12BFA2' }} />
                </div>
            )}
            {!props.isLoading && (
                <Grid
                    container
                    spacing={3}
                    xs={12}
                    className="editLcuDetailsContainer"
                >
                    <Grid item lg={3} md={6} s={12} xs={12}>
                        <TextField
                            fullWidth
                            className="editableField"
                            id="lcuName"
                            label="LCU Name"
                            variant="outlined"
                            value={lcuName}
                            onChange={(e) =>
                                handleLCUFieldChange(e.target.value, 'name')
                            }
                            onBlur={() => saveLCUInfo()}
                            InputProps={{
                                endAdornment: <EditOutlinedIcon />,
                            }}
                        />
                    </Grid>
                    <Grid item lg={3} md={6} s={12} xs={12}>
                        <TextField
                            fullWidth
                            className="editableField"
                            id="imei"
                            label="IMEI"
                            variant="outlined"
                            value={imei}
                            onChange={(e) =>
                                handleLCUFieldChange(
                                    e.target.value,
                                    'imeiNumber'
                                )
                            }
                            onBlur={() => saveLCUInfo()}
                            InputProps={{
                                endAdornment: <EditOutlinedIcon />,
                            }}
                        />
                    </Grid>
                    <Grid item lg={3} md={6} s={12} xs={12}>
                        <TextField
                            fullWidth
                            className="editableField"
                            id="sim"
                            label="SIM"
                            variant="outlined"
                            value={sim}
                            onChange={(e) =>
                                handleLCUFieldChange(
                                    e.target.value,
                                    'simNumber'
                                )
                            }
                            onBlur={() => saveLCUInfo()}
                            InputProps={{
                                endAdornment: <EditOutlinedIcon />,
                            }}
                        />
                    </Grid>
                    <Grid item lg={3} md={6} s={12} xs={12}>
                        <TextField
                            fullWidth
                            className="editableField"
                            id="line"
                            label="Line"
                            variant="outlined"
                            value={lineNumber}
                            onChange={(e) =>
                                handleLCUFieldChange(
                                    e.target.value,
                                    'lineNumber'
                                )
                            }
                            onBlur={() => saveLCUInfo()}
                            InputProps={{
                                endAdornment: <EditOutlinedIcon />,
                            }}
                        />
                    </Grid>
                </Grid>
            )}
            <Collapse in={lcuInfoOpened}>
                <Grid
                    container
                    spacing={3}
                    xs={12}
                    className="editLcuDetailsContainer"
                >
                    <Grid item lg={3} md={6} s={12} xs={12}>
                        <FormControl
                            fullWidth
                            className="editableFieldSelectContainer"
                        >
                            <InputLabel id="adminState">Admin State</InputLabel>
                            <Select
                                labelId="adminState"
                                variant="outlined"
                                id="adminState"
                                value={adminState}
                                onChange={(e) =>
                                    handleLCUFieldChange(
                                        e.target.value,
                                        'adminStatus'
                                    )
                                }
                                onBlur={() => saveLCUInfo()}
                                label="Admin State"
                            >
                                {adminStateOptions?.map((option) => {
                                    return (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label ?? option.value}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={3} md={6} s={12} xs={12}>
                        <TextField
                            fullWidth
                            className="editableField"
                            id="carrier"
                            label="Carrier"
                            value={carrier}
                            onChange={(e) =>
                                handleLCUFieldChange(
                                    e.target.value,
                                    'cellCarrier'
                                )
                            }
                            onBlur={() => saveLCUInfo()}
                            variant="outlined"
                            InputProps={{
                                endAdornment: <EditOutlinedIcon />,
                            }}
                        />
                    </Grid>
                    <Grid item lg={3} md={6} s={12} xs={12}>
                        <TextField
                            fullWidth
                            className="editableField"
                            id="model"
                            label="Model"
                            value={model}
                            onChange={(e) =>
                                handleLCUFieldChange(
                                    e.target.value,
                                    'modelNumber'
                                )
                            }
                            onBlur={() => saveLCUInfo()}
                            variant="outlined"
                            InputProps={{
                                endAdornment: <EditOutlinedIcon />,
                            }}
                        />
                    </Grid>
                    <Grid item lg={3} md={6} s={12} xs={12}>
                        <TextField
                            fullWidth
                            className="editableField"
                            id="serial"
                            label="Serial"
                            variant="outlined"
                            value={serial}
                            onChange={(e) =>
                                handleLCUFieldChange(
                                    e.target.value,
                                    'serialNumber'
                                )
                            }
                            onBlur={() => saveLCUInfo()}
                            InputProps={{
                                endAdornment: <EditOutlinedIcon />,
                            }}
                        />
                    </Grid>
                    <Grid item lg={3} md={6} s={12} xs={12}>
                        <TextField
                            fullWidth
                            className="editableField"
                            id="hwVersion"
                            label="Hardware Version"
                            variant="outlined"
                            value={hardware}
                            onChange={(e) =>
                                handleLCUFieldChange(
                                    e.target.value,
                                    'hwVersion'
                                )
                            }
                            onBlur={() => saveLCUInfo()}
                            InputProps={{
                                endAdornment: <EditOutlinedIcon />,
                            }}
                        />
                    </Grid>
                    <Grid item lg={3} md={6} s={12} xs={12}>
                        <TextField
                            fullWidth
                            className="editableField"
                            id="softwareVersion"
                            label="Software Version"
                            variant="outlined"
                            value={software}
                            onChange={(e) =>
                                handleLCUFieldChange(
                                    e.target.value,
                                    'swVersion'
                                )
                            }
                            onBlur={() => saveLCUInfo()}
                            InputProps={{
                                endAdornment: <EditOutlinedIcon />,
                            }}
                        />
                    </Grid>
                    <Grid item lg={3} md={6} s={12} xs={12}>
                        <TextField
                            fullWidth
                            className="editableField"
                            id="fwVersion"
                            label="Firmware Version"
                            variant="outlined"
                            value={firmware}
                            onChange={(e) =>
                                handleLCUFieldChange(
                                    e.target.value,
                                    'fwVersion'
                                )
                            }
                            onBlur={() => saveLCUInfo()}
                            InputProps={{
                                endAdornment: <EditOutlinedIcon />,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="lcuNotes"
                            className="editableField"
                            label="Notes"
                            variant="outlined"
                            value={notes}
                            onChange={(e) =>
                                handleLCUFieldChange(
                                    e.target.value,
                                    'description'
                                )
                            }
                            onBlur={() => saveLCUInfo()}
                            InputProps={{
                                endAdornment: <EditOutlinedIcon />,
                            }}
                        />
                    </Grid>
                </Grid>
                <hr className="propertiesHrLcu" />
                <div className="tabHeader inInstallHeader">Locations</div>
                <Button
                    className="addNewLocButton"
                    variant="outlined"
                    onClick={addNewLocation}
                >
                    Add New Location
                </Button>
                {/* ADD NEW LOCATION MODAL */}
                <AddNewLocationModal
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    open={openModal}
                    close={handleClose}
                    token={props.token}
                    openPropertyDetailsOnLoad={props.openPropertyDetailsOnLoad}
                />
                <Grid
                    container
                    className="allDashboardItemsContainer"
                    xs={12}
                    spacing={2}
                >
                    <Grid item xs={12}>
                        {!props.isLoading &&
                            props.locations?.map((location, index) => (
                                <div className="status-card-ininstall">
                                    <Grid
                                        container
                                        className="allPropertiesContainer"
                                        xs={12}
                                        spacing={2}
                                    >
                                        <Grid item xs={12} key={index}>
                                            <LocationCard
                                                token={props.token}
                                                location={location}
                                                setIsLoading={
                                                    props.setIsLoading
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            ))}
                        {props.isLoading && (
                            <div className="loaderContainer">
                                <CircularProgress
                                    style={{ color: '#12BFA2' }}
                                />
                            </div>
                        )}
                        {!props.locations && <div>No Locations Available</div>}
                    </Grid>
                </Grid>
            </Collapse>
            <hr className="propertiesHrLcu" />
            <div className="bottom-margin-container"></div>
        </React.Fragment>
    )
}

export default LcuCard
