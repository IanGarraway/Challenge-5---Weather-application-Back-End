import Favourite from "../models/Favourite.model.js"
export default class FavouritesService{
    getFavourites = async (userIDnum) => {
        let favourites = await Favourite.find({ "userID": userIDnum })        
        return favourites;
    }

    addFavourite = async (location, userIDnum) => {
        try {
            if ((await Favourite.find({ name: location, userID: userIDnum })).length > 0) { return new Error("Data already exists"); }
            
            const newFavourite = new Favourite({ name: location, userID: userIDnum });
            await newFavourite.save()
            return newFavourite;            
        } catch (e) {
            return new Error(e.message);
        } 
    }

    remFavourite = async (favID, userIDnum) => {
        console.log(`Remove Fav `);
        try {
            if ((await Favourite.find({ _id: favID, userID: userIDnum })).length === 0) { return new Error("Favourite doesn't exist"); }

            await Favourite.deleteOne({ _id: favID, userID: userIDnum });            

            return "Favourite removed"
        } catch (e) {
            return new Error(e.message);
        }
    }
    
}