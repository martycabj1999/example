import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  IconButton,
  Switch,
  FormControlLabel,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailIcon from "@material-ui/icons/MailOutline";
import NameIcon from "@material-ui/icons/AccountBoxOutlined";
import PassIcon from "@material-ui/icons/LockOutlined";
import VisibilityPassIconOn from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIconOff from '@material-ui/icons/VisibilityOffOutlined';
import { useStyles } from './StyleForm'
import Alert from '../../../layout/components/alert/Alert'
import { shortLength } from '../../../../helps/regex'
import { RepositoryFactory } from '../../../../repositories/RepositoryFactory'

const userRepository = RepositoryFactory.get('user')

const Form = (props) => {

  const classes = useStyles();

  const [formState, setFormState] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    role: null,
    state: true,
    passwordvisibility: false,
    submitted: false
  })
  const [errors, setErrors] = useState({
    name: { status: false, text: "" },
    username: { status: false, text: "" },
    email: { status: false, text: "" },
    phone: { status: false, text: "" },
    password: { status: false, text: "" },
    role: { status: false, text: " " },
  })
  const [registerError, setRegisterError] = useState({
    regError: false,
    regMsg: ""
  })
  const [roles, setRoles] = useState([])
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let response = await userRepository.getRoles()
    setRoles(response);
  };

  const showPassword = () => {
    setFormData({
      ...formData,
      passwordvisibility: !formData.passwordvisibility
    });
  }

  const closeForm = () => {
    props.submitUpdate();
    props.newUser(formData);
    window.location.href = "/panel-admin"
  }

  const closeFormWithoutSave = () => {
    props.submitUpdate();
  }

  const mouseDownPassword = event => {
    event.preventDefault();
  }


  const onChange = event => {

    formData[event.target.name] = event.target.value;
    setFormData(formData);

    switch (event.target.name) {
      case "email":
        emailVerify(event.target.name);
        break;
      case "name":
        nameVerify(event.target.name);
        break;
      case "password":
        passwordVerify(event.target.name);
        break;
      case "role":
        roleVerify(event.target.name);
        break;
      default:
        console.log("nandemonai");
    }
  };

  const emailVerify = item => {

    let data = formData[item];

    if (/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/g.test(data)) {
      clearHelperText(item);
      setFormState(false);
    } else {
      setHelperText(item, "The format is invalid");
      setFormState(true);
    }

  };

  const nameVerify = item => {
    let data = formData[item];

    if (/^[a-zA-Z\s]*$/.test(data)) {
      clearHelperText(item);
      setFormState(false);
    } else {
      setHelperText(item, "Only letters are allowed");
      setFormState(true);
    }

  };

  const passwordVerify = item => {
    let data = formData[item];
    clearHelperText();
    if (/\s/g.test(data)) {
      setFormState(true);
      setHelperText(item, "Password does not accept blank spaces");
    } else {
      if (shortLength.test(data)) {
        setFormState(true);
        setHelperText(item, "The password is very short");
      } else {
        clearHelperText(item);
        setFormState(false);
      }
    }
  };

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

  const roleVerify = () => {
    if (!formData.role) { //Si no seleccione ningun rol entonces activo el error
      setErrors({
        ...errors,
        role: { status: true }
      })
    } else {
      setErrors({
        ...errors,
        role: { status: false }
      })
    }
    return (!errors.role.status)
  }

  const onChecked = event => {
    setFormData({ ...formData, state: !formData.state });
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const verify = (errors.role);

    if (verify) {

      let response = await userRepository.addUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
        state: formData.state,
      })
      setFormState(true);
      setFormData({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
        state: formData.state,
        submitted: true
      })
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {registerError.regError && (
        <Alert type={'error'} content={registerError.regmsg} />
      )}
      {formData.submitted
        ? (<Alert content={"User created successfully"} type='success' />)
        : (<Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <TextField
              helperText={errors.name.text}
              error={errors.name.status}
              autoComplete="name"
              name="name"
              variant="filled"
              type="string"
              fullWidth
              required
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
          <Grid item xs={6} sm={6}>
            <TextField
              autoComplete="phone"
              name="phone"
              variant="filled"
              type="number"
              fullWidth
              required
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
          <Grid item xs={12} sm={6}>
            <TextField
              helperText={errors.email.text}
              error={errors.email.status}
              placeholder={formData.email}
              onChange={onChange}
              autoComplete="email"
              name="email"
              variant="filled"
              type="string"
              fullWidth
              required
              id="email"
              label={"Email"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              helperText={errors.password.text}
              error={errors.password.status}
              placeholder={formData.password}
              onChange={onChange}
              variant="filled"
              fullWidth
              required
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
                      {formData.passwordvisibility ? <VisibilityPassIconOn /> : <VisibilityOffOutlinedIconOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl error={errors.role.status} required autoComplete='off'>
              <InputLabel id="rol">Role</InputLabel>
              <Select
                labelId="rol"
                id="rol-req"
                name="role"
                helperText={errors.role.text}
                error={errors.role.status}
                variant="filled"
                placeholder={formData.role}
                value={formData.role || ''}
                onChange={onChange}
                style={{ width: 268.50 }}
              >
                {roles.map(({ name, id }, index) =>
                  <MenuItem value={name} key={index}>{name}</MenuItem>)}
              </Select>
              {errors.role.status ? <FormHelperText error={errors.role.status}>{errors.role.text}</FormHelperText> : null}
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControlLabel
              style={{ marginRight: 0 }}
              value={formData.state ? "Enabled" : "Disabled"}
              control={<Switch color="primary"
                checked={formData.state}
                onChange={onChecked}
                value={true}
              />}
              label={formData.state ? "Enabled" : "Disabled"}
              labelPlacement="bottom"
            />
          </Grid>
        </Grid>)
      }
      <Grid container spacing={2}>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" style={{ spacing: 5, visibility: formData.submitted ? 'hidden' : 'visible' }} className="campos">* The fields are mandatory</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {!formData.submitted ?
            <Button
              disabled={formState}
              type="submit"
              variant='contained'
              color="primary"
              className={classes.submit}
            >
              Save
            </Button>
            : null}
          <Button
            style={{ marginLeft: 5 }}
            variant="outlined"
            color="primary"
            className={classes.submit}
            onClick={formData.submitted ? closeForm : closeFormWithoutSave}
          >
            Exit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Form;