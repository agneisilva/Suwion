const express = require("express");
const load = require("consign");
const cors = require("cors");
const bodyParser = require("body-parser"); 
const mongoMiddleware = require("../infra/mongoDB.js");
const container = require('./dependenciesMap.js');


module.exports = function () {
    var application = express();

    application.use(bodyParser.urlencoded());
    application.use(bodyParser.json());
    
    application.use(cors());
    application.use(mongoMiddleware());
    application.use(container());

    load()
        .include("business")
        .then("models")
        .then("infra")
        .then("dao")
        .then("routes")
        .into(application);
    
    application.use((error, req, res, next)=>{
        console.log("###ERRO###");
        console.log(error);
        res.status(500).json("ERRO");
    });

    

    return application;
};