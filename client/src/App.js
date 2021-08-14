import React from 'react';
import axios from 'axios';
import Home from './components/Home';
import Header from './components/Header/Header';
import {Box} from '@material-ui/core';
import Wall from './views/Wall'
import {Router} from '@reach/router'

const App = () => {
  const Dewaan = "Dawaween";
  // const Dewaan = props.head;

  return (
    <div>
    <Box>
      <Router>
      <Wall path="/wall" type="Sawwah"/>
      <Home path="/"></Home>
      </Router>
    </Box>
    </div>
  );
}

export default App;
