import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema;

const jobAppliedSchema = new Schema(
    {
        user_id: {type: mongoose.Schema.Types.ObjectId , required: true},
        job_id: {type: mongoose.Schema.Types.ObjectId , required: true},
    },{
        timeseries: true
    }
);

const JobApplied = mongoose.model('JobApplied' , jobAppliedSchema);

export default JobApplied;