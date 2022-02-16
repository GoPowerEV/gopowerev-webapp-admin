import React from 'react'
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
    useMediaQuery,
    useTheme,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import MainLogoGreen from './../assets/img/greenLogo.png'
import './Navbar.css'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import DrawerComponent from './mobileNavDrawyer/Drawer'

const useStyles = makeStyles((theme) => ({
    navlinks: {
        marginLeft: theme.spacing(4),
        display: 'flex',
    },
    logo: {
        flexGrow: '1',
        cursor: 'pointer',
    },
    link: {
        textDecoration: 'none',
        cursor: 'pointer',
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        marginLeft: theme.spacing(4),
        marginRight: '10px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '7px',
        paddingBottom: '7px',
        '&:hover': {
            color: '#12BFA2',
            borderBottom: '1px solid #12BFA2',
        },
    },
    activeLink: {
        backgroundColor: '#12BFA2',
        textDecoration: 'none',
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        marginLeft: theme.spacing(4),
        marginRight: '10px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '7px',
        paddingBottom: '7px',
        borderRadius: '17px',
        '&:hover': {
            color: '#FFFFFF',
        },
    },
}))

function Navbar(props) {
    const classes = useStyles()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const location = useLocation()
    const history = useHistory()
    const { pathname } = location
    const splitLocation = pathname.split('/')

    const handleLogoClick = () => {
        history.push('/')
    }

    const goToDashboard = () => {
        history.push('/admin-dashboard')
    }

    return (
        <AppBar position="static" className="appBar">
            <CssBaseline />
            <Toolbar>
                <Typography variant="h4" className={classes.logo}>
                    <img
                        src={MainLogoGreen}
                        className="main-logo"
                        alt="mainLogo"
                        onClick={handleLogoClick}
                    />
                </Typography>
                {isMobile ? (
                    <DrawerComponent />
                ) : (
                    <div className={classes.navlinks}>
                        {!props.loggedIn && (
                            <Link
                                to="/login"
                                className={
                                    splitLocation[1] === 'login'
                                        ? classes.activeLink
                                        : classes.link
                                }
                            >
                                Login
                            </Link>
                        )}
                        {props.loggedIn && (
                            <span
                                onClick={goToDashboard}
                                className={
                                    splitLocation[1] === 'admin-dashboard'
                                        ? classes.activeLink
                                        : classes.link
                                }
                            >
                                Admin Dashboard
                            </span>
                        )}
                        {props.loggedIn && (
                            <span
                                onClick={props.logout}
                                className={classes.link}
                            >
                                Logout
                            </span>
                        )}
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
}
export default Navbar
