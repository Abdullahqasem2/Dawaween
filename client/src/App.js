import React, { useReducer } from 'react';
import axios from 'axios';
import Home from './components/Home';
import Header from './components/Header/Header';
import {Box} from '@material-ui/core';
import HomePage from './components/HomePage/HomePage';
import {Router} from '@reach/router';
import CreateRoom from './components/Shuriken/CreateRoom';
import Room from './components/Shuriken/Room';
import Map from './components/Sawwah/Map/Map';
import Wall from './views/Wall'
import UserProfile from './components/UserProfile/UserProfile'
import ShurikenWall from './components/Shuriken/ShurikenWall';

// import Home from './components/Home/Home';


const App = (props) => {
  const Dewaan = "Dawaween";
  const room="room";
  // const Dewaan = props.head;

  return (
    <div>
    <Box>
    <Header />
      <Router>
          <Wall path="/wall" type="Sawwah"/>
          <Home path="/sawwah" />
          <HomePage path="/"  />
          <Trip path="travel" />
          <CreateRoom path="/room" />
          <ShurikenWall path="/shuriken/wall" />
          <Room path="/room/:roomID" />
          <UserProfile path="/user/:id"></UserProfile>
          <CreateRoom path="/room"/>
      </Router>
    </Box>
    </div>
  );
}

export default App;
