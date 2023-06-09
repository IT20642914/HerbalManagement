import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import { Link as Link_NAV } from "react-router-dom";
import MasterAPI from "../../utill/Api";
import {HERBIFY_USER_TOKEN} from '../../utill/AppConstant';
import store from "../../redux/store";
import { auth_user_data_success, user_login } from "../../redux";


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  export default function Index() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({});
  
    const handleForm = (event) => {
      setLoginInfo({
        ...loginInfo,
        [event.target.name]: event.target.value,
      });
    };
  
    const loginSubmit = () => {
      if (loginInfo.email && loginInfo.password){
          swal("You have successfully Logged In");
          navigate("/");
      }
        // MasterAPI()
        //   .post("/auth/login", loginInfo)
        //   .then((res) => {
        //     localStorage.setItem(HERBIFY_USER_TOKEN, res.data.token);
        //     store.dispatch(auth_user_data_success({ user: res.data }));
        //     store.dispatch(user_login());
        //     swal("You have successfully Logged In");
        //     navigate("/");
        //   })
        //   .catch((err) => console.log(err));
      else swal("Enter email and password");
    };
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleForm}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleForm}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={loginSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={Link_NAV} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }