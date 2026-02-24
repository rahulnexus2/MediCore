import db from "../config/db.js";

// 1️⃣ Get all pending doctors
export const getPendingDoctors = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT d.id, u.fullname, u.email, d.degree, d.specialization, d.verification_status
       FROM doctors d
       JOIN users u ON d.user_id = u.id
       WHERE d.verification_status = 'pending'`
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// 2️⃣ Approve or Reject doctor
export const updateDoctorStatus = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const { status } = req.body; // approved OR rejected

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    await db.query(
      "UPDATE doctors SET verification_status = ? WHERE id = ?",
      [status, doctorId]
    );

    res.json({ message: `Doctor ${status} successfully` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};