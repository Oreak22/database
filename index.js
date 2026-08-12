const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const mongoose = require("mongoose");
const studentModel = require("./models/student.model");
// const studentModel = require("./models/student.model");
const mongoDB_URI = process.env.MONGODB_URI;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("tan o wa ni be");
});

app.post("/postit", async (req, res) => {
  console.log(req.body);

  try {
    const newStudent = new studentModel({
      first_name: req.body.first_name,
      last_name: req.body.lastName,
      email: req.body.email,
      student_id: req.body.student_id,
      password: req.body.password,
    });

    const savedStudent = await newStudent.save();
    console.log(savedStudent);
    res.status(200).json({ message: "student record saved", savedStudent });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "something went wrong" });
  }
});

app.get("/getstudent", async (req, res) => {
  try {
    const allStudents = await studentModel.find();
    console.log(allStudents);
    res.status(200).json({ message: "all record fetched", allStudents });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "something went wrong" });
  }
});

app.get("/getbyid/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const student = await studentModel.findById(req.params.id);
    res.status(200).json({ message: " record fetched", student });
  } catch (err) {
    console.log(err);
  }
});

app.put("/update", async (req, res) => {
  try {
    const result = await studentModel.findOneAndUpdate(
      {
        email: req.body.email,
      },
      req.body,
    );

    res.json({ message: "record updated", result });
  } catch (err) {
    console.log(err);
    res.json({ message: "something went wrong" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const result = await studentModel.findByIdAndDelete(req.params.id);
    res.json({ message: "record deleted" });
  } catch (err) {
    console.log(err);
    res.json({ message: "something went wrong" });
  }
});

mongoose
  .connect(mongoDB_URI)
  .then(() => {
    console.log("we have connected ");
  })
  .catch((err) => {
    console.log("what is going on here", err);
  });

app.listen(port, () => {
  console.log("emi ni, mo ti de tan");
});
