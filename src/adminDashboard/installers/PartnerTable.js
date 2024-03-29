import React, { useState, useEffect } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import './Installers.css'
import { useHistory } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Button from '@material-ui/core/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

import { getAllInstallers } from './../dashboardService'

// Custom stying to make the toggle look like iOS toggle
const IOSSwitch = styled((props) => (
    <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
    />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor:
                    theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        fontFamily: 'Nunito Sans, sans-serif !important',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontWeight: 'bold',
        cursor: 'pointer',
        fontFamily: 'Nunito Sans, sans-serif !important',
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

function createData(id, name, number, email, role) {
    return { id, name, number, email, role }
}

const PartnerTable = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [searchVal, setSearchVal] = useState()
    const [allInstallers, setAllInstallers] = useState([])
    const [rows, setRows] = useState([])
    const [allRows, setAllRows] = useState([])
    const [activeSearch, setActiveSearch] = useState(false)
    const [currentlyViewedCustomer, setCurrentlyViewedCustomer] = useState({})

    const toggleLabel = {
        inputProps: { 'aria-label': 'Enable or disable a user' },
    }

    const handeSearchChange = (value) => {
        setSearchVal(value)
    }

    const removeDups = (array) => {
        const unique = Array.from(new Set(array.map((a) => a.email))).map(
            (email) => {
                return array.find((a) => a.email === email)
            }
        )
        return unique
    }

    useEffect(() => {
        if (props.token) {
            getAllInstallers(props.token, setIsLoading, setAllInstallers)
        }
    }, [props.token])

    useEffect(() => {
        console.log('here is the damn data', allInstallers)
        let allInstallersTemp = JSON.parse(JSON.stringify(allInstallers))
        setRows([])
        if (searchVal?.length > 2) {
            setActiveSearch(true)
            let results = allInstallersTemp.filter(
                (consumer) =>
                    consumer.user?.firstName
                        ?.toLowerCase()
                        .includes(searchVal.toLowerCase()) ||
                    consumer.user?.lastName
                        ?.toLowerCase()
                        .includes(searchVal.toLowerCase()) ||
                    consumer.user?.cognitoUuid
                        ?.toLowerCase()
                        .includes(searchVal.toLowerCase()) ||
                    consumer.user?.phoneNumber
                        ?.toLowerCase()
                        .includes(searchVal.toLowerCase())
            )
            if (results?.length > 0) {
                let tempRows = []
                results.forEach((consumer) => {
                    tempRows.push(
                        createData(
                            consumer?.cognitoUuid,
                            consumer?.firstName + ' ' + consumer?.lastName,
                            consumer?.phoneNumber,
                            consumer?.email,
                            consumer?.role
                        )
                    )
                })
                setRows(removeDups(tempRows))
            } else {
                setRows([])
            }
        } else {
            setRows(removeDups(allRows))
            setActiveSearch(false)
        }
    }, [allInstallers, allRows, searchVal])

    useEffect(() => {
        setRows([])
        if (allInstallers?.length > 0 && !activeSearch) {
            let tempRows = []
            allInstallers.forEach((consumer) => {
                tempRows.push(
                    createData(
                        consumer?.cognitoUuid,
                        consumer?.firstName + ' ' + consumer?.lastName,
                        consumer?.phoneNumber,
                        consumer?.email,
                        consumer?.role
                    )
                )
            })
            setRows(removeDups(tempRows))
            setAllRows(removeDups(tempRows))
        }
    }, [activeSearch, allInstallers])

    return (
        <React.Fragment>
            {!isLoading && (
                <div className="consumerMainBody">
                    <Grid container className="allPropertiesContainer" xs={7}>
                        <TextField
                            id="search"
                            className="searchField"
                            fullWidth
                            placeholder="Search by User ID, Name, Phone Number, or Property Name"
                            variant="outlined"
                            value={searchVal}
                            onChange={(e) => handeSearchChange(e.target.value)}
                            InputProps={{
                                endAdornment: <SearchOutlinedIcon />,
                            }}
                        />
                    </Grid>
                    <hr className="consumerHr" />
                    {activeSearch && (
                        <div className="search-header">
                            Based on your search we found {rows?.length} results
                        </div>
                    )}
                    {rows?.length > 0 && (
                        <TableContainer component={Paper}>
                            <Table
                                sx={{
                                    minWidth: 700,
                                }}
                                aria-label="customized table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>
                                            Number
                                        </StyledTableCell>
                                        <StyledTableCell>Email</StyledTableCell>
                                        <StyledTableCell>Role</StyledTableCell>
                                        <StyledTableCell>
                                            Action
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {row.number}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {row.email}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {row.role}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {/* <Switch
                                                    {...toggleLabel}
                                                    defaultChecked
                                                    style={{
                                                        color: 'red !important',
                                                    }}
                                                /> */}
                                                <FormControlLabel
                                                    control={
                                                        <IOSSwitch
                                                            sx={{ m: 1 }}
                                                            defaultChecked
                                                        />
                                                    }
                                                    label=""
                                                />
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </div>
            )}
            {isLoading && (
                <Stack alignItems="center" style={{ width: '100%' }}>
                    <CircularProgress style={{ color: '#12BFA2' }} />
                </Stack>
            )}
        </React.Fragment>
    )
}

export default PartnerTable
