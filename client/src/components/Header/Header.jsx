import React from 'react';
import {AppBar, Toolbar, Typography, InputBase, Box} from '@material-ui/core';
// import {Autocomplete} from '@react-google-maps/api';
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './Styles';
import Login from '../../views/Login';
import Register from '../../views/Register';

const Header = (props) => {
  const classes = useStyles();
  return(
    <div>
      <AppBar position="static" >
        <Toolbar className={classes.toolbar} >
            <Typography variant="h5" className={classes.title} >
            Dawaween
            </Typography>
            

          <Box>
            {/* asd */}
              <div className={classes.search} >
                <div className={classes.searchIcon} >
                  {/*<SearchIcon />*/}
                </div>
                {props.header != "Dawaween"?
            <div style={{display:'flex'}} ><Login />|
            <Register /></div>:
            <h6>Welcome</h6>
          }
              </div>
            {/* asd */}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
