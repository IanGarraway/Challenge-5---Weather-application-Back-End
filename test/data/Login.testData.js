import { assert } from "chai";
import testUsers from "./travel-test.users.json" assert{type: 'json'}

export default class UserTestData{

    static getData() { return JSON.parse(testUsers).testUsers; }
}