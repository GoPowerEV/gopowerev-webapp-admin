import React, { useState, useEffect } from 'react'
import { currencyFormatter } from './../../generalUtils/GeneralUtils'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import './ConsumerTab.css'
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
import ConsumerDetails from './ConsumerDetails'
import { getAllCustomers } from './../dashboardService'

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

function createData(
    id,
    name,
    number,
    email,
    property,
    status,
    standing,
    balance
) {
    return { id, name, number, email, property, status, standing, balance }
}

const ConsumerTab = (props) => {
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [searchVal, setSearchVal] = useState()
    const [allConsumers, setAllConsumers] = useState([])
    const [rows, setRows] = useState([])
    const [allRows, setAllRows] = useState([])
    const [activeSearch, setActiveSearch] = useState(false)
    const [currentlyViewedCustomer, setCurrentlyViewedCustomer] = useState({})

    const handeSearchChange = (value) => {
        setSearchVal(value)
    }

    const goToDetails = (id) => {
        let allConsumersTemp = JSON.parse(JSON.stringify(allConsumers))
        let result = allConsumersTemp.filter(
            (consumer) => consumer.user?.cognitoUuid === id
        )
        setCurrentlyViewedCustomer(result)
        setShowDetails(true)
    }

    const goBack = () => {
        setShowDetails(false)
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
            getAllCustomers(props.token, setIsLoading, setAllConsumers)
        }
    }, [props.token])

    useEffect(() => {
        let allConsumersTemp = JSON.parse(JSON.stringify(allConsumers))
        setRows([])
        if (searchVal?.length > 2) {
            setActiveSearch(true)
            let results = allConsumersTemp.filter(
                (consumer) =>
                    consumer.property?.name
                        ?.toLowerCase()
                        .includes(searchVal.toLowerCase()) ||
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
                    let userInfo = consumer.user
                    let propertyInfo = consumer.property
                    let requestInfo = consumer.propertyRequest
                    let walletInfo = consumer.userWallet
                    tempRows.push(
                        createData(
                            userInfo?.cognitoUuid,
                            userInfo.firstName + ' ' + userInfo.lastName,
                            userInfo.phoneNumber,
                            userInfo.email,
                            propertyInfo.name,
                            requestInfo.status.charAt(0).toUpperCase() +
                                requestInfo.status.slice(1),
                            walletInfo.creditStanding === false
                                ? 'Bad'
                                : 'Good',
                            walletInfo.creditBalance / 100
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
    }, [allConsumers, allRows, searchVal])

    useEffect(() => {
        setRows([])
        if (allConsumers?.length > 0 && !activeSearch) {
            let tempRows = []
            allConsumers.forEach((consumer) => {
                let userInfo = consumer.user
                let propertyInfo = consumer.property
                let requestInfo = consumer.propertyRequest
                let walletInfo = consumer.userWallet
                tempRows.push(
                    createData(
                        userInfo?.cognitoUuid,
                        userInfo.firstName + ' ' + userInfo.lastName,
                        userInfo.phoneNumber,
                        userInfo.email,
                        propertyInfo.name,
                        requestInfo.status.charAt(0).toUpperCase() +
                            requestInfo.status.slice(1),
                        walletInfo.creditStanding === false ? 'Bad' : 'Good',
                        walletInfo.creditBalance / 100
                    )
                )
            })
            setRows(removeDups(tempRows))
            setAllRows(removeDups(tempRows))
        }
    }, [activeSearch, allConsumers])

    return (
        <React.Fragment>
            <div className="consumerMainBody">
                {!showDetails ? (
                    <>
                        <div className="tabHeader">Search Results</div>
                        <Grid
                            container
                            className="allPropertiesContainer"
                            xs={7}
                        >
                            <TextField
                                id="search"
                                className="searchField"
                                fullWidth
                                placeholder="Search by User ID, Name, Phone Number, or Property Name"
                                variant="outlined"
                                value={searchVal}
                                onChange={(e) =>
                                    handeSearchChange(e.target.value)
                                }
                                InputProps={{
                                    endAdornment: <SearchOutlinedIcon />,
                                }}
                            />
                        </Grid>
                        <hr className="consumerHr" />
                        {activeSearch && (
                            <div className="search-header">
                                Based on your search we found {rows?.length}{' '}
                                results
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
                                            <StyledTableCell>
                                                Name
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                Number
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                Email
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                Property
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                Status
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                Standing
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                Balance
                                            </StyledTableCell>
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
                                                    onClick={() =>
                                                        goToDetails(row.id)
                                                    }
                                                >
                                                    {row.name}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    onClick={() =>
                                                        goToDetails(row.id)
                                                    }
                                                >
                                                    {row.number}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    onClick={() =>
                                                        goToDetails(row.id)
                                                    }
                                                >
                                                    {row.email}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    onClick={() =>
                                                        goToDetails(row.id)
                                                    }
                                                >
                                                    {row.property}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    onClick={() =>
                                                        goToDetails(row.id)
                                                    }
                                                >
                                                    {row.status ===
                                                    'Pending' ? (
                                                        <span className="pending-tile">
                                                            {row.status}
                                                        </span>
                                                    ) : (
                                                        row.status
                                                    )}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    onClick={() =>
                                                        goToDetails(row.id)
                                                    }
                                                >
                                                    {row.standing === 'Bad' ? (
                                                        <span className="red-text">
                                                            {row.standing}
                                                        </span>
                                                    ) : (
                                                        row.standing
                                                    )}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    onClick={() =>
                                                        goToDetails(row.id)
                                                    }
                                                >
                                                    {currencyFormatter.format(
                                                        row.balance
                                                    )}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <Button
                                                        className="consumer-tab-action-button"
                                                        variant="contained"
                                                    >
                                                        Activate
                                                    </Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </>
                ) : (
                    <ConsumerDetails
                        token={props.token}
                        goBack={goBack}
                        currentlyViewedCustomer={currentlyViewedCustomer}
                    />
                )}
            </div>
            {isLoading && (
                <div>
                    <CircularProgress style={{ color: '#12BFA2' }} />
                </div>
            )}
        </React.Fragment>
    )
}

export default ConsumerTab
