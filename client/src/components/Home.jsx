import React from 'react';
import axios from 'axios';
import {CssBaseline, Grid} from '@material-ui/core';

import List from './Sawwah/List/List';
import Map from './Sawwah/Map/Map';
const Home = () => {


  return (
    <div>
    <CssBaseline />
    <Grid container spacing={3} style={{width:'100%'}}>
      <Grid item xs={12} md={4} >
        <List />
      </Grid>
      <Map />
    </Grid>
    </div>
  );
}

export default Home;
