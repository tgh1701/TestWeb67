const express = require("express");
const {connectToDb, db} = require("./db");
const {
  getInventory,
  getUsers,
  createOrder,
} = require("./controller/dataController.js");
const {login} = require("./controller/userController.js");
const {verifyToken} = require("./middlewares/auth.js");
const app = express();

app.use(express.json());

app.listen(8000, async () => {
  console.log("App is running at 8000");
  try {
    await connectToDb();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
});

app.post("/api/login", login);
app.get("/api/inventory", verifyToken, getInventory);
app.get("/api/users", verifyToken, getUsers);
app.post("/api/orders", verifyToken, createOrder);
