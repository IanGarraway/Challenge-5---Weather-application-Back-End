import testFavourites from "./travel-test.favourites.json";

export default class FavouriteTestData{

    static getData(){return JSON.parse(testFavourites).testFavourites }
}