[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/f3W49DYc)
# Challenge 5 - Travel Info Backend Challenge

```ascii

-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----
           . _..::__:  ,-"-"._        |7       ,     _,.__
   _.____ _<_>`!(._`.`-.    /         _._`_ ,_/  '  '-._.---.-.__
>.{     " " `-==,',._\{  \  / {)      / _ ">_,-'`                mt-2_
  \_.:--.       `._ )`^-. "'       , [_/(                       __,/-'
 '"'     \         "    _L        oD_,--'                )     /. (|
          |           ,'          _)_.\\._<> 6              _,' /  '
          `.         /           [_/_'` `"(                <'}  )
           \\    .-. )           /`-'"..' `:.#          _)  '
    `        \  (  `(           /`:\  > \  ,-^.  /' '
              `._,   ""         |           \`'   \|   ?_)  {\
                 `=.---.`._._       ,'     "`|' ,- '..
                   |    `-._         |     /          `:`<_|h--._
                   (        >        .     | ,          `=.__.`-'\
                    `.     /         |     |{|              ,-.,\     .
                     |   ,'           \   /`'            ,"     \
                     |  /              |_'                |  __  /
                     | |                                  '-'  `-'   \.
                     |/                                         "    /
                     \.                                             '

                      ,/            ______._.--._ _..---.---------._
     ,-----"-..?----_/ )      __,-'"             "                  (
-.._(                  `-----'`-
-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----+-----
Map (C) 1998 Matthew Thomas. 
```

## Introduction

In this repo you will find the code for the 5th Challenge set on the Digitial Futures Software Engineering Program, the creation of a back end REST API for a Travel Information website.

This is challenge is complimentary to the work completed for Challenge 4, a React front end for the Travel information website, the repo for which can [here](https://github.com/IanGarraway/DF-Challenge-4---Travel-Info-Front-End)

---

### The Challenge Tasks

1. Explain why the customer needs the backend services and the benefits that it will bring to them.  You should include the following in your explanation:
   - The problems that the backend services will solve
   - The benefits that the backend services will bring to the user
   - The impact that the backend services will have on the customer's business
2. From the requirements ([see original readme](Challenge%205%20README.md)), devise a set of user stories that describe the functionality that the client has requested
3. Create a set of routing diagrams that show how the backend services will be accessed by the frontend application
4. Create the application using a test-driven development (TDD) approach and the NodeJS/Express/MongoDB stack

The full instructions can be found in the original project readme.md [here](Challenge%205%20README.md)

## Work

1. [Project Benefits](./docs/project-benefits.md)
2. [User Stories](./docs/user-stories.md)
3. [Routing Diagrams](./docs/routing-diagrams.md)
4. The source code for the server can be found in the src folder. The code for the testing is available in the test folder.

## The approach

A single Miro Board was used to plan out the work for both this and Challenge 4.

I chose to approach the back end using an OOP paradigm. Splitting the project up into each aspect and trying where possible to keep it to a single responsibility. Once the core server was working, each route was created using a Test Driven Development approach.

### Imported Libraries

#### Server

The server is built upon the 'Express' framework.

#### Data storage

Part of the requirements was for users to be able to save favourite locations. To do this, users would need to be able to create an account and be able to update it with their preferences. One of the simplest ways to do this was using a mongo DB rather than an SQL one. To facilitate this, Mongoose is used to connect to the database. In this version it is presently set to access a local mongoDB, but the location in the .env file means it could easily be pointed at an Online server.

#### Password Security

Bcrypt is used to hash user passwords on account creation and to confirm the submitted password matches what was stored when a user attempts to log into an account.

#### Authorisation and Authentication  

As part of the login process a Jsonwebtoken is created and used to confirm a user is logged in, this is stored in a http only cookie, which was chosen as it is more secure than using local storage or a non http only cookie which can be accessed on a client machine by malicious code. Like the cookies holding them, these are set to expire after 24 hours.

cookie-parser is used to handle cookies on the requests, to access the token, so it can be used to confirm the user is correctly logged in.

### Testing

Development was done using a Test Driven Development methodology. While some unit tests were applied to methods where possible, the majority of the testing took on the form of integration tests, on the routes themselves. For each route I started with the basic correct response test and developed the code to ensure it passed.  A request would be sent to the server and then the result checked against what it should be. To facilitate this Chai, Mocha and Supertest were used, with c8 tracking coverage. 96.81% of the code has been tested.