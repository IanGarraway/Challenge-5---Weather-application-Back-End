import testUsers from "./travel-test.users.json"

export default class UserTestData{

    static getData() { return JSON.parse(testUsers).testUsers; }
}