import express from 'express';

import db from "./config/db.js"


const app=express();

const PORT=8080;


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


app.listen(PORT, () => {
  console.log(`Server is vibrating on http://localhost:${PORT}`);
});