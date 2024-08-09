const mongoose = require("mongoose");
const Application = require('../models/Application');

const connectToMongoDB= async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        const count = await Application.countDocuments();
        if (count === 0) {
            await Application.insertMany([
        {
          "candidateName": "Alice Johnson",
          "jobTitle": "Software Engineer",
          "applicationDate": "2024-08-01T12:00:00Z",
          "status": "new",
          "resume": "alice_johnson_resume.pdf",
          "coverLetter": "alice_johnson_cover_letter.pdf",
          "candidateEmail": "alice.johnson@example.com"
        },
        {
          "candidateName": "Bob Smith",
          "jobTitle": "Product Manager",
          "applicationDate": "2024-08-02T14:30:00Z",
          "status": "shortlisted",
          "resume": "bob_smith_resume.pdf",
          "coverLetter": "bob_smith_cover_letter.pdf",
          "candidateEmail": "bob.smith@example.com"
        },
        {
          "candidateName": "Carol White",
          "jobTitle": "UI/UX Designer",
          "applicationDate": "2024-08-03T09:15:00Z",
          "status": "rejected",
          "resume": "carol_white_resume.pdf",
          "coverLetter": "carol_white_cover_letter.pdf",
          "candidateEmail": "carol.white@example.com"
        },
        {
          "candidateName": "David Brown",
          "jobTitle": "Data Scientist",
          "applicationDate": "2024-08-04T16:45:00Z",
          "status": "interview scheduled",
          "resume": "david_brown_resume.pdf",
          "coverLetter": "david_brown_cover_letter.pdf",
          "candidateEmail": "david.brown@example.com"
        },
        {
          "candidateName": "Emily Davis",
          "jobTitle": "Marketing Specialist",
          "applicationDate": "2024-08-05T11:00:00Z",
          "status": "new",
          "resume": "emily_davis_resume.pdf",
          "coverLetter": "emily_davis_cover_letter.pdf",
          "candidateEmail": "emily.davis@example.com"
        },
        {
          "candidateName": "Frank Harris",
          "jobTitle": "Business Analyst",
          "applicationDate": "2024-08-06T08:20:00Z",
          "status": "shortlisted",
          "resume": "frank_harris_resume.pdf",
          "coverLetter": "frank_harris_cover_letter.pdf",
          "candidateEmail": "frank.harris@example.com"
        },
        {
          "candidateName": "Grace Lee",
          "jobTitle": "System Administrator",
          "applicationDate": "2024-08-07T13:30:00Z",
          "status": "new",
          "resume": "grace_lee_resume.pdf",
          "coverLetter": "grace_lee_cover_letter.pdf",
          "candidateEmail": "grace.lee@example.com"
        },
        {
          "candidateName": "Henry Walker",
          "jobTitle": "Full Stack Developer",
          "applicationDate": "2024-08-08T15:45:00Z",
          "status": "interview scheduled",
          "resume": "henry_walker_resume.pdf",
          "coverLetter": "henry_walker_cover_letter.pdf",
          "candidateEmail": "henry.walker@example.com"
        }
        ]);
        }   
    } catch (error) {
        console.log("Error connecting to MongoDB",error.message);
    }
}

module.exports= {connectToMongoDB};