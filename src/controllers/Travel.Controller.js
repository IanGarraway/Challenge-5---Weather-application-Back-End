import FavouritesService from "../services/Favourites.service.js"
import LoginService from "../services/Login.service.js"
import ForecastService from "../services/Forecast.service.js"

export default class TravelController{
    #favService
    #forecastService
    #loginService
    
    
    constructor(favService = new FavouritesService(), loginService = new LoginService(), forecastService = new ForecastService) {
        this.#favService = favService;
        this.#loginService = loginService;
        this.#forecastService = forecastService;
    }

    getFavourites = async (req, res) => {
        try {
            res.json(await this.#favService.getFavourites());
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };

    getForecast = async (req, res) => {
        try {
            let location = req.query.location;                      
            res.json(await this.#forecastService.getForecast(location));
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
    
}