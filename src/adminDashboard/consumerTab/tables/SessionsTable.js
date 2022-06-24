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

function createData(vehicle, spotId, date, start, length, time, kwh, cost) {
    return { vehicle, spotId, date, start, length, time, kwh, cost }
}

const SessionsTable = (props) => {
    const rows = [
        createData(
            'Johns Tesla M3',
            '1243',
            '04.06',
            '5:45PM PST',
            '7hrs 50 min',
            '3hrs 45min',
            '255 kWh',
            '22'
        ),
        createData(
            'Johns Tesla M3',
            '1243',
            '04.01',
            '5:45PM PST',
            '7hrs 50 min',
            '3hrs 45min',
            '190 kWh',
            '10.22'
        ),
    ]

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Vehicle</StyledTableCell>
                        <StyledTableCell>Parking Spot</StyledTableCell>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell>Session Start</StyledTableCell>
                        <StyledTableCell>Session Length</StyledTableCell>
                        <StyledTableCell>Active Charging Time</StyledTableCell>
                        <StyledTableCell>Total kWh</StyledTableCell>
                        <StyledTableCell>Total Charging Cost</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.vehicle}>
                            <StyledTableCell component="th" scope="row">
                                {row.vehicle}
                            </StyledTableCell>
                            <StyledTableCell>{row.spotId}</StyledTableCell>
                            <StyledTableCell>{row.date}</StyledTableCell>
                            <StyledTableCell>{row.start}</StyledTableCell>
                            <StyledTableCell>{row.length}</StyledTableCell>
                            <StyledTableCell>{row.time}</StyledTableCell>
                            <StyledTableCell>{row.kwh}</StyledTableCell>
                            <StyledTableCell>${row.cost}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SessionsTable
