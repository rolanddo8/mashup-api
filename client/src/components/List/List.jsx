import React, {useState, useEffect, createRef} from 'react';
import {CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core'

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles';

const List = ({places, placeClicked, isLoading, type, setType, rating, setRating}) => {
    const classes = useStyles();
    const [placeRef, setPlaceRef] = useState([])

    console.log({placeClicked});

    useEffect(() => {
        setPlaceRef((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);

    return (
        <div className={classes.container}>
            <Typography varirant="h3">
                Restaurants around you
            </Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem"/>
                </div>
            ) : (
                <>
                    <Grid   Grid container spacing={3} className={classes.list}>
                        {
                        places?.map((place, i) => (
                            <Grid ref={placeRef[i]} item key={i} xs={12}>
                                <PlaceDetails  
                                    selected={Number(placeClicked) === i} 
                                    refProp={placeRef[i]} 
                                    place={place} />
                            </Grid>
                        ))}
                    </Grid>
                </>
           
            )}
        </div>
        );
}

export default List;