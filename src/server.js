const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(bodyParser.json());

// In-Memory Database
const db = {
  users: [],
  products: [],
  orders: [],
};

// Attach database to the request
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Use Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Start Server
const PORT = 4002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
