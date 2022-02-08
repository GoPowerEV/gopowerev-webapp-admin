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
            <hr />
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="stretch"
            >
                <Grid item xs={12} md={3}>
                    <img
                        src={MainLogoWhite}
                        className="footer-logo"
                        alt="fireSpot"
                    />
                    <Grid
                        container
                        spacing={1}
                        xs={12}
                        md={12}
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
                    <div className="footer-copyright-text">
                        Copyright 2010 - 2021
                        <span className="footer-small-links">
                            <a href="#">Privacy Policy</a> |{' '}
                            <a href="#">Website Terms</a>
                        </span>
                    </div>
                </Grid>
                <Grid item xs={12} md={1}>
                    <div className="footer-header">Company</div>
                    <div className="footer-right-side-link">
                        <a href="#" className="iconLink">
                            About Us
                        </a>
                    </div>
                    <div className="footer-right-side-link">
                        <a href="#" className="iconLink">
                            Industry News
                        </a>
                    </div>
                    <div>
                        <a href="#" className="iconLink">
                            Contact Us
                        </a>
                    </div>
                </Grid>
                {/* <Grid item xs={12} md={8}>
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
                </Grid> */}
            </Grid>
        </div>
    )
}
export default Footer
