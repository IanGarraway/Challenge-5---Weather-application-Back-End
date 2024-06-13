import Favourite from "../models/Favourite.model.js"
export default class FavouritesService{
    getFavourites = async (userIDnum) => {
        let favourites = await Favourite.find({ "userID": userIDnum })        
        return favourites;
    }
    
}