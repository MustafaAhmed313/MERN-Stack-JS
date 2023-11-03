# Introduction To Express.js

Hello everyone, I am Mustafa Ahmed, a `Semi-Senior` at `Computer-Science Department`, `Faculty of Science`, `Cairo University`.

In this docs, i will introduce part of the MERN-Stack (Express.js). I will use the concept of the main sequential points of the framework to save you from forgetness or ignorance for any important thing or behaviour of some blocks of codes for the express `Back-End` framework. 
I will leave you the materials and links that i used to gather these information together below.

- ### Sources and Links
    - <a href="https://www.youtube.com/watch?v=Sw4FQGUvw7w">Courses for Arab channel: Node.js & Express.js</a>
    - <a href="https://nodejs.org/en">Install Node.js Compiler for JS</a>
    - <a href="https://www.mongodb.com/products/tools/compass">Install MongoDB Compass</a>
    - <a href="https://www.mongodb.com/products/tools/shell">Install MongoDB Shell</a>
    - <a href="https://www.mongodb.com/products/tools/vs-code">Install MongoDB VSCode Plugin</a>
    - <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status">Status Codes of the Response</a>
    - <a href="https://www.postman.com/downloads/">Install Postman Platform</a>

- ### Chapters :-
    - Chapter1: `Project Initializations`
    - Chapter2: `MongoDB Connection Server`
    - Chapter3: `Rest API & CRUD Operations`

<hr>

## Chapter 1: Project Initializations

First, we need to initialize a node.js project, so go to the `sources and Links` of this doc. and install the `node.js` compiler for javascript from the link.

Second, Initialize your project area by create a new folder in somewhere in your local storage, name it as you like. It doesn't matter. Next, open it and create `app.js` file then type the following command in the terminal to initialize node project using its `npm` tool or `Node Package Manager`.

```
npm init -y
```

That command will create `package.json` file, and json stands for `JavaScript Object Notation`.

Third, we need to install two packages from `npm`
one of them its the `express.js` framework to make the `node.js` compiler familiar with its objects, and the other its `nodemon` package for the resetting process for the server side.

```
npm install express --save
npm install nodemon
```

Now go to the `package.json` file, you will see a property of the json object called

```json
"scripts":{
    "test": "echo \"Error: no test specified\" && exit 1"
}
```

and add a new script, let's call it `serve` and type the following command in its value phase 
`nodemon app.js` as follows:

```json
"scripts":{
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "nodemon app.js"
}
```

The next step is optional for you. If you want to use 

```javascript
require('package_name');
```
, skip this part.
Other Wise, you will add this json object property `type:` and its value phase `module` to the `package.json` to use the 

```javascript
import something from 'pacakage-name';
``` 
statement as follows:

```json
{
    "main": "app.js",
    "type": "module"
}
```
Forth, we need to import the express package as follows:

```javascript
import express from 'express';
// or
const express = require('express');
```

then we need to initialize the server and its port i will use `port = 1000` you can choose other port. Create an object `app` from the 
`express` class you import it before

```javascript
import express from 'express';

const app = express();
```

then initialize your main endpoint for the server by any print statement for its response when you request it

```javascript
import express from 'express';

const app = express();

app.get('/' , (request , response) => {
    response.send('Hello, World');
});
```

then create your server side listener

```javascript
import express from 'express';

const app = express();

app.get('/' , (request , response) => {
    response.send('Hello, World');
});

app.listen(1000 , () => {
    console.log('Here My server is running on port 1000!');
});
```

Finally, run the `serve` script which you added it in the `package.json` file using the following command:

```
npm run serve
```

then type `localhost:1000` in your Browser to see the print statement of the main endpoint `/` response message as follows:

`Console`

<img src="./../images/Screenshot 2023-11-03 131117.png">

`Browser`

<img src="./../images/Screenshot 2023-11-03 131447.png">

you can send an html file in the response using the following command:

```javascript
app.get('/' , (req , res) => {
    res.sendFile('path' , {root: __dirname});
});
```

Last thing of this chapter, is how to push your project on the github repository. You should know that any module of the `node.js` musn't be pushed on the repository. You should use the `.gitignore` file by creating one in your project folder, then add 
folder name of the folder you want to ignore in the `gitignore` file for example we want to ignore `node_modules` folder. Now you can push your project on the github cloud.

<hr>

## Chapter 2: MongoDB Connection Server

Now, you will learn how to connect with a database and the recommended `DBMS` or `Database Management System` for `Express.js` is the `MongoDB` with `No SQL`. You need to install the
`MongoDB Server` on your machine using the link in the above section that i mentioned before.

after installing the `MongoDB Server (Compass)` 
you should create a connection, i will name it
`backend` and the collection name is `backenddb`.
you will see something like that:

<img src="./../images/Screenshot 2023-11-03 144927.png">

Let's install a new package using `npm` which is called `mongoose` using the following command:

```
npm install mongoose
```

then we need to import the `mongoose` package as a module to use it in our project and instantiate it for making the connection object.

```javascript
import mongoose from 'mongoose';
```

next, i will connect with the database using `mongoose` object and identify a print statenment which makes sure that the connection with my database is `Successfull` using the following block of code:

```javascript
mongoose.connect('connection-path/database-name')
.then(() => {
    console.log('Here My Database is connceted to my project!');
    app.listen(port , () => {
        console.log(`Here My server is running on port ${port}!`);
    }); //[Q&A]
}).catch((error) => {
    console.log(`Error: ${error}`);
});
```

you may ask something, `why you add the listen action method of the server in the mongoose connection?`, and the answer is: `To make sure if the database connection failed, the server won't connect and makes end-user to not see the errors of it.` The catch method for handling the exceptions that will be sent to the `End-User` in the console. 

Eventually, you will see something like that:

<img src="./../images/Screenshot 2023-11-03 143131.png">

<hr>

## Chapter 3: Rest API & CRUD Operations

What is an `API`??
Its an abbreviation for `Application Programming Interface` which is defines a `route` for a specific type like `GET` , `POST` , `PUT` , `DELETE`, and so on... to do some operations on the database or simply the data structures that you use like `retrive some data` , `add some data` , `update some data` , `delete some data`
for exampe:

```javascript
app.get('/api/users' , async (req , res) => {
    try {
        const users = User.find({});
        res.json(users);
    }catch(error) { 
        res.status(400).send('Error: ' + err);

    }
});
```

the previous `API` defines a route called `/api/users` of type `GET ` which accept a `request` from the end-user and send him `asynchronously` all users as the `User` model which represents all users in the database and send a response contains all users array as a json object in the response `body`, but if it's failed the response will be the error occurred with a `status code` `400` and it means that is a `Bad Request`. 

Of course you ask for the definitions for these things above.

`Status code` : its a `number` that guides the developer or the user to know what's happen here in his request. If it's successful mention it ,or
if it's failed help him to know the error part and how to fix it.

i will live you a very useful website in the sources above to read about the `status codes` and its classifications for every response and every request.

Now, we need to install the `Postman` platform to test our apis without views or html pages. I also leave in the Sources Section above.

`Model` : Its a `Schema` Object created by the `mongoose` object to be a Mapping for the `Table` in the database as a javascript object instead of creating the table by the queries of the `DBMS`.

Our application will collect some data about the users like `full-name` , `email` , `phone-number` , `password` , and `profile-photo` and make the following operations on the database:

- Create User: `POST` api
- Update User: `PUT` api
- Read User: `GET` api
- Delete User: `DELETE` api

Now, we will use the `app` object to parse the request body as String and Array Objects as follows:

```javascript
app.use(express.urlencoded({extended: true}));
```

then we will create `models` folder in our project to create our model tables or `models` in it, and create a model or a `Schema` class for User Object which we store in the database using `mongoose` object as follows.

```javascript
import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema;

const userSchema = new Schema(
    {
        full_name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        phone_number: {type: String, required: true},
        profile_photo: {type: String, required: true}
    },{
        timeseries: true
    }
);
```

then you need to create your schema model and `export` it to use it in your project as a `module` using the commands:

```javascript
const User = mongoose.model('User' , userSchema);
module.exports = User;
//or
export default User;
```
I used the second syntax because the `error` occurred after importing my `model` as a `module`
and the error is:

```
SyntaxError: The requested module './TableCsv.js' does not provide an export named 'default'
```

after exporting the `model` we need to use it in the project by importing it as a `module` as follows:

```javascript
import User from './models/user.js';
// or
import User from './models/user';
```

We need to use `json` parsing method in the `express` object to parse the body into a json object as follows:

```javascript
app.use(express.json());
```

now, we can use that nodel in our project.
Let's add user object to the database by creating `POST` api as follows:

#### Create User API

```javascript
app.post('/api/user' , async (req , res) => {
    try {
        let userParams = req.body;
        if (await User.findOne({email: userParams.email})) {
            res.status(400).send(`The email ${userParams.email} already exist!`);
        }
        const user = new User(req.body);
        console.log(user);
        await user.save();
        res.send('The user has been added successfully!');
    }catch(error) {
        res.status(500).send(`Error: ${error}}`);
    }
});
```

the `await` and `async` for making sure that the transaction on the database is done. The user will be added successfully in the database like this:

<img src="./../images/Screenshot 2023-11-03 195504.png">

I used `findOne()` method to retrieve one object from the model based on specified data. The constructor of the `User` model generates user object using the bady parameters by matching each on to the `schema` variable. The `save()` method for storing the object in the table of the `users` in the database.

#### Get All Users API

```javascript
app.get('/api/users' , async (req , res) => {
    try {
        const users = await User.find({});
        if (users) {
            res.json(users);
        }else {
            res.send('There is no users in the database!');
        }
    }catch(error) {
        res.status(400).send(`Error: ${error}}`);
    }
});
```

The `find()` used for retrieving all objects of the `User` model 

now we can get users by their ids or emails as follows:

```javascript
app.get('/api/userid/:id' , async (req , res) => {
    try {
        const id = req.params.id; 
        const user = await User.findById(id); 
        if (user) {
            res.json(user);
        }else {
            res.send('user not found!');
        }
    }catch(error) {
        res.status(400).json({message: error.message});
    }
});
```

```javascript
app.get('/api/useremail/:email' , async (req , res) => {
    try {
        const email = req.params.email; 
        const user = await User.findOne({email: email}); 
        if (user) {
            res.json(user);
        }else {
            res.send('user not found!');
        }
    }catch(error) {
        res.status(400).json({message: error.message});
    }
});
```

ther is a builtin `findById(id)` method for retrieving single object from the database `model`.

#### Update User API

```javascript
app.put('/api/userupdate/:id' , async (req , res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id , body , {new: true});
        if (!user) {
            res.status(404).send('user not found!');
        }else {
            res.json(user);
        }
    }catch(error) {
        res.status(400).json({message: error.message} + ' may be user not found!');
    }
});
```

the `findByIdAndUpdate(id , data , status of command)` is a builtin method for retrieving a single object from the database `model` and update it by the `new data`, and then return that updated object after save it in the database
`model`.

#### Delete User API

```javascript
app.delete('/api/deleteuser/:id' , async (req , res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).send('user not found!');
        }else {
            res.send('user has been deleted successfully!');
        }
    }catch(error) {
        res.status(400).json({message: error.message} + ' may be user not found!');
    }
});
```

the `findByIdAndDelete(id)` method is a builtin method that retrieving user by its id and deleted from the database `model` and return that deleted object if its found.

<hr>