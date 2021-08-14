import React from 'react';
import axios from 'axios';
import Home from './components/Home';
import Header from './components/Header/Header';
import {Box} from '@material-ui/core';
import NavBar from './components/Navbar/NavBar';
import {Router} from '@reach/router'
import UserProfile from './components/UserProfile/UserProfile';
const App = () => {
  const Dewaan = "Dawaween";
  // const Dewaan = props.head;

  return (
    <div>
    {/* <Box>
      <Home />
      <NavBar/>
    </Box> */}
    <Router>
      
      <UserProfile path="/user/profile/:id"/>
      </Router>
    </div>
  );
}

export default App;
