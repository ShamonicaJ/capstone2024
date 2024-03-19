const express = require("express");
const cors = require("cors");
const { searchRecipes } = require("./recipe-api");
const dotenv = require("dotenv");

dotenv.config(); 

const app = express();

app.use(express.json());
app.use(cors()); 

app.get("/api/recipes/search", async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const page = parseInt(req.query.page);
    try {
        const results = await searchRecipes(searchTerm, page);
        return res.json(results);
    } catch (error) {
        console.error("Error searching recipes:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

const port = process.env.PORT || 4000; // Use port from environment variable or default to 4000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
