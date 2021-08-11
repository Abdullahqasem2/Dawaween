import React from 'react';
import axios from 'axios';
import Home from './components/Home';
import Header from './components/Header/Header';
import {Box} from '@material-ui/core';


const App = () => {
  const Dewaan = "Dawaween";
  // const Dewaan = props.head;

  return (
    <div>
    <Header header={Dewaan} />
    <Box>
      <Home />
    </Box>
    </div>
  );
}

export default App;
