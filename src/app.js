const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/user", (req, res) => {
    res.send({
        name: "Shubham Rawat",
        class: "12th"
    });
});

app.post("/user", (req, res) => {
    res.send({
        name: "Aman",
        class: "8th"
    })
});

app.put("/user/:id", (req, res) => {
    const qurey = req.query;
    const path = req.path;
    const params = req.params;
    res.send({
        name: "Put Call",
        qurey,
        path,
        params,
    })

    // PUT: http://localhost:3000/user/1?name=What

    // {
    //     "name": "Put Call",
    //     "qurey": {
    //         "name": "What"
    //     },
    //     "path": "/user/1",
    //     "params": {
    //         "id": "1"
    //     }
    // }
})

// We can use different pattens in the /path and even regex
app.use("/login*system", (req, res) => {
    res.send("I am login page");

    // GET: http://localhost:3000/login-to-system

    // I am login page
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