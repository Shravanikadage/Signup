const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require('./models/Employee');
const cloudinary = require('./cloudinaryConfig');  // Import the cd 
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

// Middleware
app.use(cors(
    {
        origin: ["https://signup-client-beryl.vercel.app"],
        methods: ["POST","GET"],
        credentials: true
    }
));
app.use(express.json());

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Set unique filename
    }
});

const upload = multer({ storage: storage });

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to Server');
});

// MongoDB Connection
mongoose.connect("mongodb+srv://shravanikadage:123@cluster0.wigjk.mongodb.net/employee?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

// Register Route with Media Upload
app.post('/register', upload.single('profilePic'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Profile picture is required" });
    }

    // Upload image to Cloudinary
    cloudinary.uploader.upload(req.file.path)
        .then(result => {
            // Save the user along with the image URL
            const { name, email, password } = req.body;
            const profilePicUrl = result.secure_url;

            EmployeeModel.create({ name, email, password, profilePic: profilePicUrl })
                .then(employee => res.json(employee))
                .catch(err => res.status(500).json({ error: "Failed to create user", details: err }));
        })
        .catch(err => {
            res.status(500).json({ error: "Image upload failed", details: err });
        });
});

// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json("Success");
            } else {
                res.json("Password is incorrect");
            }
        } else {
            res.json("You are not Registered");
        }
    })
    .catch(err => res.json(err));
});

// Start Server
app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
});
