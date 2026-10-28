import express from "express";

const app = express();
const port = 4000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        // Request games from the separate API application
        const resource = "http://localhost:3000/api/games";
        const response = await fetch(resource);

        if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
        }
        const games = await response.json();
        res.render("games.ejs", { games });
    } catch (error) {
        console.error("Error retrieving games:", error);
        res.status(502).send(
            "Unable to retrieve the game catalog. Please try again later."
        );
    }
});

app.listen(port, () => {
    console.log(`Server started listening on port ${port}`);
});