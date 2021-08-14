import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import SawahNav from '../../Navbar/SawahNav'

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
        color: '#545454',
        fontFamily: 'cursive',
        fontSize: 'small',
        fontWeight: '900',
    },
}));

const Form = (props) => {
    const [text, setText] = useState("");
    const classes = useStyles();
    const channel = props.type;
    const postid = props.postid;
    const [errors, setErrors] = useState("");
    const handleForm = (e) => {
        e.preventDefault();
        if (props.kind === "post")
            props.wallFormAction({ text, channel });
        else
            props.wallFormAction({ text }, postid);
    }

    return (
        <form className={classes.form} noValidate onSubmit={handleForm}>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="post"
                label="Share your thoughts..."
                name="post"
                autoComplete="post"
                autoFocus
                onChange={(e) => setText(e.target.value)}
                error={errors}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                {props.kind}
            </Button>
        </form>
    )
}

export default Form

