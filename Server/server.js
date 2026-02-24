import express from 'express';
import authRoutes from "./routes/authRoute.js";
import { verifyToken } from "./middlewares/verifyToken.js";
import { verifyRole } from "./middlewares/verifyRole.js";
import adminRoutes from "./routes/adminRoutes.js";

import db from "./config/db.js"
import dotenv from 'dotenv'
import cors from "cors"

dotenv.config();

const app=express();

const PORT=process.env.PORT||8080;



app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);


(async () => {
  try {
    const [rows] = await db.query("SELECT 1");
    console.log("Database connected successfully ✅");
  } catch (error) {
    console.error("Database connection failed ❌", error);
  }
})();



app.get('/',(req,res)=>{
    res.send('Hello World! Your server is running.')
})

app.get(
  "/admin-dashboard",
  verifyToken,
  verifyRole("super_admin"),
  (req, res) => {
    res.json({ message: "Welcome Super Admin 👑" });
  }
);

app.get(
  "/doctor-dashboard",
  verifyToken,
  verifyRole("doctor"),
  async (req, res) => {

    const [doctor] = await db.query(
      "SELECT verification_status FROM doctors WHERE user_id = ?",
      [req.user.id]
    );

    if (doctor[0].verification_status !== "approved") {
      return res.status(403).json({
        message: "Doctor not verified yet"
      });
    }

    res.json({ message: "Welcome Verified Doctor 🩺" });
  }
);

app.get(
  "/patient-dashboard",
  verifyToken,
  verifyRole("patient"),
  (req, res) => {
    res.json({ message: "Welcome Patient 👤" });
  }
);


app.listen(PORT, () => {
  console.log(`Server is vibrating on http://localhost:${PORT}`);
});