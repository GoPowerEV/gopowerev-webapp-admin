import React, { useState, useEffect } from 'react'
import {
    Button,
    Collapse,
    CircularProgress,
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
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined'
import {
    getPlanOptions,
    getMargins,
    getPlanInfo,
    savePlanInfo,
    updatePlanInfo,
} from './ElectricityRatePlanUtils'
import './ElectricityRatePlan.css'

const margins = [
    { value: 'DELTA', label: 'Absolute' },
    { value: 'PERCENTAGE', label: 'Relative' },
    { value: 'NOTHING', label: 'None' },
]

export default function ElectricityRatePlan(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [planDetailsOpened, setPlanDetailsOpened] = useState(false)
    const [utilityRatePlan, setUtilityRatePlan] = useState('')
    const [utilityRatePlanString, setUtilityRatePlanString] = useState('')
    const [l1MarginRate, setL1MarginRate] = useState('')
    const [l2MarginRate, setL2MarginRate] = useState('')
    const [marginAmount, setMarginAmount] = useState('')
    const [margin, setMargin] = useState(0.0)
    const [ratePlanOptions, setRatePlanOptions] = useState([])
    const [l1Options, setL1Options] = useState([])
    const [l2Options, setL2Options] = useState([])
    const [disabledButton, setDisabledButton] = useState(true)
    const [planInfo, setPlanInfo] = useState({})

    const toggleInfo = () => {
        if (planDetailsOpened) {
            getPlanInfo(
                props.token,
                props.propertyUUID,
                setIsLoading,
                setPlanInfo
            )
        }
        setPlanDetailsOpened(!planDetailsOpened)
    }

    const handlePlanNameChange = (value) => {
        setUtilityRatePlan(value)
    }

    const handleSettingChange = (value, type) => {
        if (type === 'l1') {
            setL1MarginRate(value)
        } else {
            setL2MarginRate(value)
        }
    }

    const handleMarginAmountChange = (value) => {
        setMarginAmount(value)
    }

    const handleRadioButtonChange = (event) => {
        if (event.target.value === 'NOTHING') {
            setMarginAmount(0)
        }
        if (event.target.value === 'DELTA') {
            setMarginAmount(parseFloat(0.001))
        }
        if (event.target.value === 'PERCENTAGE') {
            setMarginAmount(parseFloat(0.1))
        }
        setMargin(event.target.value)
    }

    const validateRelative = () => {
        let showError = false
        if (
            parseFloat(marginAmount) < parseFloat(0.1) ||
            parseFloat(marginAmount) > parseFloat(50.0) ||
            !marginAmount ||
            marginAmount?.length === 0
        ) {
            showError = true
        }
        return showError
    }

    const validateAbsolute = () => {
        let showError = false
        if (
            parseFloat(marginAmount) < parseFloat(0.001) ||
            parseFloat(marginAmount) > parseFloat(0.15) ||
            !marginAmount ||
            marginAmount?.length === 0
        ) {
            showError = true
        }
        return showError
    }

    const saveThis = () => {
        const dataToSend = {
            electricityRatesUUID: utilityRatePlan,
            l1electricityMarginsUUID: l1MarginRate,
            l2electricityMarginsUUID: l2MarginRate,
            ownerMarginAmount: Number(marginAmount),
            ownerMarginType: margin,
            propertyUUID: props.propertyUUID,
        }
        savePlanInfo(props.token, setIsLoading, dataToSend, toggleInfo)
    }

    const updateThis = () => {
        const dataToSend = {
            electricityRatesUUID: utilityRatePlan,
            l1electricityMarginsUUID: l1MarginRate,
            l2electricityMarginsUUID: l2MarginRate,
            ownerMarginAmount: Number(marginAmount),
            ownerMarginType: margin,
            propertyUUID: props.propertyUUID,
        }
        updatePlanInfo(
            props.token,
            setIsLoading,
            dataToSend,
            toggleInfo,
            planInfo.propertyPowerPlanUUID
        )
    }

    useEffect(() => {
        if (
            marginAmount === undefined ||
            marginAmount?.length < 1 ||
            !l1MarginRate ||
            !l2MarginRate ||
            !margin ||
            !utilityRatePlan
        ) {
            setDisabledButton(true)
        } else {
            setDisabledButton(false)
        }
    }, [marginAmount, l1MarginRate, l2MarginRate, margin, utilityRatePlan])

    useEffect(() => {
        getPlanInfo(props.token, props.propertyUUID, setIsLoading, setPlanInfo)
        getPlanOptions(setIsLoading, props.token, setRatePlanOptions)
        getMargins('L1', setIsLoading, props.token, setL1Options)
        getMargins('L2', setIsLoading, props.token, setL2Options)
    }, [props.token, props.propertyUUID])

    useEffect(() => {
        if (
            planInfo &&
            ratePlanOptions?.length > 0 &&
            l1Options?.length > 0 &&
            l2Options?.length > 0
        ) {
            setMarginAmount(planInfo.ownerMarginAmount)
            setMargin(planInfo.ownerMarginType)
            setMarginAmount(planInfo.ownerMarginAmount)
            setUtilityRatePlanString(
                ratePlanOptions.find(
                    (x) => x.value === planInfo.electricityRatesUUID
                )?.label
            )
            setUtilityRatePlan(planInfo.electricityRatesUUID)
            console.log('here setting l1', l1MarginRate)
            setL1MarginRate(planInfo.l1electricityMarginsUUID)
            setL2MarginRate(planInfo.l2electricityMarginsUUID)
        }
    }, [
        l1MarginRate,
        l1Options?.length,
        l2Options?.length,
        planInfo,
        ratePlanOptions,
    ])

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
                                    <div
                                        className={
                                            utilityRatePlanString
                                                ? 'blue plan-badge'
                                                : 'light-grey plan-badge'
                                        }
                                    >
                                        {utilityRatePlanString && (
                                            <div className="badgeBox">
                                                <span className="badgeText">
                                                    {utilityRatePlanString}
                                                </span>
                                            </div>
                                        )}
                                        {!utilityRatePlanString && (
                                            <div>No Plan</div>
                                        )}
                                    </div>
                                </Grid>
                                <Divider
                                    orientation="vertical"
                                    variant="middle"
                                    flexItem
                                ></Divider>
                                <Grid item>
                                    <div>Property Owner Margin</div>
                                    <div className="ratePlanRegularText">
                                        {!margin
                                            ? '-'
                                            : margin?.charAt(0).toUpperCase() +
                                              margin?.slice(1).toLowerCase()}
                                    </div>
                                </Grid>
                                <Divider
                                    orientation="vertical"
                                    variant="middle"
                                    flexItem
                                ></Divider>
                                <Grid item xs="auto">
                                    <div>Amount Of Margin</div>
                                    <div className="ratePlanRegularText">
                                        {marginAmount ?? '-'}
                                    </div>
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
                            <FormControl
                                fullWidth
                                className="editableFieldSelectContainer"
                            >
                                <InputLabel id="utilityRatePlan">
                                    Utility Rate Plan
                                </InputLabel>
                                <Select
                                    labelId="utilityRatePlan"
                                    variant="outlined"
                                    id="utilityRatePlan"
                                    value={utilityRatePlan}
                                    onChange={(e) =>
                                        handlePlanNameChange(e.target.value)
                                    }
                                    label="Utility Rate Plan"
                                >
                                    {ratePlanOptions?.map((option) => {
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
                                <InputLabel id="l1Setting">
                                    L1 Margin Rate Plan
                                </InputLabel>
                                <Select
                                    labelId="l1Setting"
                                    variant="outlined"
                                    id="l1Setting"
                                    value={l1MarginRate}
                                    onChange={(e) =>
                                        handleSettingChange(
                                            e.target.value,
                                            'l1'
                                        )
                                    }
                                    label="L1 Margin Rate Plan"
                                >
                                    {l1Options?.map((option) => {
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
                                    value={l2MarginRate}
                                    onChange={(e) =>
                                        handleSettingChange(
                                            e.target.value,
                                            'l2'
                                        )
                                    }
                                    label="L2 Margin Rate Plan"
                                >
                                    {l2Options?.map((option) => {
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
                        {margin === 'DELTA' && (
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
                                        helperText="Must be between 0.001 and 0.150"
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
                        {margin === 'PERCENTAGE' && (
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
                                        helperText="Must be between 0.1 and 50.0"
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
                        {planInfo && (
                            <Grid item xs={12}>
                                <Button
                                    className="savePlanButton"
                                    variant="outlined"
                                    disabled={disabledButton}
                                    onClick={() => updateThis()}
                                >
                                    Save Changes
                                </Button>
                            </Grid>
                        )}
                        {!planInfo && (
                            <Grid item xs={12}>
                                <Button
                                    className="savePlanButton"
                                    variant="outlined"
                                    disabled={disabledButton}
                                    onClick={() => saveThis()}
                                >
                                    Save
                                </Button>
                            </Grid>
                        )}
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
