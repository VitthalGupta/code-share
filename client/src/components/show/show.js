import React, {Component, useEffect, useState, useCallback} from "react";
import {useParams} from "react-router-dom";
import "./show.css";
import axios from 'axios';
import { parse } from "postcss";

const Show = (props) => {
    const {code} = useParams();
    const [data,setdata] = useState();
    const [fetched,setfetched] = useState(false);
    const [text, setState] = useState();

    useEffect(() => {
        axios.get('https://damp-brook-52601.herokuapp.com/show/' + code).then(res => {
            setdata(res.data[0]);
            setfetched(true);
    });
    }, []);
    console.log(data);
    const textDataChange = (e) => {
    setState(e.target.value);
    console.log(e.target.value);
  };
    return (
        <div>
            <div className='header'>
            <center> <h1>Code / Share</h1></center>
            <center> <h2>Welcome to Code Share</h2></center>
            <div className='body'>
            <form name="codesharedata"  method='POST' >
              <label>Your Data will expire on {fetched && data.expiration}  <br/> <br/>
              
              <textarea onChange={textDataChange} name='code' rows='10' cols='50' placeholder='Paste your data here...' autoComplete='TRUE' value={fetched && data.pasteData} className="code"></textarea><br/>
              </label><br/>
              <input type="submit" value="Modify expiry data" className="Modify"></input>
            </form>
            </div>
            
          </div>
            {/* <pre> {fetched && 
                <textarea className='p-6 border-2 border-gray-400' rows={20} cols={100} value={data.pasteData} disabled></textarea>} </pre> */}
        </div>
    );
};
export default Show;