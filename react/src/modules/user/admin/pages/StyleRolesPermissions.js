import {makeStyles} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
    iconActive: {
        color: green[500],
    },
    iconInactive:{
        color: red[500],
    },
    typography:{
        margin: theme.spacing(2,2,2,0),
    },
    box:{
        padding: theme.spacing(0,2,2,0),
    },

}));