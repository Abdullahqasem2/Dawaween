import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles,ThemeProvider, createTheme } from '@material-ui/core/styles';

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
    fontFamily: 'cursive',
    fontSize: 'small',
    fontWeight: '900',
},
}));

const TripForm = (props) => {
    const [errors, setErrors] = useState([])
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const classes = useStyles();
    const createTrip = (e) => {
        e.preventDefault()
        props.TripAction({location, description, startDate, endDate})
    }
    return (
        <div>
            <form onSubmit={createTrip}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                id="location"
                label="Trip Location"
                name="location"
                autoComplete="location"
                onChange={(e) => setLocation(e.target.value)}
                error={errors}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                id="description"
                label="Trip Description"
                name="description"
                autoComplete="description"
                onChange={(e) => setDescription(e.target.value)}
                error={errors}
            />
            <br></br>
            <TextField 
                style={{margin:"5px"}} 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                id="startDate" 
                label="Start Date" 
                type="date" 
                InputLabelProps={{shrink: true}}
            />
            <TextField 
                style={{margin:"5px"}} 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                id="endDate" 
                label="End Date" 
                type="date" 
                InputLabelProps={{shrink: true}}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
            Create a Trip
            </Button> 
            </form>  
        </div>
    )
}

export default TripForm
