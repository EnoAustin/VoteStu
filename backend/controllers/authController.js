const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerStudent = async (req, res) => {
  try {
    const { firstName, lastName, matricule, email } = req.body;

    // Here we're checking students existence
    const existingStudent = await Student.findOne({ matricule });

    if (existingStudent) {
      return res.status(400).json({ message: "This student already exists" });
    }

    // If the student doesn't exist we create a student
    const student = new Student({
      firstName,
      lastName,
      matricule,
      email,
      password: "notset",
      profilePhoto: req.file ? req.file.path : "",
      isActivated: false,
    });

    await student.save();
    res.status(201).json({
      message: "Student registered successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const activateAccount = async (req, res) => {
  try {
    const { matricule, password, confirmPassword } = req.body;

    // Let's verify if the passwords user wrote are thesame
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    // Here we're checking to see if student exists in the database
    const student = await Student.findOne({ matricule });
    if (!student) {
      return res.status(404).json({ message: "Student doesn't exist" });
    }
    if (student.isActivated) {
      return res.status(400).json({ message: "Account already Activated" });
    }
    // Let's hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Let's update student
    student.password = hashedPassword;
    student.isActivated = true;
    await student.save();

    res.status(200).json({ message: "Account Activated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const loginStudent = async (req, res) => {
  try {
    const { matricule, password } = req.body;

    // We'll find a student
    const student = await Student.findOne({ matricule });
    if (!student) {
      return res.status(404).json({ message: "Student not foung" });
    }

    // Verifying if account has been activated
    if (!student.isActivated) {
      return res.status(400).json({ message: "Please activate your account" });
    }

    // Comparing password entered by student
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Creating Json Web Token
    const token = jwt.sign(
      { id: student._id, matricule: student.matricule },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );
    res.status(200).json({
      message: "Login successful",
      token,
      student: {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        matricule: student.matricule,
        hasVoted: student.hasVoted,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerStudent, activateAccount, loginStudent };
