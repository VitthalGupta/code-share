import React, {Component, useEffect, useState, useCallback} from "react";
import {useParams} from "react-router-dom";
import "./show.css";
import axios from 'axios';
const backurl = process.env.REACT_APP_BACKEND_URL;
const fronturl = process.env.REACT_APP_FRONTEND_URL;

const Show = (props) => {
    const {code} = useParams();
    const [data,setdata] = useState();
    const [fetched,setfetched] = useState(false);
    const [text, setText] = useState();
    const [decrypttext, setDecrypttext] = useState();

    useEffect(() => {
        axios.get(backurl +'show/' + code).then(res => {
          console.log("running respose useffect")
          setdata(res.data[0]);
          setfetched(true);
          console.log("Hide status inside useEffect: ",res.data[0].encrypt);
          // if(res.data[0].encrypt == true){
          //   setHide(false);
          // }
          setText(res.data[0].pasteData)
    });
    }, []);

    // useEffect(() => {
    //         if(data.encrypt == true){
    //           setHide(false);
    //         }
    // }, [data])

    console.log("Main data:",data);
    const textDataChange = (e) => {
      console.log("here!!!");
    setDecrypttext(e.target.value);
    console.log("Decrypt Text:",e.target.value);
  };

console.log("DATA: ",data);


  const Decryption = (e) =>{
    e.preventDefault();
    console.log("Inside Decryption: ", data)
    console.log("Getting text",text)
    console.log(data.encryptkey)
    if(data.encryptkey === decrypttext){
      console.log("encryption key is correct")
      axios.get(backurl + 'decrypt/'+ code).then(res =>{
        console.log(res.data);
        setText(res.data);
      });
    }
  };
  console.log("pasteData outside decryption: ", text)
    return (
      <div>
        <div className="header">
          <center>
            {" "}
            <h1>Code / Share</h1>
          </center>
          <div className="body">
            <form name="codesharedata" onSubmit={Decryption} method="POST">
              <label>Your Data was created on {fetched && data.date}</label>
              <br />
              <label>
                Your Data will expire on {fetched && data.expiration} <br />{" "}
                <br />
                <p><a href="http://localhost:3000/urlList" target="_blank">
                  View Url List
                </a></p>
                <textarea
                  name="code"
                  rows="10"
                  cols="50"
                  placeholder="Paste your data here..."
                  autoComplete="TRUE"
                  value={fetched && text}
                  className="code"
                  disabled
                ></textarea>
                <br />
              </label>
              <br />
              {fetched && data.encrypt && (
                <p>
                  Your data is encrypted:
                  <br />
                  Enter Key:
                  <input
                    type="text"
                    name="decryptkey"
                    placeholder="Enter your key"
                    onChange={textDataChange}
                    className="decryptkey"
                  />
                  <br />
                  <input type="submit" value="Decrypt"></input>
                </p>
              )}
            </form>
          </div>
        </div>
        {/* <pre> {fetched && 
                <textarea className='p-6 border-2 border-gray-400' rows={20} cols={100} value={data.pasteData} disabled></textarea>} </pre> */}
      </div>
    );
};
export default Show;