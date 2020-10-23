import React from 'react';
import {
  Avatar,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Divider,
  Box
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AuthForm from '../components/AuthForm';
import { useStyles } from './styles/StyleAuth';

export default () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Card>
          <CardContent>
            <Box display={'flex'}>
              <Box margin={'auto'}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
              </Box>
            </Box>
            <Box display={'flex'}>
              <Box margin={'auto'}>
                <Typography component="h5" variant="h5">
                  Log In
                </Typography>
              </Box>
            </Box>
            <Divider className={classes.divider} />
          </CardContent>
          <CardActions>
            <AuthForm />
          </CardActions>
        </Card>
      </div>
    </Container>
  );
}