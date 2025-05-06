import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 6000;

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, ()=>{
    console.log(`Port has succesfully`)
});