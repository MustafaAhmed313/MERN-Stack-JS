import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema;

const jobSchema = new Schema(
    {
        title: {type: String , required: true},
        description: {type: String , required: true , unique: true},
        experience: {type: String , required: true},
        skills: {type: [] , required: true},
        deadline: {type: Date , required: true} //  12387198 timestemp new Date(1970/01/01) 
    },{
        timeseries: true
    }
);

const Job = mongoose.model('Job' , jobSchema);

export default Job;