import express from 'express';
import mongoose from 'mongoose';
import User from './models/user.js';

const app = express();
const port = 1000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/' , (req , res) => {
    res.send('Hello, World');
});

app.get('/api/users' , async (req , res) => {
    try {
        const users = await User.find();
        if (users) {
            res.json(users);
        }else {
            res.send('There is no users in the database!');
        }
    }catch(error) {
        res.status(400).send(`Error: ${error}}`);
    }
});

app.get('/api/userbyid/:id' , async (req , res) => {
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

app.get('/api/userbyemail/:email' , async (req , res) => {
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

app.post('/api/adduser' , async (req , res) => {
    try {
        let userParams = req.body;
        if (await User.findOne({email: userParams.email})) {
            res.status(400).send(`The email ${userParams.email} already exist!`);
        }
        const user = new User(req.body);
        console.log(user);
        await user.save();
        res.status(201).send('The user has been added successfully!');
    }catch(error) {
        res.status(400).json({message: error.message});
    }
});

app.put('/api/updateuser/:id' , async (req , res) => {
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



mongoose.set("strictQuery" , false);
mongoose.connect('mongodb://localhost:27017/backenddb')
.then(() => {
    console.log('Here My Database is connceted to my project');
    app.listen(port , () => {
        console.log(`Here My server is running on port ${port}!`);
    });
}).catch((error) => {
    console.log(`Error: ${error}`);
});

