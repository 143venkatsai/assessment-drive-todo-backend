const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const db = require('./dbConfig')

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get("/", (req, res) =>{
    res.send("Welcome to the Node.JS server");
});

server.get("/todos", async (req,res) =>{
    //Get all Todos
    try{
        const todos = await db("todos");
        res.json(todos);
    }catch(err){
        console.log(err);
    }
   
});

server.post("/todos", async (req,res) =>{
    //Post todo
    const {description} = req.body;
    console.log(todo);
    if(!description){
        return res.status(400).json({message: 'You must include a todo description in your request.'})
    }
    try{
        await db("todos").insert({description});
        res.status(200).json({message: "Todo successfully stored."});
    }catch(err){
        console.log(err);
    }
});

server.put("/todos", async(req,res) =>{
    //Update todo
    const {id} = req.params;
    const {description} = req.body;
    if(!description){
        return res.status(400).json({message: "You must include a todo description in your request."})
    }
    try{
        await db("todos").where({id}).update({description});
        res.status(200).json({ message: "Todo successfully updated." });
    }catch(err){
        console.log(err);
    }
});

server.delete("/todos", async (req,res) =>{
    //Delete Todo
    const {id} = req.params;
   
    try{
        await db("todos").where({id}).del();
        res.status(200).json({ message: "Todo Deleted Successfully." });
    }catch(err){
        console.log(err);
    }
});

module.exports = server