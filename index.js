const express =require("express");
const cors=require("cors");
const app=express();
app.use(express.json());
app.use(cors());
app.listen(3000,()=>{
console.log("server is running on port 3000 hi hamza");
})
app.get("/",(req,res)=>{
res.status(200).json("server is up and running bruhhther yo whats uppp Hamza ");
})
