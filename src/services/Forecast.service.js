import axios from "axios";

export default class ForecastService{
     getForecast = async (location) => {

        const { OPENWEATHERKEY: apiKey } = process.env;        
        let url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&cnt=40&appid=${apiKey}`        
        let response = await axios.get(url);
        return response.data;            
    }
}