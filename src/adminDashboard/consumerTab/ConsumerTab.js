import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
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
import Paper from '@mui/material/Paper'
import ConsumerDetails from './ConsumerDetails'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontWeight: 'bold',
        cursor: 'pointer',
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

function createData(name, number, email, property, status, standing, balance) {
    return { name, number, email, property, status, standing, balance }
}

const ConsumerTab = (props) => {
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [searchVal, setSearchVal] = useState()

    const rows = [
        createData(
            'Jaime Flaore',
            '913-388-7526',
            '123@gmail.com',
            'Lakeside Townhomes',
            'Pending',
            'Good',
            25
        ),
        createData(
            'Jaime Flaore',
            '913-388-7526',
            '123@gmail.com',
            'Lakeside Townhomes',
            'Pending',
            'Bad',
            0
        ),
    ]

    const handeSearchChange = (value) => {
        setSearchVal(value)
    }

    const goToDetails = () => {
        setShowDetails(true)
    }

    const goBack = () => {
        setShowDetails(false)
    }

    useEffect(() => {}, [])

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
                                placeholder="Search by User ID, Name, or Mobile"
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
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 700 }}
                                aria-label="customized table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>
                                            Number
                                        </StyledTableCell>
                                        <StyledTableCell>Email</StyledTableCell>
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow
                                            key={row.name}
                                            onClick={() => goToDetails()}
                                        >
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
                                                {row.property}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {row.status === 'Pending' ? (
                                                    <span className="pending-tile">
                                                        {row.status}
                                                    </span>
                                                ) : (
                                                    row.status
                                                )}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {row.standing === 'Bad' ? (
                                                    <span className="red-text">
                                                        {row.standing}
                                                    </span>
                                                ) : (
                                                    row.standing
                                                )}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                ${row.balance}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                ) : (
                    <ConsumerDetails goBack={goBack} />
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
