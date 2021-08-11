import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles,ThemeProvider, createTheme } from '@material-ui/core/styles';
import {grey} from "@material-ui/core/colors";

const Shadow = {
    backgroundColor: '#E6E6E6',
    border: "1px solid steelblue",
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
    new: {        color:'#545454',
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
const Login = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState("");
    const [registerd, setRegisterd] = useState(false);
    const cookies = new Cookies();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
        const login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', {
            email, password
        }, { withCredentials: true })
            .then(response => {
                cookies.set("user",response.data.user);
                setErrors("");
                setOpen(false);
                props.Registerd(!registerd);
            })
            .catch((err) => setErrors("Invalid Login"))
    };
    return (
        <div>
        <Button className={classes.new} onClick={handleClickOpen} style={{color:"white"}}>
                Sign In
        </Button>
                    <ThemeProvider theme={theme}>
                    <Dialog
                    open={open}
                    onClose={handleClose}
                    className={classes.cont}
                    aria-labelledby="form-dialog-title"
                    >
                        <DialogContent>
                <form className={classes.form} noValidate onSubmit={login}>
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
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors}
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
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors}
                    />
                    <div style={{ color: "red" }}>{errors}</div>
                    <DialogActions>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    </DialogActions>
                    </form>
                    </DialogContent>
                    </Dialog>
                    </ThemeProvider>
                </div>);
}
export default Login
