import React, { useState } from "react";
import { useSelector } from 'react-redux';
import {
  Avatar,
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  Grid
} from "@material-ui/core";
import Face from "@material-ui/icons/Face";
import FormRegister from "../components/FormRegister";
import { makeStyles } from "@material-ui/core/styles";
import Alert from '../../../../modules/layout/components/alert/Alert'

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(3),
    marginRight: theme.spacing(4),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minWidth: 200,
    maxWidth: 1500
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#e0a931"
  },
  chip: {
    width: 300,
    height: 200,
    marginTop: theme.spacing(10),
  }
}));

const Register = () => {

  const [submitted, setSubmitted] = useState(false)

  const classes = useStyles();

  const updateSubmitted = (event) => {
    setSubmitted(true);
  }

  return (
    <Container component="main" maxWidth="sm">
      { submitted ? (
        <Box display={"flex"}>
          <Box margin={"auto"} style={{ paddingTop: 50 }}>
            <Alert title={"Successful registration"}
              content={"A confirmation email has been sent to your mailbox"}
              type={'success'} />
          </Box>
        </Box>
      ) : (
          <Grid className={classes.paper} item xs={12} sm={12} >
            <Card >
              <CardContent>
                <Box display={"flex"}>
                  <Box margin={"auto"}>
                    <Avatar className={classes.avatar}>
                      <Face />
                    </Avatar>
                  </Box>
                </Box>
                <Box display={"flex"}>
                  <Box margin={"auto"}>
                    <Typography component="h1" variant="h5">
                      Create Account
                    </Typography>
                  </Box>
                </Box>
                <FormRegister submitUpdate={updateSubmitted} />
              </CardContent>
            </Card>
          </Grid>
        )}
    </Container>
  );
}

export default Register;