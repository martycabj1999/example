import React, { Fragment, useState } from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    Grid,
    Input
} from "@material-ui/core";
import Alert from '../../../layout/components/alert/Alert'
import { useDispatch } from 'react-redux';
import { setAvatarAction } from '../../auth/store/SetAvatarAction'
import { RepositoryFactory } from '../../../../repositories/RepositoryFactory'

const userRepository = RepositoryFactory.get('user')

const ModalChangeAvatar = (props) => {


    const [msgValidation, setMsgValidation] = useState('')
    const [avatarSubmitted, setAvatarSubmitted] = useState(false)
    const [image, setImage] = useState('');

    const dispatch = useDispatch()

    const resolutionError = "The maximum valid resolution must be: 800 * 800."
    const formatError = "The image to be attached must be in a valid format (JPG or PNG)."
    const sizeError = "The weight of the image cannot exceed 2 MB."
    const successImage = "The image was loaded successfully."
    const emptyErrorFile = "You must select a file."

    const onChangeAvatar = (e) => {
        const fileImage = e.target.files[0];
        props.setBooleanError(false);
        setImage(fileImage);
        resolutionValidator(fileImage);
        validationBrowserImage();
        validationExtensionImage(fileImage);
        validationSizeImage(fileImage);
    }

    const resolutionValidator = (fileImage) => {
        if (fileImage) {
            var height = 0;
            var width = 0;
            var _URL = window.URL || window.webkitURL;
            var img = new Image()
            img.onload = function () {
                height = img.height;
                width = img.width;
                if (width > 800 && height > 800) {
                    setMsgValidation(resolutionError);
                    props.setBooleanError(true);
                }
            }
            img.src = _URL.createObjectURL(fileImage);
        } else {
            props.setBooleanError(false);
        }
    }

    const validationBrowserImage = () => {
        if (!window.FileReader) {
            setMsgValidation("The browser does not support reading images.");
            props.setBooleanError(true)
            return;
        }
    }

    const validationExtensionImage = (fileImage) => {
        if (fileImage) {
            if (!(/\.(jpg|png)$/i).test(fileImage.name)) {
                setMsgValidation(formatError);
                props.setBooleanError(true)
            }
        } else {
            props.setBooleanError(false)
        }

    }

    const validationSizeImage = (fileImage) => {
        if (fileImage) {
            if (fileImage.size > 2000000) {
                setMsgValidation(sizeError)
                props.setBooleanError(true)
            }
        }
    }

    const boleeanValidationSubmit = () => {
        props.setBooleanSuccess(true)
    }

    const onSubmitAvatar = async (event) => {
        event.preventDefault()
        if (!image) {
            props.setBooleanError(true)
            setMsgValidation(emptyErrorFile)
        } else {
            if (!props.booleanError) {
                const form = new FormData()
                form.append('avatar', image)
                let response = await userRepository.setAvatar(form)
                localStorage.setItem('avatar-test', response.avatar)
                dispatch(setAvatarAction(response.avatar))
                setMsgValidation(successImage)
                setAvatarSubmitted(true)
                boleeanValidationSubmit(true)
            } else {
                setMsgValidation(resolutionError)
            }
        }
        setImage('')
    }

    const buttonCloseModal = () => {
        setImage('')
        props.openCloseModalAvatar()
    }

    return (
        <Fragment>
            <Dialog
                open={props.showModalAvatar}
                onClose={props.openCloseModalAvatar}
            >
                <DialogContent style={{ overflow: 'hidden' }} >
                    <DialogContentText>
                        {props.titleModal}
                    </DialogContentText>
                    <form onSubmit={onSubmitAvatar}>
                        {props.booleanError && (
                            <Alert type={'error'} content={msgValidation} />
                        )}
                        {props.booleanSuccess ? (
                            <Alert type={'success'} content={msgValidation} />) :
                            (<Grid container spacing={2} style={{ marginBottom: 2, padding: 10 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Input type="file" name="avatar" onChange={e => onChangeAvatar(e)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            )}
                        <br />
                        <Grid style={{ marginLeft: 'right' }}>
                            {!avatarSubmitted ?
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={props.booleanError || props.booleanSuccess ? true : false}
                                    style={{ marginRight: 5 }}
                                >
                                    Upload
                                </Button> : null}
                            <Button
                                variant="outlined"
                                onClick={buttonCloseModal}
                                color="primary"
                            >
                                Exit
                            </Button>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}

export default ModalChangeAvatar;