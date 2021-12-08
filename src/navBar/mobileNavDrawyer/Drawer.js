import React, { useState } from 'react'
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    makeStyles,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    link: {
        textDecoration: 'none',
        color: 'white !important',
        fontSize: '20px',
        fontFamily: 'Nunito Sans, sans-serif',
        fontWeight: '700',
        borderBottom: '0.5px solid grey',
    },
    icon: {
        color: 'white',
    },
    paper: {
        background: 'black',
        color: 'white !important',
    },
}))

function DrawerComponent() {
    const classes = useStyles()
    const [openDrawer, setOpenDrawer] = useState(false)
    return (
        <>
            <Drawer
                classes={{ paper: classes.paper }}
                open={openDrawer}
                anchor={'right'}
                onClose={() => setOpenDrawer(false)}
            >
                <List>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link className={classes.link} to="/products">
                                Products
                            </Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link className={classes.link} to="/company">
                                Company
                            </Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link className={classes.link} to="/resources">
                                Resources
                            </Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link className={classes.link} to="/support">
                                Support
                            </Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link className={classes.link} to="/login">
                                Login
                            </Link>
                        </ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            <IconButton
                className={classes.icon}
                onClick={() => setOpenDrawer(!openDrawer)}
            >
                <MenuIcon />
            </IconButton>
        </>
    )
}
export default DrawerComponent
