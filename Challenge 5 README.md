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

After running the Travel Info Web Application without any backend services other than the direct API calls for a few weeks, DFCorp have received feedback from their users that the application could be improved to make it more personalised to them.  In response to this, DFCorp have decided to commission you to build a set of backend services that will allow the Travel Info Web Application to have individual users and for them to be able to use their favourite locations for use across any device they log in on.

> Before proceeding, ensure that you have a solid understanding of why a user needs this software and the benefits that it will bring to them (See Task 1).

## Core Features

The Business Analyst team working with the Product Owner at DFCorp have identified the following core features that the backend services should provide:

1. **User Authentication**:
   - The web application will send registration details to a backend service to create a new user account
   - The web application will send login details to the backend service to authenticate a user
   - The web application will send a password change request to the backend service and update the user's password
   - A user must be authenticated on every subsequent request to any other backend service
2. **Favourite Locations**:
   - The web application will send a request to a backend service to obtain the stored favourite locations of an authenticated user
   - The web application will send a request to add a new location to an authenticated user's favourite locations
   - The web application will send a request to remove a location from an authenticated user's favourite locations

You may architect the backend services in any way you see fit.  Authentication can be handled through a simple check of username/password on each request but more efficient and secure methods are encouraged.  The storage of user data and favourite locations can be done in any way you see fit but must be held in a MongoDB database.

> **Note:** The use of a generative AI tool to complete tasks relating to the specific requirements above is NOT allowed.  All work here should be your own.

## Additional Features

DFCorp have been made aware that inserting API keys into frontend applications can leave their accounts open to abuse.  To counter this, they have asked that you create proxy services that will allow the frontend application to make requests to the backend services without exposing the API keys.

They are also concerned that an industry standard method of authentication is not being used and have asked that you implement JSON Web Token (JWT) authentication for the backend services.

The Product Owner at DFCorp has also identified a number of additional features that they would like to see in the backend services if time should allow you:

1. **JSON Web Token Authentication**:
   - Once a user has logged in, a JSON Web Token (JWT) should be returned to the web application and used for all subsequent requests
2. **Proxy Services**:
   - Weather API Proxy Service:
      - The web application will send a request to the backend service to obtain weather information for a location using the weather API and its key used in the frontend application and it will be responsible for returning the data to the web application (in JSON format)
   - **Map API Proxy Service**:
     - The TomTom API used allows you to set a whitelist of domains that can access the API - this means a proxy is not needed as the domain for the web application can be used and key exposure is not a concern
   - **Hotel API Proxy Service**:
     - The web application will send a request to the backend service to obtain hotel information for a location using the hotel API and its key used in the frontend application and it will be responsible for returning the data to the web application (in JSON format)

> **Note:** The use of a generative AI tool to help complete tasks relating to these further requirements is allowed but should be clearly documented.

---

## Tasks

1. Explain why the customer needs the backend services and the benefits that it will bring to them.  You should include the following in your explanation:
   - The problems that the backend services will solve
   - The benefits that the backend services will bring to the user
   - The impact that the backend services will have on the customer's business
2. From the requirements listed above, devise a set of user stories that describe the functionality that the client has requested
3. Create a set of routing diagrams that show how the backend services will be accessed by the frontend application
4. Create the application using a test-driven development (TDD) approach and the NodeJS/Express/MongoDB stack
5. Create a set of tests that validate the functionality of the backend services using POSTMAN

### Bonus Task (Strictly optional but would be great!)

Can you deploy the frontend and backend to cloud services such as Netlify and Render and implement a cloud-based database?

If you can, provide links to your deployed applications and databases in the markdown file in the `docs` folder.  This should include a **username** and **password** that can be used to test the deployment.

---

## Tips

- Commit regularly to GitHub with clear commit messages - write a failing test, pass the test, commit, etc
- You should put your component hierarchies, state identification notation and test plans in the markdown file in the `docs` folder, if you decide to use some form of Scrum board to track your progress, you should include a screenshot of this in the markdown file
- Structure your `src` folder with suitable sub-folders to help identify groups of components

---

## APIs

The following APIs can be used in this project.  Be mindful of any request limits and DO NOT use any APIs that require billing information.

---

### Weather API

For weather information, you can use the free ***OpenWeatherMap*** API by signing up for a free developer key - select the ***FREE*** tier here:

[https://openweathermap.org/price](https://openweathermap.org/price)

Once you have your API key, you can use the following fetch or Axios request to obtain the weather data for a location:

```javascript
const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=<YOUR API KEY>`);
setWeatherData(response.data);
```

> You can then simply return the `response.data` to the frontend application.

---

### Hotel API

For hotel information, you can use the free ***RapidAPI*** to access the ***[Priceline.com](https://rapidapi.com/davidtaoweiji/api/priceline-com/)*** API by signing up for a free developer key.

Once you have done this, you can use the following fetch or Axios request to obtain the hotel data for a location:

```javascript

const options = {
  method: 'GET',
  url: 'https://priceline-com.p.rapidapi.com/hotels/city/search',
  params: {q: 'Dublin US'},
  headers: {
    'X-RapidAPI-Key': '<YOUR KEY HERE>',
    'X-RapidAPI-Host': 'priceline-com.p.rapidapi.com'
  }
};

try {
 const response = await axios.request(options);
 console.log(response.data);
} catch (error) {
 console.error(error);
}
```

> You can then simply return the `response.data` to the frontend application.

---

## Grading Criteria

## Digital Futures Software Engineering Progression Management Framework

In this Challenge, you will have the opportunity to demonstrate the following competencies from the Software Engineering Progression Management framework:

---

### Writes software that meets a user’s functional and non-functional requirements

|               | Description                                                                                                                                                                                                         | Where assessed?                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| ***Level 3*** | The engineer can code a solution that functionally and non-functionally meets requirements for **several simple** requirements                                                                                      | Code submitted (*Core features fully implemented* ) |
| ***Level 3*** | The engineer can write code that is **functionally correct** and can use **Generative AI** to help **refactor** code | Code submitted and Markdown file in `docs` folder |
| ***Level 4*** | The engineer can code a solution that functionally and non-functionally meets requirements for a *small number* of ***complex*** requirements (e.g. requirements requiring multiple functions or breaking down to fulfil)          | Code submitted (*some/all additional features implemented*) |
| ***Level 4*** | The engineer can code a solution that functionally and non-functionally meets requirements and can participate in group reviews of code identifying opportunities to make it more efficient and/or cleaner with the help of a Generative AI tool where appropriate | Code review issues in GitHub |
| ***Level 5*** | The engineer can code a solution that functionally and non-functionally meets requirements for a **number** of **complex** requirements | Code structure - separate servers for authentication and functionality |

---

### Can interpret business requirements into coding requirements
  
|               | Description                                                                                                                                                                                                  | Where assessed?                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| ***Level 1*** | The engineer can create **simple user stories** from user requirements (i.e. clearly defined story using “As a”, “Able to”, “So that” or “Given/When/Then” structure that could be solved using simple code) | Markdown file in `docs` folder  |
| ***Level 3*** | The engineer can create **routing diagrams** and/or apply object-oriented principles in them for ***simple*** user stories | Markdown file in `docs` folder and code submitted (*Some of core features implemented*) |
| ***Level 4*** | The engineer can create **routing diagrams** and/or apply object-oriented principles in them for ***moderately complex*** user stories (i.e. user stories that require multiple objects/domain models to fulfil) | Markdown file in `docs` folder and code submitted (*Core features fully implemented*) |
| ***Level 5*** | The engineer can create **routing diagrams** and/or apply object-oriented principles in them for ***complex*** user stories (i.e. user stories that require multiple objects/domain models and/or breaking down further to fulfil) | Markdown file in `docs` folder and code submitted (*Additional features attempted with some success*) |

---

### Develop code through Test-Driven Development and/or Behaviour Driven Development

|               | Description                                                                                                                                                                                                 | Where assessed?                        |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| ***Level 2*** | The engineer can write **tests** and/or **working code** that demonstrates that the **TDD process** has been followed through a commit history with clear commit messages                                   | Code submitted - GitHub commit history |
| ***Level 3*** | The engineer can write **tests** and/or **working code** that pass covering the **main functionality** of the code using a standard, **third-party** testing framework | Code submitted |
| ***Level 3*** | The engineer can write **tests** and/or **working code** that demonstrates the use of a **Generative AI** tool to identify and write test cases and/or code for tests | Code submitted and Markdown file in `docs` folder |
| ***Level 4*** | The engineer can write **tests** and/or **working code** that passes tests that cover **some edge cases** of the code **that they have identified** using a standard, **third-party** testing framework | Code submitted |
| ***Level 4*** | The engineer can write **tests** and/or **working code** that demonstrates the use of a **Generative AI** tool to identify and write tests for **further edge cases** | Code submitted and Markdown file in `docs` folder |
| ***Level 5*** | The engineer can write **tests** and/or **working code** that passes tests that cover most **edge cases** of the code using a standard, **third-party** testing framework | Code submitted and Markdown file in `docs` folder |
| ***Level 5*** | The engineer can write **tests** and/or **working code** that demonstrates the use of a **Generative AI** tool to identify and write tests for **further edge or corner cases** | Code submitted and Markdown file in `docs` folder |

---

### Writes clean code

|                | Description                                                                                                                                                                                                       | Where assessed? |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| ***Level 2***  | The engineer can write code that is **functionally correct** using applying **some** principles of clean-coding (e.g. 5-line functions, no nested loops or conditional statements)                                | Code submitted  |
| ***Level 2***  | The engineer can write code that is **functionally correct** and has been made **more efficient** by a **Generative AI** tool | Code submitted and Markdown file in `docs` folder |
| ***Level 2***  | The engineer can write code that is **functionally correct** and has **demonstrated** the use of **Generative AI** to help within the **debugging** process | Code submitted and Markdown file in `docs` folder |
| ***Level 3***  | The engineer can write code that is **functionally correct** using applying **single responsibility** and other clean-coding practices (e.g. **abstraction**) to **some** of the classes/functions/methods and blocks of code | Code submitted  |
| ***Level 3*** | The engineer can write code that is **functionally correct** and can use **Generative AI** to help **refactor** code | Code submitted and Markdown file in `docs` folder |
| ***Level 4***  | The engineer can write code that is **functionally correct** using applying **single responsibility** and other clean-coding practices (e.g. **abstraction**) to **most** of the classes/functions/methods and blocks of code | Code submitted  |
| ***Level 4*** | The engineer can write code that is **functionally correct** and can use **Generative AI** to help **document their own** or the **code of others** | Code submitted and Markdown file in `docs` folder |
| ***Level 5***  | The engineer can write code that is **functionally correct** using applying **single responsibility** and other clean-coding practices (e.g. **abstraction**) to all of the classes/functions/methods and blocks of code to create **loosely-coupled**, **highly-cohesive** code | Code submitted and Markdown file in `docs` folder |

---

### Creates Backend Services meeting requirements

|                | Description                                                                                                                                                                                                       | Where assessed? |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| ***Level 1***  | The engineer can create backend service that can handle **simple requests** with **simple responses** | Code submitted  |
| ***Level 2***  | The engineer can create backend service that can handle **different request types** to the same route, **send appropriate responses** and have logic that is tested | Code submitted  |
| ***Level 3***  | The engineer can create backend service that can handle **different request types** to similar routes and **interface** with a **database** | Code submitted  |
| ***Level 3***  | The engineer can create backend service that can send **appropriate responses** that are **tested** | Code submitted  |
| ***Level 4***  | The engineer can create backend service that can handle **different request types** to similar routes, carrying out *validation* and *verification* of *request data* | Code submitted  |
| ***Level 4***  | The engineer can create backend service that return **response objects** with *appropriate status codes* and *data* using a **service-controller** architecture | Code submitted  |
| ***Level 5***  | The engineer can create backend service that can handle and ***authenticate*** requests to **complex** routes | Code submitted  |

---

## Digital Futures Professional Skills Progression Management Framework

In this Challenge, you will have the opportunity to demonstrate the following competencies from the Professional Skills Progression Management framework:

---

### Communications

|               | Description                                                                                            | Where assessed?                |
| ------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------ |
| ***Level 1*** | Can express themselves fluently in both verbal and written English                                     | Markdown file in `docs` folder |
| ***Level 1*** | Demonstrates attentive listening                                                                       | During assignment introduction |
| ***Level 2*** | Convey technical information to technical stakeholders in both verbal and written forms                | Markdown file in `docs` folder |
| ***Level 2*** | Creates content to a professional standard that is concise, well-structured, and grammatically correct | Markdown file in `docs` folder |
| ***Level 3*** | Articulates complex technical concepts with clarity and precision across both verbal and written forms. | Markdown file in `docs` folder |

---

### Business Awareness

|               | Description                                                                                                                                  | Where assessed?                                    |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| ***Level 1*** | Recognises importance of customer/stakeholder-centricity                                                                                     | Markdown file in `docs` folder                     |
| ***Level 2*** | Applies basic requirement elicitation techniques and can gather and document simple requirements that align towards the business’ objectives | Markdown file in `docs` folder                     |
| ***Level 3*** | Creates clear project documentation detailing project objectives, approach and results                                                       | Markdown file in `docs` folder and in code files   |
| ***Level 3*** | Applies prioritisation techniques to ensure resource efficiency and project alignment within timescales and business objectives              | Markdown file in `docs` folder (Trello screenshot) |

---

### Professional Development (Assessed after submission via Self-Review)

|               | Description                                                                                                    | Where assessed?                  |
| ------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| ***Level 1*** | Demonstrates ability to listen to and act on constructive feedback or new ideas from others | SMART Goal Review |
| ***Level 2*** | Constructs SMART goal based on their identified areas of improvement | SMART goal review |
| ***Level 2*** | Achieves a self-made SMART goal | Previous SMART goal review |
| ***Level 3*** | Demonstrates consistency in achieving small to medium (<2 weeks) SMART goals (x3 goals)  | SMART Goal review |
| ***Level 3*** | Provides constructive input to peers and can communicate feedback in a supportive and helpful manner | Peer review comments |
| ***Level 3*** | Demonstrates ability to experiment with new techniques or approaches that work best for them | In code - Testing; In docs - Component Hierarchies |

---

### Adaptability

|               | Description                                                                                                             | Where assessed?                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| ***Level 1*** | Individual may notice when processes, procedures, or tasks are altered but may not be entirely comfortable with changes | Markdown file in `docs` folder                   |
| ***Level 1*** | Demonstrates openness to making minor-in-scope adjustments to their plans and tasks in response to changes              | Markdown file in `docs` folder                   |
| ***Level 2*** | Understands fundamental Agile terms, such as User Stories, Scrum, Kanban, and the Agile Manifesto                       | Project files and Markdown file in `docs` folder |
| ***Level 3*** | Demonstrates experimentation with different approaches, tools, or methods                                               | Project files and Markdown file in `docs` folder |

---

## Submission

Your Challenge attempt should be submitted via commits to the forked project from GitHub Classroom.  Your trainer will have supplied you with the appropriate link to do access this, you need to take no further action on this platform.  To indicate that you have completed the Challenge, you should you the Assignment Submission link in the Challenge course for your Cohort on Noodle.  The Progression Management Frameworks will be assessed via a marking rubric in Noodle and you will be able to see how you performed in each competency.

You are not permitted to collaborate with anyone to complete this challenge.  You should complete the *Core Functionality* using traditional skills, knowledge and understanding of software engineering and all code submitted for this should be your own.  You may use a *Generative AI tool* to help you complete the *Additional Functionality* but this should be clearly documented.

---

## Feedback

After submission of your challenge attempt, your trainer will record and submit feedback in Noodle and/or via GitHub for comments in your code .  You will then be able to view this feedback via Noodle and your GitHub account.

Your trainer will also provide general feedback to the cohort via the Discord channel.

---
