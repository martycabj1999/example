import React, { useState } from 'react'
import {
    TextField,
    Button,
    Grid,
    InputAdornment
} from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { RepositoryFactory } from '../../../../repositories/RepositoryFactory'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode'

//Action de redux 
import { setAuthAction } from '../store/AuthAction';
import { setAvatarAction } from '../store/SetAvatarAction';
import UserIcon from "@material-ui/icons/AccountBox"
import PassIcon from "@material-ui/icons/LockOutlined"
import Alert from '../../../layout/components/alert/Alert'

const authRepository = RepositoryFactory.get('auth')

const AuthForm = (props) => {

    //States del componente
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const [authError, setAuthError] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [textError, setTextError] = useState('');
    const [disabledButton, setDisabledButton] = useState(false);

    //utilizar useDispatch y te crea una funcion
    const dispatch = useDispatch();

    const onChange = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleClick = event => {
        setDisabledButton(true)

        setTimeout(() => {
            setDisabledButton(false)
        }, 1500);
    }


    const onSubmit = async (event) => {
        handleClick()
        event.preventDefault();

        if (!form.email || !form.password) {
            //validar
        }

        let response = await authRepository.auth(form);
        //DECODE JWT
        const tokenDecoded = jwtDecode(response)

        localStorage.setItem('token-test', response)
        dispatch(setAuthAction(tokenDecoded))
        if (!tokenDecoded.avatar) {
            localStorage.setItem('avatar-test', "")
            dispatch(setAvatarAction(""))
        } else {
            localStorage.setItem('avatar-test', tokenDecoded.avatar)
            dispatch(setAvatarAction(tokenDecoded.avatar))
        }

        setRedirect(true);
        setAuthError(false);
    };


    const renderRedirect = () => {
        if (redirect) {
            return <Redirect to='/home' />
        }
    }

    return (

        <div>
            {renderRedirect()}
            <form onSubmit={onSubmit}>
                {authError &&
                    <Alert content={textError} type={'error'}></Alert>
                }
                <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={"Email"}
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    autoComplete="email"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <UserIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label={"Password"}
                    type="password"
                    onChange={onChange}
                    value={form.password}
                    id="password"
                    autoComplete="current-password"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PassIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    type="submit"
                    value="submit"
                    disabled={disabledButton}
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Log In
                </Button>

                <Grid container>
                    <Grid item xs>
                        <Link to="/reset-pass" style={{ textDecoration: 'none' }}>
                            Restore password
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            Register
                        </Link>
                    </Grid>
                </Grid>
            </form>

        </div>
    );
}

export default AuthForm;