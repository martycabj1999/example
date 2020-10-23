import React, { useState, useEffect } from "react"
import {
  Grid, TextField, Button, Switch, FormControlLabel,
  Select, MenuItem, FormControl, InputLabel, Typography
} from "@material-ui/core"
import InputAdornment from "@material-ui/core/InputAdornment"
import MailIcon from "@material-ui/icons/MailOutline"
import NameIcon from "@material-ui/icons/AccountBoxOutlined"
import { useStyles } from './StyleForm'
import Alert from '../../../layout/components/alert/Alert'
import { whiteSpaceError } from '../../../../helps/regex'
import { RepositoryFactory } from '../../../../repositories/RepositoryFactory'

const userRepository = RepositoryFactory.get('user')

const FormUpdateUser = (props) => {
  const classes = useStyles();

  const [roles, setRoles] = useState([]);
  const [formState, setFormState] = useState(false)
  const [formData, setFormData] = useState({
    id: props.dataUser.id,
    name: props.dataUser.name,
    email: props.dataUser.email,
    phone: props.dataUser.phone,
    role: { name: props.dataUser.role?.name },
    state: props.dataUser.state,
    submitted: false
  })
  const [errors, setErrors] = useState({
    name: { status: false, text: "" },
    email: { status: false, text: "" },
    phone: { status: false, text: "" },
    address: { status: false, text: "" },
    role: { status: false, text: " " },
  })
  const [registerError, setRegisterError] = useState({
    regError: false,
    regMsg: ""
  })

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let response = await userRepository.getRoles()
    setRoles(response);
  };

  const closeForm = () => {
    props.submitUpdate();
    props.update(formData.id, formData)
    window.location.href = "/panel-admin"
  }

  const closeFormWithoutSave = () => {
    props.submitUpdate();
  }

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
      setFormState(false)
    } else {
      setHelperText(item, "Only letters are allowed");
      setFormState(true)
    }
  }

  const phoneVerify = item => {
    let data = formData[item];

    if (/^([0-9]){1,3}$/.test(data)) {
      clearHelperText(item);
      setFormState(false)
    } else {
      setHelperText(item, "Only letters are allowed");
      setFormState(true)
    }
  }

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

  const onChecked = event => {
    setFormData({ ...formData, state: !formData.state });
  }

  const onChangeSelectRole = event => {
    formData['role'].name = event.target.value
    setFormData(formData)
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
      case "phone":
        phoneVerify(event.target.name);
        break;
      default:
        console.log("nandemonai");
    }
  };


  const onSubmit = async (event) => {
    event.preventDefault();

    let response = await userRepository.updateUser({
      id: formData.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role.name,
      state: formData.state,
    })

    setFormState(true);
    setFormData({
      id: formData.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role.name,
      state: formData.state,
      submitted: true
    })

  };

  return (
    <form onSubmit={onSubmit}>
      {registerError.regError && (
        <Alert type={'error'} content={registerError.regMsg} />)}
      {formData.submitted ?
        (<Alert content={"The user was successfully modified"} type='success' />) :
        (<Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <TextField
              helperText={errors.name.text}
              error={errors.name.status}
              autoComplete="name"
              name="name"
              variant="filled"
              required
              type="string"
              fullWidth
              id="name"
              label={"Name"}
              placeholder={formData.name}
              value={formData.name}
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
              required
              type="number"
              fullWidth
              id="phone"
              label={"Phone"}
              placeholder={formData.phone}
              value={formData.phone}
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
              value={formData.email}
              autoComplete="email"
              name="email"
              variant="filled"
              type="string"
              required
              fullWidth
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
            <FormControl error={errors.role.status} required autoComplete='off'>
              <InputLabel id="rol">Role</InputLabel>
              <Select
                labelId="rol"
                id="rol-req"
                name='role'
                variant="filled"
                helperText={errors.role.text}
                error={errors.role.status}
                placeholder={formData.role.name}
                defaultValue={formData.role.name}
                onChange={onChangeSelectRole}
                style={{ width: 268.50 }}
              >
                {roles.map(({ name }, index) =>
                  <MenuItem value={name} key={index}>{name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={2}>
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
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" style={{ visibility: formData.submitted ? 'hidden' : 'visible' }}>* The fields are mandatory.</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {!formData.submitted ?
            <Button
              disabled={formState}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save
            </Button> : null}
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

export default FormUpdateUser;