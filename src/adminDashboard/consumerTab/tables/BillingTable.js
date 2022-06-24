import React from 'react'
import './../ConsumerTab.css'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontWeight: 'bold',
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

function createData(date, transaction, credits, debits, balance) {
    return { date, transaction, credits, debits, balance }
}

const BillingTable = (props) => {
    const rows = [
        createData('04/06', 'Funds Added', '25', null, 50),
        createData('04/01', 'Card debited', null, '15', 35),
    ]

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell>Transaction</StyledTableCell>
                        <StyledTableCell>Credits</StyledTableCell>
                        <StyledTableCell>Debits</StyledTableCell>
                        <StyledTableCell>Balance</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell>{row.date}</StyledTableCell>
                            <StyledTableCell>{row.transaction}</StyledTableCell>
                            <StyledTableCell>
                                {row.credits ? '$' + row.credits : '-'}
                            </StyledTableCell>
                            <StyledTableCell>
                                {row.debits ? '$' + row.debits : '-'}
                            </StyledTableCell>
                            <StyledTableCell>${row.balance}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BillingTable
