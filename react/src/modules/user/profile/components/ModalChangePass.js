import React, { useState } from "react"
import {
    Button,
    Dialog,
    DialogContent,
    Grid,
    Zoom,
    Typography,
} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import TextfieldPassword from '../../../layout/components/textfieldPassword/TextfieldPassword'
import Alert from '../../../layout/components/alert/Alert'
import { whiteSpaceError, shortLength } from '../../../../helps/regex';
import { RepositoryFactory } from '../../../../repositories/RepositoryFactory'

const userRepository = RepositoryFactory.get('user')

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(4),
        padding: (0, 0, 0, 0),
    },
    submit: {
        margin: theme.spacing(1, 1, 1, 1),
    },
    Textfield: {
        padding: theme.spacing(4, 4, 4, 4),
    },
    Button: {
        padding: theme.spacing(2, 2, 2, 2),
    }
}));

const ModalChangePass = (props) => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [msgAlert, setMsgAlert] = useState("The password was successfully modified");
    const [typeAlert, setTypeAlert] = useState("success");
    const [formPassword, setFormPassword] = useState({
        currentPassword: "",
        newPassword: ""
    });
    const [errorsCurrent, setErrorCurrent] = useState({
        status: false, text: ""

    });
    const [errorsNewPassword, setErrorNewPassword] = useState(
        {
            status: false, text: ""
        });

    const handleClickOpen = () => {
        setOpen(!open)
    };

    const closeForm = () => {
        clearHelperText('currentPassword');
        clearHelperText('newPassword');
        setFormSubmitted(false);
        setOpen(false);
        setFormPassword({
            currentPassword: "",
            newPassword: ""
        });

    }

    const onChange = event => {
        formPassword[event.target.name] = event.target.value
        setFormPassword(formPassword)
        passwordverify(event.target.name)
    }

    const passwordverify = item => {
        let data = formPassword[item];

        clearHelperText(item);
        if (whiteSpaceError.test(data)) {

            setHelperText(item, "Password does not accept blank spaces");
        } else {
            if (shortLength.test(data)) {

                setHelperText(item, "The password is very short");
            }
            else {
                clearHelperText(item);
                if (whiteSpaceError.test(data)) {

                    setHelperText(item, "Password does not accept blank spaces");
                } else {
                    clearHelperText(item);

                }

            }
        }
    };


    const setHelperText = (item, text) => {
        let errors = {
            status: true,
            text: text
        }
        if (item === 'currentPassword') {
            setErrorCurrent(errors)
        } else if (item === 'newPassword') {
            setErrorNewPassword(errors)
        }
        ;
    }

    const clearHelperText = (item) => {
        let errors = {
            status: false,
            text: ""
        }
        if (item === 'currentPassword') {
            setErrorCurrent(errors)
        } else if (item === 'newPassword') {
            setErrorNewPassword(errors)
        }
        ;
    };

    const onSubmit = async (event) => {

        event.preventDefault();

        if (formPassword.currentPassword === formPassword.newPassword) {
            const msg = "Both passwords are the same"
            const type = "error"
            setFormPassword({
                currentPassword: '',
                newPassword: ''
            });
            setFormSubmitted(true)
            setMsgAlert(msg)
            return setTypeAlert(type)
        }
        //El token se lo envio por el header
        let response = await userRepository.updatePassword({
            currentPassword: formPassword['currentPassword'],
            newPassword: formPassword['newPassword'],
        })
        setMsgAlert("The password was successfully modified")
        setTypeAlert("success")
        setFormSubmitted(true)
    }

    return (
        <React.Fragment>
            <Button
                edge={'start'}
                size={'medium'}
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
                Edit password
            </Button>
            <Dialog
                open={open}
                onClose={closeForm}
                TransitionComponent={Zoom}
            >
                <DialogContent
                    style={{ overflow: 'hidden' }}
                >
                    <form onSubmit={onSubmit}>
                        <Grid container>
                            {!formSubmitted
                                ? <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography>Current password</Typography>
                                        <TextfieldPassword
                                            id={'currentPassword'}
                                            placeholder={''}
                                            name={'currentPassword'}
                                            helperText={errorsCurrent.text}
                                            error={errorsCurrent.status}
                                            onChange={onChange}
                                            variant={'filled'} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>New password</Typography>
                                        <TextfieldPassword
                                            id={'newPassword'}
                                            placeholder={''}
                                            name={'newPassword'}
                                            helperText={errorsNewPassword.text}
                                            error={errorsNewPassword.status}
                                            onChange={onChange}
                                            variant={'filled'}
                                        /></Grid>
                                </Grid>
                                : <Alert content={msgAlert} type={typeAlert} />}
                        </Grid>
                        <Grid style={{ marginLeft: 'right' }}>
                            {!formSubmitted ?
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={errorsNewPassword.status || errorsCurrent.status ? true : false}
                                    className={classes.submit}
                                    onClick={() => { return (Boolean(formSubmitted)) }}
                                >
                                    Save
                                </Button> : null}
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.submit}
                                onClick={closeForm}>
                                Exit
                            </Button>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

export default ModalChangePass;