import React from 'react'
import { Tab, AppBar } from '@material-ui/core'
import { TabContext, TabList } from '@material-ui/lab'
import './MainNav.css'

const MainNav = (props) => {

    return (
        <TabContext value={props.value}>
            <AppBar position="relative" className="menu-items">
                <TabList
                    TabIndicatorProps={{ style: { background: '#16A44A' } }}
                    aria-label="simple tabs example"
                >
                    {/* <Tab
                        label="Dashboard"
                        className={props.loggedIn ? '' : 'hide-this'}
                        value={'0'}
                        onClick={() => props.handleMenuChange('0', 'dashboard')}
                    /> */}
                    <Tab
                        label={props.loggedIn ? 'Logout' : 'Login'}
                        className="customTab"
                        value={'2'}
                        onClick={() =>
                            props.handleMenuChange(
                                '2',
                                props.loggedIn ? 'logout' : 'login'
                            )
                        }
                    />
                </TabList>
            </AppBar>
        </TabContext>
    )
}
export default MainNav
