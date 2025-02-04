const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require('./middleware/errorMiddleware')
require("dotenv").config();

const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Unsplash API!" });
});

app.use("/api/photos", require("./routes/photoRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/favorites", require("./routes/favoritesRoutes"));

app.use(errorHandler)

app.listen(port, () => console.log(`server is ronning on port ${port}`));
