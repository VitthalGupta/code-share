import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const backurl = process.env.REACT_APP_BACKEND_URL;

const ViewIp =(props)=>{
    const{code}=useParams();
    const [ips,setIPs]= useState();
    const [fetch, setFetch]= useState(false);

    useEffect(()=>{
        axios.get(backurl+ "urlList/view/"+code).then((response)=>{
            console.log(response);
            setIPs(response.data);
            setFetch(true);
        })
    },[])

    return(
        <div clasname="ip-main">
            <center><h1>Your data was accessed from these IP addresses:</h1></center>
            {fetch && ips.slice().reverse().map((ips)=>{
                return (
                  <center>
                    <div className="box">
                        <div className="ip-format"><span className="text-gray-200">IP Address:   </span>{ips.ip}</div>
                        <div className="access-format"><span>Accessed Timestamp:  </span>{new Date(ips.timestamp).toLocaleString()}</div><br/>
                    </div>
                  </center>
                );
            })}
        </div>
    )
}
export default ViewIp