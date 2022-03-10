import React, { useState, useEffect } from 'react'
import {
    Button,
    Collapse,
    CircularProgress,
    TextField,
    Grid,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    OutlinedInput,
    InputAdornment,
} from '@material-ui/core'
import { API_URL_ADMIN } from '../../../constants'
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined'
import './ElectricityRatePlan.css'

const margins = [
    { value: 'ABSOLUTE', label: 'Absolute' },
    { value: 'RELATIVE', label: 'Relative' },
    { value: 'NOTHING', label: 'None' },
]

const settings = [
    { value: '1', label: 'First Settng' },
    { value: '2', label: 'Second Settng' },
]

export default function ElectricityRatePlan(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [planDetailsOpened, setPlanDetailsOpened] = useState(false)
    const [utilityRatePlan, setUtilityRatePlan] = useState(null)
    const [l1MaginRate, setL1MaginRate] = useState(null)
    const [l2MaginRate, setL2MaginRate] = useState(null)
    const [marginAmount, setMarginAmount] = useState(null)
    const [margin, setMargin] = useState(0.0)
    const [disabledButton, setDisabledButton] = useState(true)

    const toggleInfo = () => {
        setPlanDetailsOpened(!planDetailsOpened)
    }

    const handlePlanNameChange = (value) => {
        setUtilityRatePlan(value)
    }

    const handleSettingChange = (value, type) => {
        if (type === 'l1') {
            setL1MaginRate(value)
        } else {
            setL2MaginRate(value)
        }
    }

    const handleMarginAmountChange = (value) => {
        setMarginAmount(value)
    }

    const handleRadioButtonChange = (event) => {
        const zero = 0
        if (event.target.value === 'NOTHING') {
            setMarginAmount(0)
        }
        if (event.target.value === 'ABSOLUTE') {
            setMarginAmount(zero.toFixed(3))
        }
        if (event.target.value === 'RELATIVE') {
            setMarginAmount(zero.toFixed(1))
        }
        setMargin(event.target.value)
    }

    const getMargins = (chargeType) => {
        if (props.token && props.propertyUUID) {
            setIsLoading(true)
            fetch(API_URL_ADMIN + 'admin/electricity-margins/' + chargeType, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoading(false)
                        console.log('here is margins result', result)
                    },
                    (error) => {
                        setIsLoading(false)
                    }
                )
        }
    }

    const getPlanInfo = () => {
        if (props.token && props.propertyUUID) {
            setIsLoading(true)
            fetch(
                API_URL_ADMIN +
                    'admin/property-power-plans/' +
                    props.propertyUUID,
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

    const validateRelative = () => {
        let showError = false
        if (parseFloat(marginAmount) < 0.0 || parseFloat(marginAmount) > 50.0) {
            showError = true
        }
        return showError
    }

    const validateAbsolute = () => {
        let showError = false
        if (parseFloat(marginAmount) < 0.0 || parseFloat(marginAmount) > 0.15) {
            showError = true
        }
        return showError
    }

    useEffect(() => {
        getPlanInfo()
        getMargins('L1')
        getMargins('L2')
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
                        {!planDetailsOpened && (
                            <>
                                <Divider
                                    orientation="vertical"
                                    variant="middle"
                                    flexItem
                                ></Divider>
                                <Grid item>
                                    <div className="light-grey plan-badge">
                                        {utilityRatePlan && (
                                            <div className="badgeBox">
                                                <span className="badgeText">
                                                    {utilityRatePlan}
                                                </span>
                                            </div>
                                        )}
                                        {!utilityRatePlan && <div>No Plan</div>}
                                    </div>
                                </Grid>
                                <Divider
                                    orientation="vertical"
                                    variant="middle"
                                    flexItem
                                ></Divider>
                                <Grid item>
                                    <div>Margin</div>
                                    <div className="ratePlanRegularText">
                                        {margin.charAt(0).toUpperCase() +
                                            margin.slice(1).toLowerCase()}
                                    </div>
                                </Grid>
                                <Divider
                                    orientation="vertical"
                                    variant="middle"
                                    flexItem
                                ></Divider>
                                <Grid item xs="auto">
                                    <div>Amount Of Margin</div>
                                    <div className="ratePlanRegularText">-</div>
                                </Grid>
                            </>
                        )}
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
                                id="planName"
                                label="Utility Rate Plan"
                                variant="outlined"
                                value={utilityRatePlan}
                                onChange={(e) =>
                                    handlePlanNameChange(e.target.value)
                                }
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
                                    L1 Margin Rate Plan
                                </InputLabel>
                                <Select
                                    labelId="l1Setting"
                                    variant="outlined"
                                    id="l1Setting"
                                    value={l1MaginRate}
                                    onChange={(e) =>
                                        handleSettingChange(
                                            e.target.value,
                                            'l1'
                                        )
                                    }
                                    label="L1 Margin Rate Plan"
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
                                    L2 Margin Rate Plan
                                </InputLabel>
                                <Select
                                    labelId="l2Setting"
                                    variant="outlined"
                                    id="l2Setting"
                                    value={l2MaginRate}
                                    onChange={(e) =>
                                        handleSettingChange(
                                            e.target.value,
                                            'l2'
                                        )
                                    }
                                    label="L2 Margin Rate Plan"
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
                        <Grid item lg={12} md={12} s={12} xs={12}>
                            <FormControl className="radioButtonGroup">
                                <FormLabel id="demo-row-radio-buttons-group-label">
                                    Margin Type
                                </FormLabel>
                                <RadioGroup
                                    value={margin}
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    {margins?.map((option) => {
                                        return (
                                            <FormControlLabel
                                                key={option.value}
                                                value={option.value}
                                                label={option.label}
                                                onChange={
                                                    handleRadioButtonChange
                                                }
                                                control={
                                                    <Radio
                                                        color="#12BFA2 !important"
                                                        sx={{
                                                            color:
                                                                '#12BFA2 !important',
                                                            '&.Mui-checked': {
                                                                color:
                                                                    '#12BFA2 !important',
                                                            },
                                                        }}
                                                    />
                                                }
                                            />
                                        )
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {margin === 'ABSOLUTE' && (
                            <Grid item lg={3} md={6} s={12} xs={12}>
                                <FormControl
                                    fullWidth
                                    sx={{ m: 1 }}
                                    className="editableFieldSelectContainer"
                                >
                                    <InputLabel htmlFor="outlined-adornment-amount">
                                        Margin
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        value={marginAmount}
                                        type="number"
                                        error={validateAbsolute() === true}
                                        helperText="Must be between 0.000 and 0.150"
                                        onChange={(e) =>
                                            handleMarginAmountChange(
                                                e.target.value
                                            )
                                        }
                                        startAdornment={
                                            <InputAdornment position="start">
                                                $
                                            </InputAdornment>
                                        }
                                        label="Amount"
                                    />
                                </FormControl>
                            </Grid>
                        )}
                        {margin === 'RELATIVE' && (
                            <Grid item lg={3} md={6} s={12} xs={12}>
                                <FormControl
                                    fullWidth
                                    sx={{ m: 1 }}
                                    className="editableFieldSelectContainer"
                                >
                                    <InputLabel htmlFor="outlined-adornment-amount">
                                        Margin
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        type="number"
                                        error={validateRelative() === true}
                                        helperText="Must be between 0.0 and 50.0"
                                        value={marginAmount}
                                        onChange={(e) =>
                                            handleMarginAmountChange(
                                                e.target.value
                                            )
                                        }
                                        startAdornment={
                                            <InputAdornment position="start">
                                                %
                                            </InputAdornment>
                                        }
                                        label="Amount"
                                    />
                                </FormControl>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button
                                className="savePlanButton"
                                variant="outlined"
                                disabled={disabledButton}
                            >
                                Save
                            </Button>
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
