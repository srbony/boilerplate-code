const express = require("express");
const cors = require("cors");
const dbConnect = require("./utilities/dbConnect");
const toolsRoutes = require("./routes/v1/tools.route");
const viewCount = require("./midleware/viewCount");
const errorHandler = require("./midleware/errorHandler");
// const { rateLimit } = require("express-rate-limit");
const port = process.env.PORT || 5000;
const app = express();



app.use(cors());
app.use(express.json());
app.use(express.static("public"))
// app.set("view engine", "ejs")
app.set("view engine", "ejs");



//application level midleware
// app.use(viewCount);
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })

// Apply the rate limiting middleware to all requests
// app.use(limiter)


dbConnect();
app.use('/api/v1/tools', toolsRoutes)


app.get("/", (req, res) => {
    // res.send("server is running")
    // res.sendFile(__dirname + '/public/home.html')
    res.render("home.ejs", {
        id: 2,
        user: {
            name: "test"
        }
    })
});

app.all('*', (req, res) => {
    res.send("no route is found")
})



app.use(errorHandler)



app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})



//global error handler=>when occurs server or database issue
process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
       process.exit(1);
    })
 })


