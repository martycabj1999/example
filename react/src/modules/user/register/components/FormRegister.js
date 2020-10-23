import React, { useState } from "react"
import { Grid, TextField, Button, Card, IconButton } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"
import InputAdornment from "@material-ui/core/InputAdornment"
import MailIcon from "@material-ui/icons/MailOutline"
import EmailIcon from "@material-ui/icons/EmailOutlined"
import UserIcon from "@material-ui/icons/AccountBox"
import NameIcon from "@material-ui/icons/AccountBoxOutlined"
import PassIcon from "@material-ui/icons/LockOutlined"
import HouseIcon from "@material-ui/icons/House"
import VisibilityPassIconOn from "@material-ui/icons/VisibilityOutlined"
import VisibilityOffOutlinedIconOff from '@material-ui/icons/VisibilityOffOutlined'
import Alert from '../../../layout/components/alert/Alert'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { whiteSpaceError, shortLength } from '../../../../helps/regex'
import { Typography } from '@material-ui/core'
import { RepositoryFactory } from '../../../../repositories/RepositoryFactory'

const authRepository = RepositoryFactory.get('auth')

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
    padding: (0, 0, 0, 0)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const FormRegister = (props) => {

  const classes = useStyles();

  const [address, setAddress] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    emailverify: '',
    password: '',
    passwordvisibility: false,
    submitted: false
  });

  //States de errores de los input
  const [errorName, setErrorName] = useState(false)
  const [errorNameText, setErrorNameText] = useState("")

  const [errorEmail, setErrorEmail] = useState(false)
  const [errorEmailText, setErrorEmailText] = useState("")

  const [errorEmailVerify, setErrorEmailVerify] = useState(false)
  const [errorEmailVerifyText, setErrorEmailVerifyText] = useState("")

  const [errorPassword, setErrorPassword] = useState(false)
  const [errorPasswordText, setErrorPasswordText] = useState("")

  const [registerError, setRegisterError] = useState({
    regError: false,
    regMsg: ""
  });

  const showPassword = () => {
    setFormData({ passwordvisibility: !formData.passwordvisibility });
  }

  const mouseDownPassword = event => {
    event.preventDefault();
  }

  const emailverify = item => {
    let data = formData[item];
    if (/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/g.test(data)) {
      clearHelperText(item);
    } else {
      setHelperText(item, "The format is invalid");
    }
  };

  const nameVerify = item => {
    let data = formData[item];
    if (/^[a-zA-Z\s]*$/.test(data)) {
      clearHelperText(item);
    } else {
      setHelperText(item, "Only letters are allowed");
    }
  };

  const passwordverify = item => {
    let data = formData[item];
    clearHelperText(item);
    if (whiteSpaceError.test(data)) {
      setHelperText(item, "Password does not accept blank spaces")
    }
    else {
      if (shortLength.test(data)) {
        setHelperText(item, "The password is very short");
      } else {
        clearHelperText(item);
        if (whiteSpaceError.test(data)) {
          setHelperText(item, "Password does not accept blank spaces")
        } else {
          clearHelperText(item);
        }
      }
    }
  };

  const setHelperText = (item, text) => {
    switch (item) {
      case "email":
        setErrorEmail(true)
        setErrorEmailText(text)
        break;
      case "emailverify":
        setErrorEmailVerify(true)
        setErrorEmailVerifyText(text)
        break;
      case "name":
        setErrorName(true)
        setErrorNameText(text)
        break;
      case "password":
        setErrorPassword(true)
        setErrorPasswordText(text)
        break;
      default:
        console.log("nandemonai");
    }
  };

  const clearHelperText = item => {
    switch (item) {
      case "email":
        setErrorEmail(false)
        setErrorEmailText("")
        break;
      case "emailverify":
        setErrorEmailVerify(false)
        setErrorEmailVerifyText("")
        break;
      case "name":
        setErrorName(false)
        setErrorNameText("")
        break;
      case "password":
        setErrorPassword(false)
        setErrorPasswordText("")
        break;
      default:
        console.log("nandemonai");
    }
  };

  const inputRequired = () => {
    //verifica que los campos a enviar no sean vacios
    let data = Object.values(formData);
    return (data ? true : false)
  };

  const valueEqualsVerify = () => {
    if (formData["email"] === formData["emailverify"]) {
      clearHelperText("email");
      clearHelperText("emailverify");
      return true
    } else {
      setHelperText("email", "Emails don't match");
      setHelperText("emailverify", "");
      return false
    }
  }

  const handleSelect = async (value) => {

    const results = await geocodeByAddress(value);
    const coords = await getLatLng(results[0]);
    setFormData({
      ...formData,
      address: value,
      latitude: coords.lat,
      longitude: coords.lng
    });

  }

  const onChange = event => {
    formData[event.target.name] = event.target.value;
    setFormData(formData);
    switch (event.target.name) {
      case "email":
        emailverify(event.target.name);
        break;
      case "emailverify":
        emailverify(event.target.name);
        valueEqualsVerify()
        break;
      case "name":
        nameVerify(event.target.name);
        break;
      case "password":
        passwordverify(event.target.name);
        break;
      default:
        console.log("nandemonai");
    }
  };

  const onSubmit = async (event) => {
    inputRequired();
    event.preventDefault();
    if (valueEqualsVerify()) {

      let response = await authRepository.register({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password
      })

      setFormData({ submitted: true });
      props.submitUpdate();

    }
  }

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      {registerError.regError && (
        <Alert content={registerError.regMsg} type={'error'} />
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            helperText={errorNameText}
            error={errorName}
            autoComplete="name"
            name="name"
            variant="filled"
            required
            type="string"
            fullWidth
            id="name"
            label={"Name"}
            placeholder={formData.name}
            onChange={onChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NameIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            autoComplete="phone"
            name="phone"
            variant="filled"
            required
            type="number"
            fullWidth
            id="phone"
            label={"Phone"}
            placeholder={formData.phone}
            onChange={onChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NameIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            helperText={errorPasswordText}
            error={errorPassword}
            placeholder={formData.password}
            onChange={onChange}
            variant="filled"
            required
            fullWidth
            name="password"
            label={"Password"}
            type={formData.passwordvisibility ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PassIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={showPassword}
                    onMouseDown={mouseDownPassword}>
                    {formData.passwordvisibility ?
                      <VisibilityPassIconOn /> : <VisibilityOffOutlinedIconOff />}
                  </IconButton>
                </InputAdornment>

              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            helperText={errorEmailText}
            error={errorEmail}
            placeholder={formData.email}
            onChange={onChange}
            variant="filled"
            required
            fullWidth
            type="email"
            id="email"
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
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            helperText={errorEmailVerifyText}
            error={errorEmailVerify}
            placeholder={formData.emailverify}
            onChange={onChange}
            variant="filled"
            required
            fullWidth
            type="email"
            id="email-repeat"
            label={"Repeat Email"}
            name="emailverify"
            autoComplete="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
      {formData.submitted ? null : (
        <React.Fragment>
          <br />
          <Typography component="p" variant="subtitle1">* The fields are mandatory </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            value="submit"
            color="primary"
            className={classes.submit}
          >
            Create Account
          </Button>
          <Grid container justify="left">
            <Grid item>
              <Link to="/auth" style={{ textDecoration: "none" }}>
                You have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </form>
  );
}

export default FormRegister;