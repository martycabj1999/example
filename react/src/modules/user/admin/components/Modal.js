import React, { useState } from "react"
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Zoom,
    IconButton
} from '@material-ui/core';
import FormUpdateUser from './FormUpdateUser';
import Form from './Form';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { RepositoryFactory } from '../../../../repositories/RepositoryFactory'

const userRepository = RepositoryFactory.get('user')

const Modal = (props) => {

    const [open, setOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [dataUser, setDataUser] = useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setFormSubmitted(false)
        setOpen(true)
    };


    const updateSubmitted = async (event) => {
        setOpen(false)
        let response = await userRepository.getUsers()
        setDataUser(response)
    };

    return (<React.Fragment>
        <IconButton edge={'start'} size={'medium'}
            style={{ color: '#3f51b5' }}
            onClick={handleClickOpen}>
            {props.type === 'addUser' ? (<PersonAddIcon />) : (<EditIcon />)}
        </IconButton>
        {open &&
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Zoom}
            >
                <DialogContent>
                    <DialogContentText>
                        {props.titleModal}
                    </DialogContentText>

                    {props.type === 'addUser' ?
                        (<Form
                            newUser={props.newUser}
                            submitUpdate={updateSubmitted} />) :
                        <FormUpdateUser
                            update={props.newUser}
                            dataUser={props.dataUser}
                            submitUpdate={updateSubmitted}
                        />}
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>}
    </React.Fragment>
    );
}

export default Modal