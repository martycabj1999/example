import React from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import { useStyles } from './footerStyle'

const Copyright = () => {
    return (
        <Typography variant="body2">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Project
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {

    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Typography
                    variant="body1"
                >
                    Hi people! i'm footer :v
                </Typography>
                <Copyright />
            </Container>
        </footer>
    );
}
