import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  try {
    const {
      fullname,
      email,
      password,
      role,
      degree,
      license_number,
      specialization,
      years_of_experience,
      degree_proof_url
    } = req.body;

    // 1️⃣ Check if email exists
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Insert into users
    const [userResult] = await db.query(
      "INSERT INTO users (fullname,email,password,role) VALUES (?,?,?,?)",
      [fullname, email, hashedPassword, role]
    );

    const userId = userResult.insertId;

    // 4️⃣ If role is doctor, insert into doctors table
    if (role === "doctor") {
       console.log("Doctor insert block executed");
      await db.query(
        `INSERT INTO doctors 
        (user_id, degree, license_number, specialization, years_of_experience, degree_proof_url, verification_status)
        VALUES (?,?,?,?,?,?,?)`,
        [
          userId,
          degree,
          license_number,
          specialization,
          years_of_experience,
          degree_proof_url,
          "pending"
        ]
      );
    }

    // 5️⃣ If role is patient, insert into patients table
    if (role === "patient") {
      await db.query(
        "INSERT INTO patients (user_id, medical_history_summary) VALUES (?,?)",
        [userId, null]
      );
    }

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ================= LOGIN =================
export const login = async (req, res) => {
  try {

    
    const { email, password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Entered password:", password);
    console.log("Stored hash:", user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};