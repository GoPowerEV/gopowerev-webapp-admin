import React from 'react'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import './Installers.css'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        borderRadius: '15px',
        height: '100%',
        cursor: 'pointer',
        '&:hover': {
            background: '#9e9e9e38',
        },
    },
    content: {
        marginTop: '-10px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    cardHeader: {
        fontSize: 19,
        fontWeight: '600',
        marginBottom: '15px',
    },
    installerLocation: {
        fontSize: 16,
        fontWeight: '600',
        color: 'grey',
    },
    pos: {
        marginBottom: 12,
    },
})

const InstallerCard = (props) => {
    const classes = useStyles()
    const installerInfo = props.installer

    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Typography className={classes.cardHeader}>
                        {installerInfo.firstName ?? 'No name available'}
                        {installerInfo.lastName ?? ''}
                    </Typography>
                    <Typography className={classes.installerLocation}>
                        {installerInfo.email}
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default InstallerCard
