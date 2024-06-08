import Favourite from "../models/Favourite.model.js"
export default class FavouritesService{
    getFavourites = async (userID) => {
        return await Favourite.find({userID: userID })
    }
    
}