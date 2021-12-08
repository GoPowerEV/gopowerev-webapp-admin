import React from 'react'
import './Footer.css'
import Grid from '@material-ui/core/Grid'
import YouTubeIcon from '@material-ui/icons/YouTube'
import MainLogoWhite from './../assets/img/mainLogoWhite.png'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'

const Footer = () => {
    return (
        <div className="footer-body">
            <Grid container spacing={10}>
                <Grid item xs={12} md={4}>
                    <img
                        src={MainLogoWhite}
                        className="footer-logo"
                        alt="fireSpot"
                    />
                    <div className="footer-copyright-text">
                        Copyright © 2021 GoPowerEV
                    </div>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={2}>
                            <a href="#" className="iconLink">
                                Solutions
                            </a>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <a href="#" className="iconLink">
                                Products
                            </a>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <a href="#" className="iconLink">
                                Company
                            </a>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <a href="#" className="iconLink">
                                Resources
                            </a>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <a href="#" className="iconLink">
                                Support
                            </a>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <a href="#" className="iconLink">
                                Send us an email
                            </a>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        spacing={1}
                        xs={12}
                        md={4}
                        className="icon-grid"
                    >
                        <Grid item xs={3} md={3}>
                            <a href="#" className="iconLink">
                                <InstagramIcon fontSize={'large'} />
                            </a>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <a href="#" className="iconLink">
                                <FacebookIcon fontSize={'large'} />
                            </a>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <a href="#" className="iconLink">
                                <TwitterIcon fontSize={'large'} />
                            </a>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <a href="#" className="iconLink">
                                <YouTubeIcon fontSize={'large'} />
                            </a>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
export default Footer
