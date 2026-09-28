const express = require("express");
const mysql = require("mysql");
const path = require("path");

const app = express();
const PORT = 3000;


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// ==========================================
// SERVE FRONTEND FILES
// ==========================================

// server.js is inside backend/
// .. means the main CHEFFY folder

app.use(express.static(path.join(__dirname, "..")));


// ==========================================
// MYSQL CONNECTION
// ==========================================

const db = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "",

    database: "cheffy"

});


// ==========================================
// CONNECT TO MYSQL
// ==========================================

db.connect(function (error) {

    if (error) {

        console.log("❌ MySQL connection failed!");
        console.log(error.message);

        return;
    }

    console.log("✅ MySQL connected successfully!");

});


// ==========================================
// HOME PAGE
// ==========================================

app.get("/", function (req, res) {

    res.sendFile(
        path.join(__dirname, "..", "index.html")
    );

});


// ==========================================
// REGISTER USER
// ==========================================

app.post("/register", function (req, res) {

    console.log("=================================");
    console.log("Registration request received");
    console.log(req.body);
    console.log("=================================");


    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;


    // ==========================================
    // CHECK REQUIRED FIELDS
    // ==========================================

    if (
        !firstName ||
        !lastName ||
        !email ||
        !username ||
        !password
    ) {

        return res.status(400).json({

            success: false,

            message: "Please fill all required fields."

        });

    }


    // ==========================================
    // CHECK USERNAME
    // ==========================================

    const checkUsername =
        "SELECT * FROM users WHERE username = ?";


    db.query(
        checkUsername,
        [username],
        function (error, results) {

            if (error) {

                console.log(
                    "❌ Username check error:",
                    error.message
                );

                return res.status(500).json({

                    success: false,

                    message: "Database error."

                });

            }


            // ==========================================
            // USERNAME ALREADY EXISTS
            // ==========================================

            if (results.length > 0) {

                return res.status(409).json({

                    success: false,

                    message: "Username already exists."

                });

            }


            // ==========================================
            // INSERT USER
            // ==========================================

            const sql = `
                INSERT INTO users
                (
                    first_name,
                    last_name,
                    email,
                    username,
                    password
                )
                VALUES (?, ?, ?, ?, ?)
            `;


            db.query(

                sql,

                [
                    firstName,
                    lastName,
                    email,
                    username,
                    password
                ],

                function (error, result) {

                    if (error) {

                        console.log(
                            "❌ Registration database error:",
                            error.message
                        );

                        return res.status(500).json({

                            success: false,

                            message:
                                "Unable to register user."

                        });

                    }


                    console.log(
                        "✅ User registered successfully!"
                    );

                    console.log(
                        "User ID:",
                        result.insertId
                    );


                    return res.status(201).json({

                        success: true,

                        message:
                            "Registration successful!"

                    });

                }

            );

        }

    );

});


// ==========================================
// LOGIN USER
// ==========================================

app.post("/login", function (req, res) {

    console.log("=================================");
    console.log("Login request received");
    console.log(req.body);
    console.log("=================================");


    const username = req.body.username;
    const password = req.body.password;


    // ==========================================
    // CHECK FIELDS
    // ==========================================

    if (!username || !password) {

        return res.status(400).json({

            success: false,

            message:
                "Please enter username and password."

        });

    }


    // ==========================================
    // CHECK LOGIN
    // ==========================================

    const sql = `
        SELECT
            id,
            first_name,
            last_name,
            email,
            username,
            password
        FROM users
        WHERE username = ?
        AND password = ?
    `;


    db.query(

        sql,

        [
            username,
            password
        ],

        function (error, results) {

            if (error) {

                console.log(
                    "❌ Login database error:",
                    error.message
                );

                return res.status(500).json({

                    success: false,

                    message: "Database error."

                });

            }


            // ==========================================
            // INVALID LOGIN
            // ==========================================

            if (results.length === 0) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Invalid username or password."

                });

            }


            // ==========================================
            // LOGIN SUCCESS
            // ==========================================

            const user = results[0];


            console.log(
                "✅ Login successful:",
                user.username
            );


            return res.json({

                success: true,

                message: "Login successful!",

                user: {

                    id: user.id,

                    firstName: user.first_name,

                    lastName: user.last_name,

                    email: user.email,

                    username: user.username

                }

            });

        }

    );

});


// ==========================================
// LOGOUT
// ==========================================

app.post("/logout", function (req, res) {

    return res.json({

        success: true,

        message: "Logged out successfully."

    });

});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, function () {

    console.log("");
    console.log("=================================");
    console.log("🚀 CHEFFY SERVER STARTED");
    console.log("=================================");
    console.log(
        `Server running on port ${PORT}`
    );
    console.log("=================================");
    console.log("");

});