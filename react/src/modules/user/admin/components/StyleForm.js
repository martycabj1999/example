import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(5),
        padding:(0,0,0,0),
      },
      submit: {
        margin: theme.spacing(3, 3, 2,3),
      },
      Textfield:{
        padding: theme.spacing(4,4,4,4),
      },
      Button: {
        padding: theme.spacing(2,2,2,2),   
      }
}));