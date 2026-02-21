const adminAuth = (req, res, next) => {
    const token = "admin";
    if (token !== "admin") {
        res.status(401).send("User is not admin");
    } else {
        next();
    }
}

const userAuth = (req, res, next) => {
    const token = "validUser1";
    if (token !== "validUser") {
        res.status(401).send("User is not valid");
    } else {
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth,
}