const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json())
//////////////////////// CONFIG
const config = {
    port: 3000,
    url: "mongodb+srv://alezm:123@alezm-mihj6.mongodb.net/test?retryWrites=true&w=majority"
}

/////////////////////
mongoose.connect(config.url,{ useNewUrlParser: true },() => {console.log("connected to DB")})
const db = mongoose.connection;
db.on('error',err => {
    console.log(err)
})

const subRoute = require("./routes/sub")
app.use("/sub", subRoute)

app.listen(config.port || 3000, () => {
    console.log("Server started")
});