const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");

const PORT = process.env.PORT || 3000;

const app = express();

app.use("/multiRequestHandlers", 
    (req, res, next) => {
        console.log("1. First request handler");
        next();
    },
    (req, res, next) => {
        console.log("2. Second request handler");
        next();
    },
    (req, res, next) => {
        console.log("3. Second request handler");
        next();
    },
    (req, res, next) => {
        console.log("4. Second request handler");
        // next();
        res.send("This is the final response - 4")
    },
)

app.use("/multi", 
    [
        (req, res, next) => {
            console.log("1. Array 1.1");
            next();
        },
        (req, res, next) => {
            console.log("2. Array 1.2")
            next();
        },
    ],
    [
        (req, res, next) => {
            console.log("3. Array 1.1")
            next();
        },
        (req, res, next) => {
            console.log("4. Array 1.2")
            res.send({
                message: "This is last request handler in 2nd array",
                data: [
                    "1 = Success",
                    "2 = Success",
                ]
            });
        },
    ],
)

app.get("/different", (req, res, next) => {
    console.log("1. First route handler");
    // res.send({
    //     message: "First Different route handlers."
    // });
    next();
});

app.get("/different", (req, res, next) => {
    console.log("2. Second route handler");
    res.send({
        message: "Different route handlers."
    });
})

// Middleware

app.use("/admin", adminAuth);

app.get("/admin/addUser", (req, res, next) => {
    res.send("New user added");
});

app.get("/admin/deleteUser", (req, res, next) => {
    res.send("Delete User");
});

app.get("/user/login", (req, res, next) => {
    res.send("User came to login");
});

app.get("/user/data", userAuth, (req, res, next) => {
    res.send({
        message: "User is authenticated",
        data: {
            type: "User",
            name: "Shubham"
        }
    })
});

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

app.put("/user/:id/:name", (req, res) => {
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

    // PUT: http://localhost:3000/user/1/Sumit?desination=ca

    // {
    //     "name": "Put Call",
    //     "qurey": {
    //         "desination": "ca"
    //     },
    //     "path": "/user/1/Sumit",
    //     "params": {
    //         "id": "1",
    //         "name": "Sumit"
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