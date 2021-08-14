import React,{useState,useEffect} from 'react'
import axios from 'axios';
// import images from '../../image/default'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Header from '../Header/Header'
import NavBar from '../Navbar/NavBar'
import { createTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import "./UserProfile.css"

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
 

    root2: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
const UserProfile = (props) => {
    const classes = useStyles();
    const [user, setUserName] = useState({});
    const [name,setUserNameEdit]=useState([]);
    const [email,setemail]=useState("");
    const [age,setUserAge]=useState();
    const [origin,setorigin]=useState("");
    const [password,setUserPassword]=useState("");
    const [loaded,setLoded]=useState(false);
    const [editForm,setEditFrom]=useState(false);
    const [render, setRender] = useState(false)
    const { id } = props;

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/'+id)
        .then(res =>{
        setUserName(res.data);
        setUserNameEdit(res.data.name);
        setemail(res.data.email);
        setUserAge(res.data.age);
        setorigin(res.data.origin);
        setUserPassword("Password");

        setLoded(true);
        setRender(false)
        })
    }, [render])

    const showEditForm=()=>{
        setEditFrom(true);
    }
    const onSubmitHandler=(e)=>{
        e.preventDefault();
        console.log("i am in submit handler")
        axios.put('http://localhost:8000/api/users/' + id, {
            name,
            email,
            age,
            origin,
            password
    })
            .then(res =>{ 
                console.log(res.data)
    });
            setEditFrom(false);
            setRender(true)

    }
    return (
        <div>
            <Header/>
            <NavBar/>
            <div className="imgAndEdit">
                <div className="imageSt">
                    <img src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fkarateinthewoodlands.com%2Four-instructors%2Fdefault-user-image%2F&psig=AOvVaw1Sm4LgTB8T-z3LjLWpoB0P&ust=1629018158226000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCPDS_uSTsPICFQAAAAAdAAAAABAR' />
                </div>
                <div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={showEditForm}
                    >
                         Edit     
                    </Button>
                </div>
            </div>
           <div className="list">
                <div className="userInfo">
                    {(loaded&& <div> <div className="label3"><label className="namelabel">Name:</label></div><div className="labelresult"><label>{user.name}</label></div><br/><br/></div>)}
                    {(loaded&& <div> <div className="label3"><label className="namelabel">Age:</label></div><div className="labelresult"><label>{user.age}</label></div><br/><br/></div>)}
                    {(loaded&& <div> <div className="label3"><label className="namelabel">Email:</label></div><div className="labelresult"><label>{user.email}</label></div><br/><br/></div>)}
                    {(loaded&& <div> <div className="label3"><label className="namelabel">Gender:</label></div><div className="labelresult"><label>{user.gender}</label></div><br/><br/></div>)}
                    {(loaded&& <div> <div className="label3"><label className="namelabel">Origin:</label></div><div className="labelresult"><label>{user.origin}</label></div><br/><br/></div>)}
            <div>
                { 
                loaded && user.interests.map((interest,i)=>{
                        return ( <div><div className="label3"> <label className="namelabel">Intreset:</label></div><div className="labelresult"><label key={i}>{interest}</label></div><br/><br/></div>)})
                }
            
            
                </div>
             </div>   
            </div>
            {/* <p>{user.name}</p> */}
            <div className="formStyle">
          
            {(editForm && <form onSubmit={onSubmitHandler} className={classes.root} noValidate autoComplete="off">
            <h1>Edit User Profile</h1> 
            <TextField id="outlined-basic" label={user.name} variant="outlined" value={name} onChange={(e)=>setUserNameEdit(e.target.value)} /><br/><br/>
            <TextField id="outlined-basic" label={user.age}variant="outlined" value={age} onChange={(e)=>setUserAge(e.target.value)}/><br/><br/>
            <TextField id="outlined-basic" label={user.email} variant="outlined" value={email} onChange={(e)=>setemail(e.target.value)}/><br/><br/>
            <TextField id="outlined-basic" label={user.origin} variant="outlined" value={origin} onChange={(e)=>setorigin(e.target.value)}/><br/><br/>
            <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={(e)=>setUserPassword(e.target.value)}/><br/><br/>
            <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                           Save       
        </Button>
    </form>
           
            )}
            </div>
            

        </div>
    )
}


export default UserProfile