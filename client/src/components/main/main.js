import React, {useState, useEffect} from "react";
import "./main.css";
import axios from 'axios';
import shortid from 'shortid';
const backurl = process.env.REACT_APP_BACKEND_URL;
const fronturl = process.env.REACT_APP_FRONTEND_URL;
const generateId = () => {
    return shortid.generate();
};

const Main = (props) => {

  const [text, setText] = useState();
  const [generated, setGenerated] = useState(false);
  const [data, setData] = useState();
  const [encrypt, setEncrypt] = useState(false);
  const [encryptkey, setEncryptkey] = useState();

  const generate = (e) => {
    e.preventDefault();
    const urlid = generateId();
    console.log("EncryptKey:", encryptkey);
    // if(encryptkey == undefined){
    //   const EncryptKey = generateId();
    // }
    console.log("Encryptkey after if statement",encryptkey)
    const urlgen= fronturl + urlid;
    const obj = {
      urlCode: urlid,
      shortUrl: urlgen,
      pasteData: text,
      Date: new Date(),
      expiration: calc(new Date()),
      encrypt: encrypt,
      encryptkey: encryptkey
    };
    axios.post(backurl, obj).then(res => { });
    setGenerated(true);
    setData(obj);
  };
console.log(data);
  const calc = (date) => {
    let d = new Date(date);
    d.setDate(d.getDate() + 1);
    return d;
  };

  const textDataChange = (e) => {
    setText(e.target.value);
  };

  const encryptDataChange = (e) => {
    if(e.target.checked === true) setEncrypt(true);
    else setEncrypt(false);
  };

  const encryptKeyChange = (e) => {
    console.log(e.target.value)
    setEncryptkey(e.target.value)
  };
  // const handleEncrypt= (e) =>{
  //   if (e.target.checked){
  //     sethide(false);
  //   }
  //   else{
  //     sethide(true);
  //   }
  // }
  console.log("ENcrypt Key: ",encryptkey)
  return (
    <div>
          <div className='header'>
            <center> <h1>Code / Share</h1></center>
            <div className='body'>
            <form name="codesharedata" onSubmit={ generate } method='POST'>
              <label>Paste your code:  <br/><br/>
              <textarea onChange={textDataChange} name='code' rows='10' cols='50' placeholder='Paste your data here...' autoComplete='TRUE' className="code"></textarea><br/>
              </label>
              <label>add encryption ?<input type="checkbox" name="encrypt" onChange={encryptDataChange} className="encrypt" /></label>
              {encrypt && <input type="text" name="encryptkey" onChange={encryptKeyChange} className="encryptkey" placeholder="Enter key" />}<br/>
              <input type="submit" value="Generate link" className="Button" ></input>
            </form>
            </div>
            {generated && <center><p>Your link is: <a href={data.shortUrl} target="_blank" className="link-generate">{data.shortUrl}</a></p></center>}
            {generated && encrypt && <center><p>Your Key is: {encryptkey} </p></center>}
          </div>
      </div>
  );
}
export default Main;