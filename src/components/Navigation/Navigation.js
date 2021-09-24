import React, { Fragment } from 'react'
import './Navigation.css'
import { Link } from "react-router-dom";
import { Typography, Grid } from '@mui/material';

const Navigation = ({isSignedIn, signOut}) => {
    return (
        <header>
            <Grid container>
                <Grid item xs={12} sm={8} md={9} xl={10}>
                    <Typography className="gradient" variant='h1' sx={{fontWeight:'500', fontSize: '3em'}}>Coloricker</Typography>
                </Grid>
                <Grid className="center" item xs={12} sm={4} md={3} xl={2}>
                    <nav className="navbar">
                        <ul className="nav__list">
                            {
                                (isSignedIn) 
                                ? 
                                <Fragment>
                                    <li className="navbar__item"><Link to='/'><p>Home</p></Link></li>
                                    <li className="navbar__item"><Link to='/palettes'><p>My Palettes</p></Link></li>
                                    <li className="navbar__item"><Link to='/signin' onClick={() => signOut()}><p>Sign Out</p></Link></li>
                                </Fragment>
                                : 
                                <Fragment>
                                    <li className="navbar__item"><Link to='/signin'><p >Sign In</p></Link></li>
                                    <li className="navbar__item"><Link to='/register'><p>Register</p></Link></li>
                                </Fragment>
                            }
                        </ul>
                    </nav>
                </Grid>
            </Grid>
        </header>
    )
}

export default Navigation
