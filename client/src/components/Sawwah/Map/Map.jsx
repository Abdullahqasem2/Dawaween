import React from 'react';
import useStyles from './Styles';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocatiOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'

const Map = () => {
  const classes = useStyles();
  const coordinates = {lat:0,lng:0}
  return(
    <div className={classes.mapContainer} >

     <GoogleMapReact
        bootstrapURLKeys={{key:'AIzaSyAuJzni-dOtWspv8PVUGYKPhH8ehzXe7LE'}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={0}
        margin={[50,50,50,50]}
        options={''}
        onChange={''}
        onChildClick={''}
       >

       </GoogleMapReact>
    </div>
  );
};
export default Map;
