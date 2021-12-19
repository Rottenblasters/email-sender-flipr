if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Exports
const express = require("express");
const path = require("path");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
require("./routes/api")(app);

// Route Error handler
app.use((req, res) => {
  res.status(404).send("Invalid Request");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
