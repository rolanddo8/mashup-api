import axios from "axios";

const URL_restaurants = 'http://localhost:3001/restaurants'
const URL_weather = 'http://localhost:3001/weather'

export const getPlacesData = async (sw, ne) => {
    try{
        const {data: {data}} = await axios.get(URL_restaurants, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            }
        });

        return data;
    } catch(error) {
        console.log("error there",error)
    }
}

export const getWeatherData = async (lat, lng) => {
    try{
        if (lat && lng){
            
            const {data} = await axios.get(URL_weather, {
                params: {
                    lon: lng,
                    lat: lat,
                }
            });
            return data;
        }


    } catch(error) {
        console.log("error there",error)
    }
}