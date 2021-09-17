import React, {useState} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import {AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'

import useStyles from './styles.js';

const Header = ({setCoordinates}) => {
    const classes = useStyles();
    const [autocomplete, setAutocomplete] = useState(null);

    const onLoad = (autoComp) => setAutocomplete(autoComp);

    const onPlaceChanged = () => {
        const lat = autocomplete?.getPlace()?.geometry?.location.lat();
        const lng = autocomplete?.getPlace()?.geometry?.location.lng();

        if (!lat || !lng) {
            return
        }
        setCoordinates({lat, lng});
    }
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Local restaurants and Weather App
                </Typography>
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Find places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase placeholder="Search..." classes={{root: classes.inputRoot, input: classes.inputSearch}} />
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;