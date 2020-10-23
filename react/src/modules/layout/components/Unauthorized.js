import React from 'react';
import { Box, Typography } from '@material-ui/core';
import IconError from '@material-ui/icons/ErrorOutline';
import { useStyles } from '../styles/StyleUnauthorized';

export default () => {
    let classes = useStyles();

    return (
        <div className={classes.box}>
            <Box display={'flex'}>
                <Box margin={'auto'}>
                    <IconError />
                </Box>
            </Box>
            <Box display={'flex'}>
                <Box margin={'auto'}>
                    <Typography className={classes.typography}>
                        You do not have permissions to access this page.
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}