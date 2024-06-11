import { assert } from "chai";
import testFavourites from "./travel-test.favourites.json" assert{type: 'json'};

export default class FavouriteTestData{

    static getData(){return JSON.parse(testFavourites).testFavourites }
}