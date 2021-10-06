import React from 'react'
import './Footer.css'
import Grid from '@material-ui/core/Grid'
import YouTubeIcon from '@material-ui/icons/YouTube'
import MainLogoWhite from './../../assets/images/mainLogoWhite.png'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'

const Footer = () => {
    return (
        <div className="footer-body">
            <Grid container spacing={10}>
                <Grid item xs={4}>
                    <img
                        src={MainLogoWhite}
                        className="footer-logo"
                        alt="fireSpot"
                    />
                    <div className="footer-copyright-text">
                        Copyright © 2021 GoPowerEV
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <ul className="horizontal-list">
                        <li>
                            <a href="#">Charing Solutions</a>
                        </li>
                        <li>
                            <a href="#">Products</a>
                        </li>
                        <li>
                            <a href="#">Company</a>
                        </li>
                        <li>
                            <a href="#">Resources</a>
                        </li>
                        <li>
                            <a href="#">Support</a>
                        </li>
                        <li>
                            <a href="#">Send us an email</a>
                        </li>
                    </ul>
                    <ul className="horizontal-list-logos">
                        <li>
                            <a href="#">
                                <InstagramIcon fontSize={'large'} />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <FacebookIcon fontSize={'large'} />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <TwitterIcon fontSize={'large'} />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <YouTubeIcon fontSize={'large'} />
                            </a>
                        </li>
                    </ul>
                </Grid>
            </Grid>
        </div>
    )
}
export default Footer
