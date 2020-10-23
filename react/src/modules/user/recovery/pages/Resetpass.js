import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Card,
  CardContent, Box, IconButton
} from '@material-ui/core';
import IconRecovery from '@material-ui/icons/Https';
import InputAdornment from "@material-ui/core/InputAdornment";
import MailIcon from "@material-ui/icons/MailOutline";
import { useStyles } from './StyleResetpass';
import Snackbar from '@material-ui/core/Snackbar';
import IconClose from '@material-ui/icons/Close';
import { RepositoryFactory } from '../../../../repositories/RepositoryFactory'

const authRepository = RepositoryFactory.get('auth')

export default () => {
  const classes = useStyles();
  const [messageResponse, setMessageResponse] = useState('')
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: ''
  })
  const openTrue = () => {
    setOpen(true);
  }
  const openFalse = () => {
    setOpen(false);
  }

  const [errors, setErrors] = useState({
    email: { status: false, text: "" }
  })

  const setHelperText = (item, text) => {
    setErrors({
      ...errors,
      [item]: { status: true, text: text }
    })
  };

  const clearHelperText = item => {
    setErrors({
      ...errors,
      [item]: { status: false, text: "" }
    })
  };

  const emailverify = (item) => {

    let data = formData[item];

    if (/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/g.test(data)) {
      clearHelperText(item);
    } else {
      setHelperText(item, "The format is invalid");
    }

  };

  const onChangeEmail = (e) => {
    formData[e.target.name] = e.target.value
    setFormData(formData)
    emailverify(e.target.name)
  }

  const sendEmailSubmit = async (e) => {
    e.preventDefault()
    if (!errors.email.status) {

      let response = await authRepository.sendEmail({ email: formData.email })

      setMessageResponse("Password has been sent to email" + formData.email)

      openTrue()
      formData.email = ''
      setFormData(formData)
    }

  }

  return (
    <Container maxWidth="xs">
      <Grid className={classes.root}>
        <Card>
          <CardContent>
            <Grid item xs={12}>
              <Box display={'flex'}>
                <Box margin={'auto'}>
                  <IconRecovery />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" align="center" className={classes.typography}>
                Recover password
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form className={classes.form} onSubmit={sendEmailSubmit}>
                <TextField
                  helperText={errors.email.text}
                  error={errors.email.status}
                  value={formData.email}
                  variant="filled"
                  margin="normal"
                  type="string"
                  required
                  fullWidth
                  id="email"
                  onChange={onChangeEmail}
                  label={"Email"}
                  name="email"
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon />
                      </InputAdornment>
                    )
                  }}
                  autoFocus
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Send request
                </Button>
                <Snackbar
                  className={classes.snackbar}
                  open={open}
                  message={messageResponse}
                  action={[
                    <IconButton onClick={openFalse}>
                      <IconClose />
                    </IconButton>
                  ]}
                >
                </Snackbar>
              </form>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}