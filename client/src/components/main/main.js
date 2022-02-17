import React, {useState, useEffect} from "react";
import "./main.css";
import axios from 'axios';
import shortid from 'shortid';

const generateId = () => {
    return shortid.generate();
};

const Main = (props) => {

  const [text, setState] = useState();
  const [generated, setGenerated] = useState(false);
  const [data, setData] = useState();

  const generate = (e) => {
    e.preventDefault();
    const urlid = generateId();
    const urlgen= 'http://localhost:3000/' + urlid;
    const obj = {
      urlCode: urlid,
      shortUrl: urlgen,
      pasteData: text,
      Date: new Date(),
      expiration: calc(new Date())
    };
    axios.post('http://localhost:3001/', obj).then(res => { });
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
    setState(e.target.value);
  };
  return (
    <div>
          <div className='header'>
            <center> <h1>Code / Share</h1></center>
            <center> <h2>Welcome to Code Share</h2></center>
            <div className='body'>
            <form name="codesharedata" onSubmit={ generate } method='POST'>
              <label>Paste your code:  <br/><br/>
              <textarea onChange={textDataChange} name='code' rows='10' cols='50' placeholder='Paste your data here...' autoComplete='TRUE' className="code"></textarea><br/>
              </label><br/>
              <input type="submit" value="Generate link" className="Button"></input>
            </form>
            </div>
            {generated && <center><p>Your link is: <a href={data.shortUrl} target="_blank" className="link-generate">{data.shortUrl}</a></p></center>}
          </div>
      </div>
  );
}
export default Main;