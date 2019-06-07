const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cfg = require("./config.json");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const port = cfg.port || 3151;

/////////////////
const mongoLink = cfg.mongo;
mongoose.connect(mongoLink, {useNewUrlParser: true},res => {console.log(res)})


///////////////////////////
const steam_api = cfg.steam_api;
const steam_id = cfg.steam_id;
const steam_game = cfg.steam_game;
const link = 'http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=' + steam_game + '&key=' + steam_api + '&steamid=' + steam_id;

app.get("/h",(req,res) => {
    let data1 = '';
    http.get(link,(res1) => {
        res1.on('data',(data) => {
            data1 += data;
        });
        res1.on('end',() => {
            res.json({status:"ok",data:JSON.parse(data1)});
        })
    })
})

app.get("/azmAdmingui",(request, response) => { //http://localhost:3151/azmAdmingui?gid=123&name=marco polo&uid=12312321&sName=asdsa asda a&Steam=asdas saa
    let gid = request.query.gid
    let name = request.query.name
    let uid = request.query.uid
    let sName = request.query.sName
    let Steam = request.query.Steam
    var data = fs.readFileSync("./db.json","utf-8");
    let ora = new Date();
    
    let newData = {
        ora:(ora.toString()),
        gid:gid,
        name:name,
        uid:uid,
        sever_Name:sName,
        Steam_name:Steam
    };
    data = JSON.parse(data); 
    data.push(newData);
    let dataStringed = JSON.stringify(data);
    fs.writeFileSync("./db.json",dataStringed,"utf-8");
    console.log("[AZM Admin gui LOG: "  + gid + ', ' + name + ', ' + uid + ', ' + sName + ', ' + Steam + ']')
    response.send("azm");
})

app.post("/test",(req,res) => {
    console.log(req.body);
    if (req.body.prova === "ciao") {
        res.json({status:"Ciao anche a te"});
        return;
    }
    res.json({status:"ok"})
})

app.use(express.static("./client"));
app.listen(port,() => {
    console.log("[Alezm website started on port: " + port + "]");
})