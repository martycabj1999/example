import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
 
    paper: {
      margin: theme.spacing(0, 0 , 0, 0),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: 410,
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#e0a931',
    },
    Typography:{
      textDecoration: 'none',
    }
  }));