const express = require("express")
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError");
const helmet = require("helmet");
const data = require("./data.json");

app.use(express.static(path.join(__dirname , "/public")));

app.engine("ejs" , ejsMate);
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

app.use(
    helmet({
      contentSecurityPolicy: false,
    })
);

app.get("/" , (req , res) => {
    res.render("linktree" , {data});
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

app.use((err , req , res , next) => {
    const {statusCode = 500} = err;
    if (!err.message) err.message = "Oh No! Something went wrong :(";
    res.status(statusCode).render("error" , {err});
})

const PORT = (process.env.PORT) || 3000;
app.listen(PORT , () => {
    console.log(`[INFO] App is now running on port ${PORT}`)
})