import React, {useState} from 'react';
import SnackBar from '@material-ui/core/Snackbar';

export default Snackbar = () =>{
    const [snackOpen,setSnackOpen] = useState(false);

    const snackOpenTrue = () =>{
        setSnackOpen(true);
    }
    const snackOpenFalse = () =>{
        setSnackOpen(false);
    }

    return(<div>
        <SnackBar></SnackBar>
    </div>

    );
}