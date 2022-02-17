import React, {Component, useEffect, useState, useCallback} from "react";
import {useParams} from "react-router-dom";
import "./show.css";
import axios from 'axios';
import { parse } from "postcss";

const Show = (props) => {
    const {code} = useParams();
    const [data,setdata] = useState([]);

    const getData = () => {
        axios.get('http://localhost:3001/show/' + code).then(res => {
            setdata(res);
        }); 
    };
    useEffect(() => {
        getData();
    }, []);
    console.log(data)
    
    return (
        <div>
            <pre>  </pre>
        </div>
    )
};
export default Show;