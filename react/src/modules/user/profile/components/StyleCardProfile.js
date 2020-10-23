import {makeStyles} from '@material-ui/core/styles';
import { blue, orange } from '@material-ui/core/colors'; 

export const useStyles = makeStyles(theme => ({
    container:{
       height:'80vh',
    },
      card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
      },
      avatar: {
        width:160,
        height: 150,
        backgroundColor:orange[300],
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
        backgroundColor:'#dbd1d0',
      },
      typography:{
        color: 'black',
        textAlign: 'center',
        margin:'auto',
        lineHeight:2,
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
      },
      paper:{
        marginTop: 50,
      }
    }));
    
