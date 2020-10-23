import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import {
  Typography,
  CardContent,
  Divider,
  Box,
  Avatar
} from "@material-ui/core";
import { useStyles } from "./StyleCardProfile";
import ModalChangePass from "./ModalChangePass";
import ModalChangeAvatar from "./ModalChangeAvatar";
import { useSelector } from 'react-redux';
import CssBaseline from "@material-ui/core/CssBaseline";
import { CardAvatar } from './CardAvatar'
import { CardGlobal } from './CardGlobal'
import { getUserHelp } from '../../../../helps/getUser';

export default function Profile(props) {
  const classes = useStyles(props);
  const user = getUserHelp();
  const [booleanSuccess, setBooleanSuccess] = useState(false)
  const [booleanError, setBooleanError] = useState(false)
  const [showModalAvatar, setShowModalAvatar] = useState(false)

  const avatar = useSelector(state => state.avatar.avatar)

  const openCloseModalAvatar = event => {
    setShowModalAvatar(!showModalAvatar);
    setBooleanSuccess(false)
    setBooleanError(false)
  }

  return (
    <Container maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <br />
      <br />
      <CardGlobal profile>
        <CardAvatar profile>
          <Avatar src={avatar} className={classes.avatar} onClick={openCloseModalAvatar}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
        </CardAvatar>
        <Box display={"flex"}>
          <Box margin={"auto"}>
            <Typography variant="h5" gutterBottom>Hello {user.name}! </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent>

          <Typography variant="overline" display="block" gutterBottom>
            Name: {user.name}
          </Typography>
          <Typography variant="overline" display="block" gutterBottom>
            Email: {user.email}
          </Typography>

          <Box display={"flex"}>
            <Box margin={"auto"}>
              <ModalChangeAvatar titleModal={"Change profile photo"} booleanError={booleanError} setBooleanError={setBooleanError} setBooleanSuccess={setBooleanSuccess} booleanSuccess={booleanSuccess} openCloseModalAvatar={openCloseModalAvatar} showModalAvatar={showModalAvatar} />
            </Box>
          </Box>
          <Box display={"flex"}>
            <Box margin={"auto"}>
              <ModalChangePass titleModal={"Edit password"} />
            </Box>
          </Box>
        </CardContent>
      </CardGlobal>
    </Container>
  );
}
