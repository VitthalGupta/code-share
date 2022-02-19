import "./collect.css";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from  'axios';
const backurl = process.env.REACT_APP_BACKEND_URL;

const Collection = (props) =>{
    const [urlList, setUrlList]= useState();
    const [fetch, setFetch] = useState(false);
    useEffect(()=>{
        axios.get(backurl+ 'urlList').then((res) =>{
            console.log(res.data);
            setUrlList(res.data);
            setFetch(true);
        })
    },[])
    const urlDelete= (urlcode) => {
        axios.get(backurl+'delete/'+urlcode).then((response)=>{
            console.log(response);
            window.location.reload();
        })
    }
    const modifyDate = (urlcode)=>{
            axios.get(backurl+'modify-date/'+urlcode).then((response)=>{
                console.log(response);
        })
    }
    return (
        <div className="text-center">
            <center><h1>Code/Share</h1></center>
            <center><h3>List of valid Urls</h3></center>
            <div><center>
                <table>
                    <thead>
                        <tr>
                            <th>URL</th>
                            <th>Created</th>
                            <th>Expiration Date</th>
                            <th>Encryption (true/false)</th>
                            <th>Delete</th>
                            <th>Modify Expiration</th>
                            <th>View IP's</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetch && urlList.map((urlLists) => {
                            console.log(urlLists.encrypt);
                            return(
                            <tr>
                                <td><a href={urlLists.shortUrl} target="_blank">{urlLists.shortUrl}</a></td>
                                <td>{new Date(urlLists.date).toLocaleString()}</td>
                                <td>{new Date(urlLists.expiration).toLocaleString()}</td>
                                <td>{urlLists.encrypt}</td>
                                <td><button onClick={()=>urlDelete(urlLists.urlCode)} >Delete</button></td>
                                <td><button onClick={()=>modifyDate(urlLists.urlCode)}>Add 1 day</button></td>
                                <td><Link to={`view/${urlLists.urlCode}`} target="_blank"><button>View</button></Link></td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table></center>
            </div>
        </div>
    )
}

export default Collection;