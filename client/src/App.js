import React from 'react';
import axios from 'axios';
import Home from './components/Home';
import Header from './components/Header/Header';
import {Box} from '@material-ui/core';


const App = () => {


  return (
    <div>
    <Header />
    <Box>
      <Home />
    </Box>
    </div>
  );
}

export default App;
