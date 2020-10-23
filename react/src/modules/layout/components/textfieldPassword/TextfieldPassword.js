import React, { useState } from 'react'
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import PassIcon from "@material-ui/icons/LockOutlined"
import VisibilityPassIconOn from "@material-ui/icons/VisibilityOutlined"
import VisibilityOffOutlinedIconOff from "@material-ui/icons/VisibilityOffOutlined"
import PropTypes from "prop-types"

export default function TextfieldPassword(props) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            helperText={props.helperText}
            error={props.error}
            placeholder={props.placeholder}
            onChange={props.onChange}
            variant={props.variant}
            required
            fullWidth
            name={props.name || "password"}
            label={"Password"}
            type={showPassword ? "text" : "password"}
            id={props.id || "password"}
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
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(event) => event.preventDefault()}>
                            {showPassword ?
                                <VisibilityPassIconOn /> : <VisibilityOffOutlinedIconOff />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}
TextfieldPassword.propTypes = {
    helperText: PropTypes.string.isRequired,
    id: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};