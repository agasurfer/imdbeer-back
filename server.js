require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const Bstyles = require("./models/Bstyles");
const Comments = require("./models/Comments")


//Middlewares

app.use(express.json());

const corsOptions = {
    origin: ["http://localhost:5173", "https://imdbeer-front.vercel.app"], 
    methods: "GET,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

//Connection to mongoDB ATLAS

mongoose.connect(process.env.ATLAS_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
    res.send(process.env.TEST);
});

//Routes
app.get("/styles", async (req, res) => {
    try {
        const styles = await Bstyles.find(); 
        res.json(styles); 
    } catch (err) {
        console.error("Error fetching styles:", err.message);
        res.status(500).json({ err: err.message });
    }
});

app.get("/styles/:id", async (req, res) => {
    try {
        const styleId = req.params.id; 
        const style = await Bstyles.findById(styleId); 

        if (!style) {
            return res.status(404).json({ error: "Style not found" }); 
        }

        res.json(style); 
    } catch (err) {
        console.error("Error fetching style by ID:", err.message);

        // Checks if error is due to invalid id format
        if (err.kind === "ObjectId") {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Comment posting

app.post("/styles/:id/comments", async (req, res) => {
    try {
        const { id: beerId } = req.params; 
        const { username, comment } = req.body; 
        
        // Validate request data
        if (!username || !comment) {
            return res.status(400).json({ error: "Username and comment are required" });
        }

        // Ensure the beer exists
        const beer = await Bstyles.findById(beerId);
        if (!beer) {
            return res.status(404).json({ error: "Beer not found" });
        }

        // Create and save the comment
        const newComment = new Comments({
            username,
            comment,
            beerId, // Use the beerId from the route
        });

        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        console.error("Error creating comment:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//GET to fetch comments for a specific beer
app.get("/styles/:id/comments", async (req, res) => {
    try {
        const { id: beerId } = req.params;

        // Ensure the beer exists
        const beer = await Bstyles.findById(beerId);
        if (!beer) {
            return res.status(404).json({ error: "Beer not found" });
        }

        // Fetch comments linked to the beer
        const comments = await Comments.find({ beerId });
        res.json(comments);
    } catch (err) {
        console.error("Error fetching comments:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Delete a comment

app.delete("/styles/:id/comments", async (req, res) => {
    try {
        const { id: beerId } = req.params;

        // Ensure the beer exists
        const beer = await Bstyles.findById(beerId);
        if (!beer) {
            return res.status(404).json({ error: "Beer not found" });
        }

        // Fetch comments linked to the beer
        const comments = await Comments.deleteOne({ beerId });
        res.json(comments);
    } catch (err) {
        console.error("Error deleting comments:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



//Listening

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`);
    
})