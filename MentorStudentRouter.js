const express = require('express');
const Mentor = require("./mentorSchema");
const Student = require("./studentSchema")

const router = express.Router();

//Create mentor API
router.post("/mentors", async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.json(mentor);
  } catch (error) {
    console.error("Error creating mentor", error);
    res.status(500).json({ error: "Faild to create mentor" });
  }
});
//Create Student API
router.post("/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (error) {
    console.error("Error Creating Student", error);
    res.status(500).json({ error: "Fails to Create Student" });
  }
});
//assign a student to a mentor
router.put("/students/:studentId/assign-mentor/:mentorId", async (req, res) => {
  try {
    const { studentId, mentorId } = req.params;

    const student = await Student.findByIdAndUpdate(
      studentId,
      { mentor: mentorId },
      { new: true }
    );
    res.json(student);
  } catch (error) {
    console.error("Error assigning mentor to student", error);
    res.status(500).json({ error: "Faild to assign mentor to student" });
  }
});
//add multiple students to a mentor.
router.put('/mentors/:mentorId/add-students', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const { studentIds } = req.body;

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not Found" });
    }

    const students = await Student.updateMany(
      { _id: { $in: studentIds }, mentor: { $ne: mentorId } },
      { mentor: mentorId }
    );
    res.json(students);
  } catch (error) {
    console.error("Error adding students to mentor", error);
    res.status(500).json({ error: "Faild to add Students to mentor" });

  }
});
//assign or change the mentor for a particular student.
router.put('/students/:studentId/assign-mentor/:mentorId',
  async (req, res) => {
    try {
      const { studentId, mentorId } = req.params;
      const student = await Student.findByIdAndUpdate(studentId,
        { mentor: mentorId }, { new: true });
      res.json(student);
    } catch (error) {
      console.error('Error Assigning/changing mentor for student', error);
      res.status(500).json({ error: "Fails to assign/change mentor for students" });
    }
  });
//show all students for a particular mentor.
router.get('/mentors/:mentorId/students', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const students = await Student.find({ mentor: mentorId });
    res.json(students);

  } catch (error) {
    console.error("Error fetching students for mentor", error);
    res.status(500).json({ error: "Faild to fetch students for mentor" });
  }
});
//show the previously assigned mentor for a particular student.
router.get('/students/:studentId/previous-mentor', async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate('mentor', 'name');
    const PreviousMentor = student.mentor ? student.mentor.name : "No Previous mentor assigned";
    res.json(PreviousMentor);

  } catch (error) {
    console.error("Error to fetch Previous mentor for student", error);
    res.status(500).json({ error: "Faild to fetch previous mentor for student" });
  }
});

module.exports = router;