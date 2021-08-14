import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './Styles.js';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';

const Search = ({ onPlaceChanged, onLoad }) => {
	const classes = useStyles();
	return(
		<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
         </Autocomplete>
		);
};
export default Search;