import React, { useState, useEffect } from 'react'
import { currencyFormatter } from './../../generalUtils/GeneralUtils'
import { REACT_APP_PROPERTY_ADMIN_URL } from '../../constants'
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
import {
    getConsumerStatusClass,
    getConsumerStatusWording,
} from './../../generalUtils/GeneralUtils'
import { getAllCustomers } from './../dashboardService'
import AreYouSureModal from './AreYouSureModal/AreYouSureModal'

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

function createData(id, name, email, property, status, requestInfo) {
    return { id, name, email, property, status, requestInfo }
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
    const [activeTab, setActiveTab] = useState('all')
    const [openModal, setOpenModal] = useState(false)
    const [modalMode, setModalMode] = useState(null)
    const [modalUserName, setModalUserName] = useState(null)
    const [modalUserEmail, setModalUserEmail] = useState(null)
    const [modalUserId, setModalUserId] = useState(null)
    const [modalUserRequest, setModalUserRequest] = useState(null)

    const handleClose = () => {
        setOpenModal(false)
    }

    const handleModalOpen = (mode, name, email, id, requestInfo) => {
        if (mode === 'activate') {
            setModalMode('activate')
        } else if (mode === 'reject') {
            setModalMode('reject')
        } else {
            setModalMode('disable')
        }
        setModalUserName(name)
        setModalUserEmail(email)
        setModalUserRequest(requestInfo)
        setModalUserId(id)
        setOpenModal(true)
    }

    const handeSearchChange = (value) => {
        setSearchVal(value)
    }

    const goToDetails = (id) => {
        let allConsumersTemp = JSON.parse(JSON.stringify(allConsumers))
        let result = allConsumersTemp?.filter(
            (consumer) => consumer.user?.cognitoUuid === id
        )
        setCurrentlyViewedCustomer(result)
        console.log('here setting this result', result)
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

    const handleTabChange = (tab) => {
        setActiveTab(tab)
        if (tab === 'active' || tab === 'pending') {
            setActiveSearch(true)
            const filterOn = tab === 'active' ? 'accepted' : 'requested'
            let allConsumersTemp = JSON.parse(JSON.stringify(allConsumers))
            let results = allConsumersTemp?.filter((consumer) =>
                consumer?.propertyRequest?.status?.includes(
                    filterOn.toLowerCase()
                )
            )

            if (results?.length > 0) {
                let tempRows = []
                results.forEach((consumer) => {
                    let userInfo = consumer.user
                    let propertyInfo = consumer.property
                    let requestInfo = consumer.propertyRequest
                    tempRows.push(
                        createData(
                            userInfo?.cognitoUuid,
                            userInfo.firstName + ' ' + userInfo.lastName,
                            userInfo.email,
                            propertyInfo.name,
                            requestInfo?.status?.charAt(0).toUpperCase() +
                                requestInfo.status.slice(1)
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
    }

    const activateThisUser = (setIsLoading, userRequest) => {
        console.log('here is the request info', userRequest)
        fetch(
            REACT_APP_PROPERTY_ADMIN_URL +
                '/user-property-charging-requests/' +
                userRequest.requestUuid,
            {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'ACCEPTED' }),
            }
        )
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

    const disableThisUser = () => {}

    useEffect(() => {
        if (props.token) {
            getAllCustomers(props.token, setIsLoading, setAllConsumers)
        }
    }, [props.token])

    useEffect(() => {
        if (allConsumers) {
            console.log('here it is', allConsumers)
        }
    }, [allConsumers])

    useEffect(() => {
        let allConsumersTemp = JSON.parse(JSON.stringify(allConsumers))
        if (searchVal?.length > 2) {
            setActiveTab('all')
            setActiveSearch(true)
            let results = allConsumersTemp?.filter(
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
                            userInfo.email,
                            propertyInfo.name,
                            requestInfo?.status?.charAt(0).toUpperCase() +
                                requestInfo.status.slice(1),
                            requestInfo
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
                        userInfo.email,
                        propertyInfo.name,
                        requestInfo?.status?.charAt(0).toUpperCase() +
                            requestInfo?.status?.slice(1),
                        requestInfo
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
                        <div className="tabHeader">Filter By Status</div>
                        <Grid container xs={7}>
                            <Button
                                className={
                                    activeTab === 'all'
                                        ? 'topButton activeButton'
                                        : 'topButton'
                                }
                                variant="contained"
                                onClick={() => handleTabChange('all')}
                            >
                                All
                            </Button>
                            <Button
                                className={
                                    activeTab === 'active'
                                        ? 'topButton activeButton'
                                        : 'topButton'
                                }
                                variant="contained"
                                onClick={() => handleTabChange('active')}
                            >
                                Active
                            </Button>
                            <Button
                                className={
                                    activeTab === 'pending'
                                        ? 'topButton activeButton'
                                        : 'topButton'
                                }
                                variant="contained"
                                onClick={() => handleTabChange('pending')}
                            >
                                Pending
                            </Button>
                        </Grid>
                        <Grid container xs={7}>
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
                                                Status
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                Email
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                Property
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                Action
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <StyledTableRow key={row.id}>
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
                                                    <span
                                                        className={getConsumerStatusClass(
                                                            row.status
                                                        )}
                                                    >
                                                        {getConsumerStatusWording(
                                                            row.status
                                                        )}
                                                    </span>
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
                                                <StyledTableCell>
                                                    {row.status ===
                                                        'Requested' && (
                                                        <>
                                                            <Button
                                                                className="consumer-tab-action-button"
                                                                variant="contained"
                                                                onClick={() =>
                                                                    handleModalOpen(
                                                                        'activate',
                                                                        row.name,
                                                                        row.email,
                                                                        row.id,
                                                                        row.requestInfo
                                                                    )
                                                                }
                                                            >
                                                                Electricity Rate
                                                                Plan
                                                            </Button>
                                                            <Button
                                                                className="consumer-tab-action-button red"
                                                                variant="contained"
                                                                onClick={() =>
                                                                    handleModalOpen(
                                                                        'reject',
                                                                        row.name,
                                                                        row.email,
                                                                        row.id,
                                                                        row.requestInfo
                                                                    )
                                                                }
                                                            >
                                                                Reject
                                                            </Button>
                                                        </>
                                                    )}
                                                    {row.status ===
                                                        'Accepted' && (
                                                        <Button
                                                            className="consumer-tab-action-button red"
                                                            variant="contained"
                                                            onClick={() =>
                                                                handleModalOpen(
                                                                    'disable',
                                                                    row.name,
                                                                    row.email,
                                                                    row.id,
                                                                    row.requestInfo
                                                                )
                                                            }
                                                        >
                                                            Disable
                                                        </Button>
                                                    )}
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
            <AreYouSureModal
                userName={modalUserName}
                userEmail={modalUserEmail}
                userId={modalUserId}
                userRequest={modalUserRequest}
                modalMode={modalMode}
                handleClose={handleClose}
                open={openModal}
                token={props.token}
                activateThisUser={activateThisUser}
                disableThisUser={disableThisUser}
            />
        </React.Fragment>
    )
}

export default ConsumerTab
