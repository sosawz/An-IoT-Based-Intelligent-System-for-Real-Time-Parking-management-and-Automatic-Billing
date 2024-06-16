const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "SmartParking",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    throw err;
  }
  console.log("MySQL Connected");
});

// Register
app.post("/register", (req, res) => {
  const { FirstName, LastName, Email, Password } = req.body;
  const hashedPassword = bcrypt.hashSync(Password, 8);

  const sql =
    "INSERT INTO users (FirstName, LastName, Email, Password) VALUES (?, ?, ?, ?)";
  db.query(sql, [FirstName, LastName, Email, hashedPassword], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      if (err.code === "ER_DUP_ENTRY") {
        res.status(409).send({ message: "Email already exists" });
      } else {
        res.status(500).send({ message: "Database error" });
      }
    } else {
      res.send({ message: "Account Created Successfully" });
    }
  });
});

// Check Email
app.post("/checkEmail", (req, res) => {
  const { Email } = req.body;

  db.query("SELECT * FROM users WHERE Email = ?", [Email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.length > 0) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE Email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).send("Server error");
    if (results.length === 0) return res.status(400).send("No user found");

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.Password);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.UserID }, "secret", { expiresIn: 86400 });
    res.status(200).send({ auth: true, token });
  });
});

// Middleware for verifying token
const authMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided" });

  jwt.verify(token, "secret", (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    req.userId = decoded.id;
    console.log("UserID:", req.userId);
    next();
  });
};

// Get user cars
app.get("/cars", authMiddleware, (req, res) => {
  const userId = req.userId;
  const sql = "SELECT * FROM cars WHERE UserID = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).send("Server error");
    res.status(200).send(results);
  });
});

// Add car
app.post("/addcar", authMiddleware, (req, res) => {
  const { licensePlates, brand, color } = req.body;
  const userId = req.userId;
  const sql =
    "INSERT INTO cars (LicensePlate, Brand, Color, UserID) VALUES (?,?,?,?)";
  db.query(sql, [licensePlates, brand, color, userId], (err, result) => {
    if (err) return res.status(500).send("Server error");
    res.status(200).send("Car added");
  });
});

// Update car
app.put("/cars/:id", authMiddleware, (req, res) => {
  const { licensePlates, brand, color } = req.body;
  const carId = req.params.id;
  const sql =
    "UPDATE cars SET LicensePlate = ?, Brand = ?, Color = ? WHERE CarID= ?";
  db.query(sql, [licensePlates, brand, color, carId], (err, result) => {
    if (err) return res.status(500).send("Server error");
    res.status(200).send("Car updated");
  });
});

// Delete car
app.delete('/cars/:id', authMiddleware, (req, res) => {
    const carId = req.params.id;
    const sql = "DELETE FROM cars WHERE CarID = ?";
    db.query(sql, [carId], (err, result) => {
        if (err) return res.status(500).send('Server error');
        res.status(200).send('Car deleted')
    })
})

// Get detection records
app.get("/detectionrecords", authMiddleware, (req, res) => {
  const userId = req.userId;
  const sql = "SELECT * FROM detectionrecords WHERE LicensePlate IN (SELECT LicensePlate FROM cars WHERE UserID = ?)";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).send("Server error");
    res.status(200).send(results);
  });
});

// Calculate charge
const calculateCharge = (entryTime, exitTime) => {
  const entry = new Date(entryTime);
  const exit = new Date(exitTime);
  const duration = (exit - entry) / (1000 * 60 * 60); // duration in hours
  const rate = 5; // Example rate per hour
  return duration * rate;
};

// Get payment details
app.get("/payment/:recordId", authMiddleware, (req, res) => {
  const recordId = req.params.recordId;
  const sql = "SELECT * FROM detectionrecords WHERE RecordID = ?";
  db.query(sql, [recordId], (err, results) => {
    if (err) return res.status(500).send("Server error");
    if (results.length === 0) return res.status(404).send("Record not found");

    const record = results[0];
    const charge = calculateCharge(record.DetectionTime, record.ExitTime);
    res.status(200).send({ record, charge });
  });
});

app.listen(8081, () => {
  console.log("Server running on port 8081");
});
