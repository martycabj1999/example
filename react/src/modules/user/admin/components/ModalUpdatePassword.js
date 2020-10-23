import React, { useState } from "react"
import LockIcon from "@material-ui/icons/Lock"
import {
  Button,
  Dialog,
  IconButton,
  DialogContent,
  DialogContentText,
  Grid,
  Zoom,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import TextfieldPassword from '../../../layout/components/textfieldPassword/TextfieldPassword'
import Alert from '../../../layout/components/alert/Alert'
import { whiteSpaceError, shortLength } from "../../../../helps/regex"
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

const ModalUpdatePassword = (props) => {

  const classes = useStyles();

  const [open, setOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formState, setFormState] = useState(false)
  const [formPassword, setFormPassword] = useState({
    password: "",
    passwordError: { status: false, text: "" },
  })

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const closeForm = () => {
    setFormSubmitted(false);
    setOpen(false);
    setFormPassword({
      password: "",
      passwordError: { status: false, text: "" },
    })
  }

  const onChange = event => {
    formPassword['password'] = event.target.value;
    setFormPassword(formPassword);
    passwordverify(event.target.name);
  }

  const passwordverify = item => {
    let data = formPassword[item];
    clearHelperText();
    if (whiteSpaceError.test(data)) {
      setFormState(true);
      setHelperText("Password does not accept blank spaces");
    } else {
      if (shortLength.test(data)) {
        setFormState(true);
        setHelperText("The password is very short");
      } else {
        clearHelperText();
        setFormState(false);
        if (whiteSpaceError.test(data)) {
          setFormState(true);
          setHelperText("Password does not accept blank spaces");
        } else {
          clearHelperText();
          setFormState(false);
        }
      }
    }
  };

  const setHelperText = text => {
    setFormPassword({
      ...formPassword,
      passwordError: { status: true, text: text }
    })
  }

  const clearHelperText = () => {
    setFormPassword({
      ...formPassword,
      passwordError: { status: false, text: "" }
    })
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    let response = await userRepository.updatePasswordUser({
      id: props.dataUser.id,
      password: formPassword.password
    })

    setFormSubmitted(true);
    setFormState(true);

  }

  return (
    <React.Fragment>
      <IconButton edge={'start'} size={'medium'}
        style={{ color: '#3f51b5' }}
        onClick={handleClickOpen}>
        <LockIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClickOpen}
        TransitionComponent={Zoom}
      >
        <DialogContent
          style={{ overflow: 'hidden', maxWidth: 300, minWidth: 300 }}
        >
          <DialogContentText>
            {props.titleModal + props.dataUser.username}
          </DialogContentText>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2} style={{ marginBottom: 2 }}>
              {!formSubmitted
                ? <Grid item xs={12} sm={12}>
                  <TextfieldPassword
                    helperText={formPassword.passwordError.text}
                    error={formPassword.passwordError.status}
                    onChange={onChange}
                    placeholder={""}
                    variant={'filled'}
                    name={'password'}
                  />
                </Grid>
                : <Alert content={"The password was successfully modified"} type='success' />}
            </Grid>
            <Grid style={{ marginLeft: 'right' }}>
              {!formSubmitted ?
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={formState}
                  onClick={formSubmitted}
                  className={classes.submit}
                >
                  Save
                </Button> : null}
              <Button
                variant="outlined"
                color="primary"
                className={classes.submit}
                onClick={closeForm}
              >
                Exit
              </Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default ModalUpdatePassword;