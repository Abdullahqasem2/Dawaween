import React from 'react';
import {AppBar, Toolbar, Typography, InputBase, Box} from '@material-ui/core';
// import {Autocomplete} from '@react-google-maps/api';
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './Styles';

const Header = () => {
  const classes = useStyles();
  return(
    <div>
      <AppBar position="static" >
        <Toolbar className={classes.toolbar} >
            <Typography variant="h5" className={classes.title} >
            Sawwah
            </Typography>
          <Box>
            {/* asd */}
              <div className={classes.search} >
                <div className={classes.searchIcon} >
                  <SearchIcon />
                </div>
                <InputBase placeholder="search..." classes={{root:classes.inputRoot, input: classes.inputInput}} />
              </div>
            {/* asd */}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
