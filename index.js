const express = require("express");
 const db = require("./db.js")
const MentorStudentRouter = require("./MentorStudentRouter.js"); 

const app = express();

app.use(express.json());

app.use("/mentors", MentorStudentRouter);

app.listen(3030, () => console.log("server running in localhost:3030"));
