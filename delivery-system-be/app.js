const express = require("express");

const deliveriesRoutes = require("./routes/deliveriesRoutes");

const cors = require("cors");

const app = express();

//Middleware
app.use(cors());

// gives you acces to the req.body as JSON
app.use(express.json());

//Routes
app.use("/deliveries", deliveriesRoutes);

//Path Not Found middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

const PORT = 8080;
app.listen(PORT, () =>
  console.log(`The application runs on localhost:${PORT}`)
);
