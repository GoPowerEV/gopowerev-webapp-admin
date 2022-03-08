import * as React from 'react'
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid'
import { CircularProgress } from '@material-ui/core'
import { styled } from '@mui/material/styles'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'

function customCheckbox(theme) {
    return {
        '& .MuiCheckbox-root svg': {
            width: 16,
            height: 16,
            backgroundColor: 'transparent',
            border: `1px solid ${
                theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
            }`,
            borderRadius: 2,
        },
        '& .MuiCheckbox-root svg path': {
            display: 'none',
        },
        '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
            backgroundColor: '#12bfa2',
            borderColor: '#12bfa2',
        },
        '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
            position: 'absolute',
            display: 'table',
            border: '2px solid #fff',
            borderTop: 0,
            borderLeft: 0,
            transform: 'rotate(45deg) translate(-50%,-50%)',
            opacity: 1,
            transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
            content: '""',
            top: '50%',
            left: '39%',
            width: 5.71428571,
            height: 9.14285714,
        },
        '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
            width: 8,
            height: 8,
            backgroundColor: '#1890ff',
            transform: 'none',
            top: '39%',
            border: 0,
        },
    }
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color:
        theme.palette.mode === 'light'
            ? 'rgba(0,0,0,.85)'
            : 'rgba(255,255,255,0.85)',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnHeader': {
        textTransform: 'capitalize',
    },
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-cell': {
        color:
            theme.palette.mode === 'light'
                ? 'rgba(0,0,0,.85)'
                : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 0,
    },
    ...customCheckbox(theme),
}))

function CustomPagination() {
    const apiRef = useGridApiContext()
    const page = useGridSelector(apiRef, gridPageSelector)
    const pageCount = useGridSelector(apiRef, gridPageCountSelector)

    return (
        <Pagination
            color="primary"
            variant="outlined"
            shape="rounded"
            page={page + 1}
            count={pageCount}
            // @ts-expect-error
            renderItem={(props2) => (
                <PaginationItem {...props2} disableRipple />
            )}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    )
}

const columns = [
    {
        field: 'role',
        width: 140,
    },
    {
        field: 'name',
        width: 280,
    },
    {
        field: 'email',
        width: 290,
    },
]

export default function CheckboxSelectionGrid(props) {
    const [selectionModel, setSelectionModel] = React.useState([])
    const [rows, setRows] = React.useState([])

    const handleSelection = (value) => {
        setSelectionModel(value)
        props.setSelectionModel(value)
        if (value?.length > 0) {
            props.setDisableAssignButton(false)
        } else {
            props.setDisableAssignButton(true)
        }
    }

    const transformData = () => {
        if (props.data.length > 0) {
            let rowsTemp = []
            props.data.forEach((element) => {
                if (props.installerTeam) {
                    props.installerTeam.forEach((member) => {
                        // Making sure we are not showing installers that a part of this team already
                        if (member.cognitoUUID !== element.cognitoUUID) {
                            const tempObj = {
                                id: element.cognitoUUID,
                                role: props.showInstaller
                                    ? 'Installer'
                                    : element.role,
                                name: element.firstName
                                    ? element.firstName + ' ' + element.lastName
                                    : '-',
                                email: element.email,
                            }
                            rowsTemp.push(tempObj)
                        }
                    })
                } else {
                    const tempObj = {
                        id: element.cognitoUUID,
                        role: props.showInstaller ? 'Installer' : element.role,
                        name: element.firstName
                            ? element.firstName + ' ' + element.lastName
                            : '-',
                        email: element.email,
                    }
                    rowsTemp.push(tempObj)
                }
            })
            setRows(rowsTemp)
        }
    }

    React.useEffect(() => {
        setRows([])
        transformData()
    }, [props.data])

    return (
        <div style={{ width: '100%' }}>
            {props.isLoading && (
                <div className="loaderContainer">
                    <CircularProgress
                        style={{ color: '#12BFA2', marginBottom: '35px' }}
                    />
                </div>
            )}
            {!props.isLoading && (
                <div style={{ height: 300 }}>
                    <StyledDataGrid
                        checkboxSelection
                        onSelectionModelChange={(newSelectionModel) => {
                            handleSelection(newSelectionModel)
                        }}
                        selectionModel={selectionModel}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        components={{
                            Pagination: CustomPagination,
                        }}
                        rows={rows}
                        columns={columns}
                    />
                </div>
            )}
        </div>
    )
}
