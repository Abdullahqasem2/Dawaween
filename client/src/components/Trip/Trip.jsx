import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import TripForm from '../Sawwah/TripForm/TripForm'
import {Box} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Link} from '@reach/router'

const Trip = () => {
    const [trips, setTrips] = useState([])
    // const [location, setLocation] = useState("")
    const location = "Istanbul"
    const cookies = new Cookies();
    const [loaded, setLoaded] = useState(false);
    const [loadtraveleres, setLoadtraveleres] = useState(false)
    const [rerender, setRerender] = useState(false);
    const [travelers, setTravelers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/trip')
        .then(res => {
            console.log(travelers)
            setTrips(res.data.filter(response => response.location === location))
            setLoaded(true)
            setRerender(false)})
    },[rerender])

    const AddTrip = (trip) => {
        axios.post('http://localhost:8000/api/trip/'+ cookies.get('user').user._id,trip)
        .then(res => setTrips([...trips,res.data]))
        .then(setRerender(true))
    }

    const showJoiners = (tripId) => {
        axios.get('http://localhost:8000/api/trip/'+ tripId)
        .then(res => {
            console.log(res.data)
            setTravelers(res.data.users)})
        .then(setLoadtraveleres(true))
        .then(setRerender(true))
    }

    const JoinTrip = (tripId) => {
        console.log("Iam in Join Trip")
        axios.get('http://localhost:8000/api/usersjoin/'+ tripId + '/' + cookies.get('user').user._id)
        .then(res => {
            console.log(res.data.users)
            })
        .then(setLoadtraveleres(true))
        .then(setRerender(true))
    }

    const unJoinTrip = (tripId) => {
        console.log("Iam in Join Trip")
        axios.get('http://localhost:8000/api/usersunjoin/'+ tripId + '/' + cookies.get('user').user._id)
        .then(res => {
            console.log(res.data)})
        .then(setLoadtraveleres(true))
        .then(setRerender(true))
    }

    return (
        <div>
            <TripForm TripAction={AddTrip}></TripForm>
            {loaded && trips.map((item,idx) => {
                return <Box><p>{item.location}</p>
                <p>{item.description}</p>
                <Button onClick={()=>showJoiners(item._id)} key={idx}>Show Trip Joiners</Button>
                <Button onClick={()=>JoinTrip(item._id)} key={idx}>Join Trip</Button>
                <Button onClick={()=>unJoinTrip(item._id)} key={idx}>UnJoin Trip</Button>
                </Box>
            })}
            {loadtraveleres && travelers.map((item,idx) => {
                return <p key={idx}><Link to={`/user/${item._id}`}>{item.name}</Link></p>
            })}
        </div>
    )
}

export default Trip
