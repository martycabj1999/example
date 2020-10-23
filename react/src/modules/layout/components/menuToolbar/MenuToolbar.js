import React from 'react'
import { useSelector } from 'react-redux'
import {
    Grid,
    AppBar,
    Toolbar,
    Typography,
    Button
} from '@material-ui/core'
import { styles } from '../../styles/StyleMenuToolbar'
import { Link } from 'react-router-dom'
import ButtonProfile from '../ButtonProfile'
import Sliderbar from '../Sliderbar'

function MenuToolbar() {
    const user = useSelector(state => state.security.user);
    const classes = styles();

    return (
        <Grid container className={classes.root}>
            <AppBar position="static">
                <Toolbar style={{}}>
                    <Sliderbar />
                    {(user.id) ? (<ButtonProfile setUser={user} />) : (
                        <Link to="/auth" className={classes.link}>
                            <Button variant='outlined'>
                                <Typography className={classes.Typography}>Log In</Typography>
                            </Button>
                        </Link>)}
                </Toolbar>
            </AppBar>
        </Grid>
    );
}


export default MenuToolbar;
