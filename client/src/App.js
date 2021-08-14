import React from 'react';
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

// import Home from './components/Home/Home';


const App = () => {
  const Dewaan = "Dawaween";
  // const Dewaan = props.head;

  return (
    <div>
    <Box>
    <Header />
      <Router>
          <Wall path="/wall" type="Sawwah"/>
          <Home path="/sawwah" />
          <HomePage path="/"  />
          <CreateRoom path="/room" />
          <Room path="/room/:roomID" />
        
      </Router>
    </Box>
    </div>
  );
}

export default App;
