import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie'


import { navigate } from '@reach/router'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
//changed something
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { grey } from "@material-ui/core/colors";



const Shadow = {
    backgroundColor: '#E6E6E6',
    border: "1px solid #7d2727",
    borderRadius: "5px",
    padding: "10%",
    boxShadow: "#620000 0px 4px 20px 0px"
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    new: {
    color:'#545454',
    fontFamily: 'cursive',
    fontSize: 'small',
    fontWeight: '900',
},
}));
const theme = createTheme({
    palette: {
        primary: {
            main: grey[800],
        },
        secondary: {
            main: grey[800],
        }
    }
})

const Register = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const cookies = new Cookies();
    const [registerd, setRegisterd] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const register = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', {
            firstName, lastName, email, password
        }, { withCredentials: true })
            .then(response => {
                cookies.set("user",response.data);
                setErrors("");
                setOpen(false);
                props.Registerd(!registerd);
            })
            .catch(error => {setErrors("Please fill the empty fields"+error)
            })
    };
    const classes = useStyles();
    return (
        <div>
            <Button className={classes.new} onClick={handleClickOpen} style={{color:"white"}}>
                Sign up
        </Button>
      {/* <ThemeProvider theme={theme}>*/}
                    <Dialog
                    open={open}
                    onClose={handleClose}
                    className={classes.cont}
                    aria-labelledby="form-dialog-title"
                    >
                        <DialogContent>
                    <form className={classes.form} noValidate onSubmit={register}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="name"
                                    name="Name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="Name"
                                    label="Name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="age"
                                    label="age"
                                    name="age"
                                    onChange={(e) => setLastName(e.target.value)}
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {firstName.length?
                            <div>{(firstName.length)<3 ? <small style={{color:"red"}}>First Name should be atleast 2 char</small>:<small></small>}</div>:""}
                            {lastName.length?
                            <div>{(lastName.length)<3 ? <small style={{color:"red"}}>Last Name should be atleast 2 char</small>:<small></small>}</div>:""}
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                />
                                {!(/^([\w-.]+@([\w-]+.)+[\w-]+)?$/.test(email))? <small style={{color:"red"}}>Invalid Email</small>:<small></small>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                            </Grid>
                            {password.length?
                            <div>{(password.length)<8 ? <small style={{color:"red"}}>Password should be atleast 8 char</small>:<small></small>}</div>:""}
                            <small style={{color:"red"}}>{errors}</small>
                        </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="interests"
                                name="interests"
                                variant="outlined"
                                required
                                fullWidth
                                id="interests"
                                label="interests"
                                onChange={(e) => setFirstName(e.target.value)}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="origin"
                                name="origin"
                                variant="outlined"
                                required
                                fullWidth
                                id="origin"
                                label="origin"
                                onChange={(e) => setFirstName(e.target.value)}
                                autoFocus
                            />
                        </Grid>
                      </Grid>
                        <DialogActions>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                                    Sign Up
                        </Button>
                        </DialogActions>
                    </form>
                    </DialogContent>
                    </Dialog>

                </div>
              );
}
export default Register
