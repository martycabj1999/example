import {makeStyles} from '@material-ui/core/styles';
import { blue, orange } from '@material-ui/core/colors';  

export const useStyles = makeStyles(theme => ({
    container:{
       height:'80vh',
    },
      card: {
        margin: theme.spacing(10, 0 , 2, 0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
      },
      avatar: {
        backgroundColor:orange[500],
        margin: theme.spacing(2)
      },
      cardActions:{
        witdh:'300',
        height:'100',
        backgroundColor: blue[200],
        borderRadius: 100,
      },
      cardContent:{
        alignItems: 'center',
        display: 'inline-block',
        marginTop: 20,
        marginBottom: 20, 
      },
      typography:{
        color: blue[500],
        textAlign: 'center',
        margin:'auto',
        lineHeight:5,
      },
      box:{
        padding: 0,
        height:"80vh",
        margin:'auto',
      },
      iconHome:{
        size: 40,
        marginTop: 10,
        marginLeft:3,
        fontSize: 50
      }
    }));
    
    