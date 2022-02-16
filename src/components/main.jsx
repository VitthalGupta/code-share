import React from "react"
import './main.css';
//import { mongoose } from "mongoose";
//import { connectdb } from "./config/db";
//import express from "express";
//const app = express();

//connectdb();

//define routes


const main = () => {
  return (
      <div>
          <div className='header'>
            <center> <h1>Code / Share</h1></center>
            <center> <h2>Welcome to Code Share</h2></center>
            <div className='body'>
            <form method='POST' action="">
              <label>Paste your code:  <br/> <br/>
              <textarea name='code' rows='10' cols='50' placeholder='Your data here' autoComplete='TRUE' class="code"></textarea><br/>
              </label><br/>
              <input type="submit" value="Submit"></input>
            </form>
            </div>
          </div>
      </div>
  );
};

export default main;