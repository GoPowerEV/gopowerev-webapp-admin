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
import FlashOnOutlinedIcon from '@material-ui/icons/FlashOnOutlined'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import ExpandLessIcon from '@material-ui/icons/ExpandLessOutlined'
import './ElectricityRatePlan.css'

const margins = [{ value: '1', label: 'First Option' }]

export default function ElectricityRatePlan(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [planDetailsOpened, setPlanDetailsOpened] = useState(false)
    const [planName, setPlanName] = useState('Plan Name')
    const [marginAmount, setMarginAmount] = useState('5')
    const [margin, setMargin] = useState(1)

    const toggleInfo = () => {
        setPlanDetailsOpened(!planDetailsOpened)
    }

    const handlePlanNameChange = (value) => {
        setPlanName(value)
    }

    const handleMarginChange = (value) => {
        setMargin(value)
    }

    const handleMarginAmountChange = (value) => {
        setMarginAmount(value)
    }

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
                                    <span className="badgeText">Plan Name</span>
                                </div>
                            </div>
                        </Grid>
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                            // sx={{ marginLeft: '25px', marginRight: '25px' }}
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
                                id="planName"
                                label="Plan Name"
                                variant="outlined"
                                value={planName}
                                onChange={(e) =>
                                    handlePlanNameChange(e.target.value)
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
