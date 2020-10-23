import {makeStyles} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
 
    root: {
      marginTop: theme.spacing(10),
      display:'flex',
      direction:'row',
      alignItems: 'center',
      justify:'center',
      marginBottom: theme.spacing(10),
    },
    form: {
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 8),
    },
    IconRecovery:{
      height: 40,
      width: 40,
    },
    typography:{
      margin: theme.spacing(2,6),
    },
    snackbar:{
      backgroundColor: green[200],
    }
  }));