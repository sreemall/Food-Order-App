const express = require ("express");
const {SERVER_PORT} = require ("./app/constants");
const categoryRouter = require ("./app/routes/categoryRouter");
const cuisineRouter = require ("./app/routes/cuisineRouter");
const restaurantRouter = require ("./app/routes/restaurantRouter");
const userRouter = require ("./app/routes/userRouter");
const connectDatabase = require ("./app/database/databaseInit");

const app = express ();

var cors = require("cors");

app.use(cors());

connectDatabase ();

app.use (express.json ());

// app.get ("/api/v1/", (req, res) => {
//     console.log ("hello Server");
//     res.send ("Hello Server");
   
// });
// app.use ("/api/v1/", getAllCategories);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/cuisines", cuisineRouter);
app.use("/api/v1/restaurants", restaurantRouter);
// app.get ("/api/v1/cuisines", (req, res) => {
//     console.log ("hello Server api/v1/categories" , req.path);
//     res.send (`Hello Server api/v1/categories ${req.path}`);
// })

app.use((req, res, next) => {
    console.log ("Sorry, can't find that!", req.path);
    // res.status(404).send("Sorry, can't find that!");
    next ();
  });

app.listen (SERVER_PORT, () => {
    console.log ("999 Server is listening");
})