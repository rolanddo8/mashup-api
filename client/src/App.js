import React, {useState, useEffect} from 'react';
import {CssBaseline, Grid } from '@material-ui/core';

import {getPlacesData, getWeatherData} from './api'
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {

    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('')
    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
    const [bound, setBound] = useState({});
    const [placeClicked, setPlaceClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>{ 
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude});
        })
    }, [])

    useEffect(() => {
        if(bound.sw && bound.ne) {
        setIsLoading(true);

        getWeatherData(coordinates.lat, coordinates.lng)
            .then((data) => {
                const weather = data?.data;
                setWeatherData(weather)
            });

        getPlacesData(bound.sw, bound.ne)
            .then((data) =>{
                const place = data?.data;
                setPlaces(place?.filter((place) => place.name && place.num_reviews > 0));
                setIsLoading(false);
            })
        }    
    }, [bound]);
    return(
        <>
            <CssBaseline/>                             
            <Header setCoordinates={setCoordinates}/>
            <Grid container spacing={3} styles={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={places ? places: []}
                        placeClicked={placeClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBound={setBound}
                        coordinates={coordinates}
                        places={places ? places: []}
                        setPlaceClicked={setPlaceClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;