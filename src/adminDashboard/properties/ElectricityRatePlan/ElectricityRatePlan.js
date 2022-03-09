import React, { useState, useEffect } from 'react'
import {
    Collapse,
    CircularProgress,
    TextField,
    Grid,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core'
import { API_URL_ADMIN } from '../../../constants'
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined'
import './ElectricityRatePlan.css'

const margins = [{ value: '1', label: 'First Option' }]

const settings = [
    { value: '1', label: 'First Settng' },
    { value: '2', label: 'Second Settng' },
]

export default function ElectricityRatePlan(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [planDetailsOpened, setPlanDetailsOpened] = useState(false)
    const [l1PlanName, setL1PlanName] = useState('L1 Plan Name')
    const [l2PlanName, setL2PlanName] = useState('L2 Plan Name')
    const [l1Setting, setL1Setting] = useState('1')
    const [l2Setting, setL2Setting] = useState('1')
    const [marginAmount, setMarginAmount] = useState('5')
    const [margin, setMargin] = useState(1)

    const toggleInfo = () => {
        setPlanDetailsOpened(!planDetailsOpened)
    }

    const handlePlanNameChange = (value, type) => {
        if (type === 'l1') {
            setL1PlanName(value)
        } else {
            setL2PlanName(value)
        }
    }

    const handleSettingChange = (value, type) => {
        if (type === 'l1') {
            setL1Setting(value)
        } else {
            setL2Setting(value)
        }
    }

    const handleMarginChange = (value) => {
        setMargin(value)
    }

    const handleMarginAmountChange = (value) => {
        setMarginAmount(value)
    }

    const getPlanInfo = () => {
        if (props.token) {
            setIsLoading(true)
            fetch(
                API_URL_ADMIN + 'admin/electricity-rates/' + props.propertyUUID,
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
                        setIsLoading(false)
                        console.log('here is ER result', result)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    useEffect(() => {
        getPlanInfo()
        getPlanInfo()
    }, [])

    return (
        <>
            <hr className="propertiesHrLcu" />
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item>
                    <Grid container direction="row" alignItems="center">
                        <Grid item>
                            <div className="greyHeader">
                                <FlashOnOutlinedIcon
                                    fontSize="large"
                                    sx={{
                                        marginRight: '5px',
                                        marginTop: '-4px',
                                    }}
                                />
                                Electricity Rate Plan
                            </div>
                        </Grid>
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                        ></Divider>
                        <Grid item>
                            <div className="light-grey plan-badge">
                                <div className="badgeBox">
                                    <span className="badgeText">
                                        {l1PlanName}
                                    </span>
                                </div>
                            </div>
                        </Grid>
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                        ></Divider>
                        <Grid item>
                            <div className="light-grey plan-badge">
                                <div className="badgeBox">
                                    <span className="badgeText">
                                        {l2PlanName}
                                    </span>
                                </div>
                            </div>
                        </Grid>
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                        ></Divider>
                        <Grid item>
                            <div>Margin</div>
                            <div className="ratePlanRegularText">Absolute</div>
                        </Grid>
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                        ></Divider>
                        <Grid item xs="auto">
                            <div>Amount Of Margin</div>
                            <div className="ratePlanRegularText">$5.00</div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    {!planDetailsOpened ? (
                        <ExpandMoreIcon
                            className="expandIcon"
                            onClick={toggleInfo}
                        />
                    ) : (
                        <ExpandLessIcon
                            className="expandIcon"
                            onClick={toggleInfo}
                        />
                    )}
                </Grid>
            </Grid>
            {!isLoading && (
                <Collapse in={planDetailsOpened}>
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
                                id="l1planName"
                                label="L1 Plan Name"
                                variant="outlined"
                                value={l1PlanName}
                                onChange={(e) =>
                                    handlePlanNameChange(e.target.value, 'l1')
                                }
                                // onBlur={() => saveLCUInfo()}
                                InputProps={{
                                    endAdornment: <EditOutlinedIcon />,
                                }}
                            />
                        </Grid>
                        <Grid item lg={3} md={6} s={12} xs={12}>
                            <TextField
                                fullWidth
                                className="editableField"
                                id="l2planName"
                                label="L2 Plan Name"
                                variant="outlined"
                                value={l2PlanName}
                                onChange={(e) =>
                                    handlePlanNameChange(e.target.value, 'l2')
                                }
                                // onBlur={() => saveLCUInfo()}
                                InputProps={{
                                    endAdornment: <EditOutlinedIcon />,
                                }}
                            />
                        </Grid>
                        <Grid item lg={3} md={6} s={12} xs={12}>
                            <FormControl
                                fullWidth
                                className="editableFieldSelectContainer"
                            >
                                <InputLabel id="l1Setting">
                                    L1 Setting
                                </InputLabel>
                                <Select
                                    labelId="l1Setting"
                                    variant="outlined"
                                    id="l1Setting"
                                    value={l1Setting}
                                    onChange={(e) =>
                                        handleSettingChange(
                                            e.target.value,
                                            'l1'
                                        )
                                    }
                                    // onBlur={() => saveLCUInfo()}
                                    label="L1 Setting"
                                >
                                    {settings?.map((option) => {
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
                            <FormControl
                                fullWidth
                                className="editableFieldSelectContainer"
                            >
                                <InputLabel id="l2Setting">
                                    L2 Setting
                                </InputLabel>
                                <Select
                                    labelId="l2Setting"
                                    variant="outlined"
                                    id="l2Setting"
                                    value={l2Setting}
                                    onChange={(e) =>
                                        handleSettingChange(
                                            e.target.value,
                                            'l2'
                                        )
                                    }
                                    // onBlur={() => saveLCUInfo()}
                                    label="L2 Setting"
                                >
                                    {settings?.map((option) => {
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
                            <FormControl
                                fullWidth
                                className="editableFieldSelectContainer"
                            >
                                <InputLabel id="plan">Margin</InputLabel>
                                <Select
                                    labelId="margin"
                                    variant="outlined"
                                    id="margin"
                                    value={margin}
                                    onChange={(e) =>
                                        handleMarginChange(e.target.value)
                                    }
                                    // onBlur={() => saveLCUInfo()}
                                    label="Margin"
                                >
                                    {margins?.map((option) => {
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
                                id="marginAmount"
                                label="Amount of Margin"
                                variant="outlined"
                                value={marginAmount}
                                onChange={(e) =>
                                    handleMarginAmountChange(e.target.value)
                                }
                                // onBlur={() => saveLCUInfo()}
                                InputProps={{
                                    endAdornment: <EditOutlinedIcon />,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Collapse>
            )}
            {isLoading && (
                <div className="loaderContainer">
                    <CircularProgress style={{ color: '#12BFA2' }} />
                </div>
            )}
        </>
    )
}
