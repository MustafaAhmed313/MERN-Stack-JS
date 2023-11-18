import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/user.js';
import Job from './models/job.js';
import JobApplied from './models/jobApplied.js';

const app = express();
const port = 1000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/' , (req , res) => {
    res.send('Hello, World');
});

// Users API PHASE

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
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password , salt);
        const user = new User(req.body);
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
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password , salt);
        }
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


// Job API PHASE

app.get('/api/jobs' , async (req , res) => {
    try {
        const jobs = await Job.find();
        if (jobs) {
            res.json(jobs);
        }else { 
            res.send('There is no jobs in the database!');
        }
    }catch(error) {
        res.status(400).send(`Error: ${error}}`);
    }
});

app.get('/api/jobbyid/:id' , async (req , res) => {
    try {
        const id = req.params.id; 
        const job = await Job.findById(id); 
        if (job) {
            res.json(job);
        }else {
            res.send('job not found!');
        }
    }catch(error) {
        res.status(400).json({message: error.message});
    }
});

app.get('/api/jobbytitle/:title' , async (req , res) => {
    try {
        const title = req.params.title; 
        const job = await Job.findOne({title: title}); 
        if (job) {
            res.json(job);
        }else {
            res.send('job not found!');
        }
    }catch(error) {
        res.status(400).json({message: error.message});
    }
});

app.post('/api/addjob' , async (req , res) => {
    try {
        const {
            title
            , description
            , experience
            , skills
            , deadline 
        } = req.body;
        let deadline11 = Date.parse(deadline);           
        const job = {};
        job.title = title;
        job.description = description;
        job.experience = experience;
        job.skills = skills;
        job.deadline = deadline11;
        
        const job1 = Job(job);

        await job1.save();
        res.status(201).send('The job has been added successfully!');
    }catch(error) {
        res.status(400).json({message: error.message});
    }
});

app.put('/api/updatejob/:id' , async (req , res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const job = await Job.findByIdAndUpdate(id , body , {new: true});
        if (!job) {
            res.status(404).send('job not found!');
        }else {
            res.json(job);
        }
    }catch(error) {
        res.status(400).json({message: error.message} + ' may be job not found!');
    }
});

app.delete('/api/deletejob/:id' , async (req , res) => {
    try {
        const id = req.params.id;
        const job = await Job.findByIdAndDelete(id);
        if (!job) {
            res.status(404).send('job not found!');
        }else {
            res.send('job has been deleted successfully!');
        }
    }catch(error) {
        res.status(400).json({message: error.message} + ' may be job not found!');
    }
});

// Job Applied PHASE

app.post('/api/addappliedjobuser/:job_id/:user_id' , async (req , res) => {
    try {
        const jobid = req.params.job_id;
        const userid = req.params.user_id;
        const job = Job.findById(jobid);
        if (job) {
            if (Date.now < Date.parse(job.deadline)) {
                const jobApplication = new JobApplied({user_id: userid,  job_id: jobid});
                await jobApplication.save();
                res.send('the applied job has been added successfully!');
            }else {
                res.send('the job applied passed the deadline!');
            }
        }else {
            res.send('there is no job with that id!');
        }
    }catch(error) {
        res.status(400).json({message: error.message});
    }
});

app.delete('/api/deleteappliedjob/:job_id/:user_id' , async (req , res) => {
    try {
        const jobid = req.params.job_id
        const userid = req.params.user_id;
        const AppliedUserJob = await JobApplied.findOne({user_id: userid ,job_id: jobid});
        if (AppliedUserJob) {
            await AppliedUserJob.deleteOne();
            res.send('the job application has been deleted successfully!');
        }else {
            res.status(404).send('object not found!');
        }
    }catch(error) {
        res.status(400).json({message: error.message});
    }
});

app.get('/api/appliedjobsforuser/:user_id' , async (req , res) => {
    try {
        const id = req.params.user_id;
        const jobs = await JobApplied.find({user_id: id});
        if (jobs) {
            res.json(jobs);
        }else{
            res.status(404).send(`There is no applied jobs for user_id: ${id}`);
        }
    }catch(error) {
        res.status(400).json({message: error.message});
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

