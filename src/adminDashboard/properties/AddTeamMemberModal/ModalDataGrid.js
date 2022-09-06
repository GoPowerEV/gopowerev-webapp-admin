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
import { API_URL_ADMIN } from '../../../constants'

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
    const [existingTeamSize, setExistingTeamSize] = React.useState(0)
    const [installerTeam, setInstallerTeam] = React.useState([])
    const [propertyTeam, setPropertyTeam] = React.useState([])
    const [rows, setRows] = React.useState([])

    const getInstallerTeam = () => {
        if (props.token && props.propertyUUID) {
            fetch(
                API_URL_ADMIN +
                    'admin/property-installers/' +
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
                        setInstallerTeam(result)
                    },
                    (error) => {}
                )
        }
    }

    const getPropertyTeam = () => {
        if (props.token && props.propertyUUID) {
            fetch(
                API_URL_ADMIN +
                    'admin/property-administrators/' +
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
                        setPropertyTeam(result)
                    },
                    (error) => {}
                )
        }
    }

    const handleSelection = (value) => {
        if (3 - existingTeamSize >= value.length) {
            setSelectionModel(value)
            props.setSelectionModel(value)
            if (value?.length > 0) {
                props.setDisableAssignButton(false)
            } else {
                props.setDisableAssignButton(true)
            }
        }
    }

    const getPartnerRole = (role) => {
        let roleToReturn = '-'
        if (role === 'PROPERTY_OWNER') {
            roleToReturn = 'Owner'
        } else if (role === 'ADMIN') {
            roleToReturn = 'Admin'
        } else {
            roleToReturn = 'Manager'
        }

        return roleToReturn
    }

    const transformData = () => {
        let rowsTemp = []
        const data =
            props.showInstaller === true ? props.installerData : props.adminData
        if (
            data &&
            props.showInstaller !== undefined &&
            installerTeam &&
            propertyTeam
        ) {
            console.log('here is the grid data', data)
            data.forEach((element) => {
                const tempObj = {
                    id: element.cognitoUUID,
                    role:
                        props.showInstaller === true
                            ? 'Installer'
                            : getPartnerRole(element.role),
                    name: element.firstName
                        ? element.firstName + ' ' + element.lastName
                        : '-',
                    email: element.email,
                }
                if (props.showInstaller !== undefined) {
                    const arrayToCheckOn =
                        props.showInstaller === true
                            ? installerTeam
                            : propertyTeam
                    let obj = arrayToCheckOn.find(
                        (o) => o.cognitoUUID === tempObj.id
                    )
                    if (!rowsTemp.includes(tempObj) && !obj) {
                        rowsTemp.push(tempObj)
                    }
                }
            })
        }
        setRows(rowsTemp)
    }

    React.useEffect(() => {
        getInstallerTeam()
        getPropertyTeam()
    }, [props.token, props.propertyUUID])

    React.useEffect(() => {
        setRows([])
        if (props.installerData && props.adminData) {
            transformData()
        }
        setExistingTeamSize(
            props.showInstaller === true
                ? installerTeam?.length
                : propertyTeam?.length
        )
    }, [installerTeam, propertyTeam, props.installerData, props.adminData])

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
