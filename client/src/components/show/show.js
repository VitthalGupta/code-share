import React, {Component, useEffect, useState, useCallback} from "react";
import {useParams} from "react-router-dom";
import "./show.css";
import axios from 'axios';
import { parse } from "postcss";

const Show = (props) => {
    const {code} = useParams();
    const [data,setdata] = useState();
    const [fetched,setfetched] = useState(false);
    const [text, setText] = useState();
    const [hide, setHide] = useState(true);
    const [decrypt, setDecrypt] = useState(false);
    const [decryptdata, setDecryptdata] = useState();

    useEffect(() => {
        axios.get('https://agile-reef-63966.herokuapp.com/show/' + code).then(res => {
            setdata(res.data[0]);
            setfetched(true);
    });
    }, []);
    console.log(data);
    const textDataChange = (e) => {
    setText(e.target.value);
    console.log(e.target.value);
  };
  if(fetched){
    if(data.encrypt === 'true'){
      setHide(false);
    }
    else{
      setHide(true);
    }
  }
  if(fetched){
    if(data.encryptkey === text){
      setDecrypt(true);
    }
  }
    return (
        <div>
            <div className='header'>
            <center> <h1>Code / Share</h1></center>
            <div className='body'>
            <form name="codesharedata"  method='POST' >
              <label>Your Data will expire on {fetched && data.expiration}  <br/> <br/>
              
              <textarea onChange={textDataChange} name='code' rows='10' cols='50' placeholder='Paste your data here...' autoComplete='TRUE' value={fetched && data.pasteData} className="code"></textarea><br/>
              </label><br/>
              {hide &&<input type="text" name="decryptkey" placeholder="Enter your key"  onChange={textDataChange} className="decryptkey" />}<br/>
              <input type="submit" value="Verify" className="verify"></input>
            </form>
            </div>
            
          </div>
            {/* <pre> {fetched && 
                <textarea className='p-6 border-2 border-gray-400' rows={20} cols={100} value={data.pasteData} disabled></textarea>} </pre> */}
        </div>
    );
};
export default Show;