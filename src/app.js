const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

app.use("/login", (req, res) => {
    res.send("I am login page");
})

app.use("/signup", (req, res) => {
    res.send("I am signup page")
})

app.use("/", (req, res) => {
    res.send("I am express server");
});


app.listen(PORT, () => {
    console.log("App is running in the PORT ", PORT);
})