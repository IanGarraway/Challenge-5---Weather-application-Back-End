import FavouritesService from "../services/Favourites.service.js"
import LoginService from "../services/Login.service.js"

export default class TravelController{
    #favService
    #loginService
    
    
    constructor(favService = new FavouritesService(), loginService = new LoginService()) {
        this.#favService = favService;
        this.#loginService = loginService;        
    }

    getFavourites = async (req, res) => {
        try {
            res.json(await this.#favService.getFavourites());
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
    
}