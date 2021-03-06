import React from "react";
import View from './dash-view'
import {useState,useEffect} from 'react'
import wait from 'wait'
import { useHistory } from "react-router-dom";
import axios from "axios";

const Dashboard=()=>{

    let history = useHistory();

    const logOutUser = ()=>{
        localStorage.setItem("Token","dfdxfdf");
        history.push('/')
      }
      const token = localStorage.getItem('Token');
      const user_id = JSON.parse(localStorage.getItem('User'))._id

      const [load,setLoad] = useState(false);
      const [quizData,setQuizData] = useState([])

    const loadQuiz=()=>{
      axios({
        method:"POST",
        url:"http://localhost:8001/api/quiz/id",
        headers: {
            'x-auth-token': token
        },
        data:{
            userId:user_id,
        }
    })   
    .then((res) => {
        console.log(res)
        setQuizData(res.data)
    })
    .catch((error) => {
     console.log(error);
 })
    }  


    const endQuiz=(Qname,id)=>{
      axios({
        method:"PUT",
        url:"http://localhost:8001/api/quiz/end",
        headers: {
            'x-auth-token': token
        },
        data:{
            id:id
        }
    })   
    .then((res) => {
        console.log(res)
        alert(Qname+" quiz ended")
    })
    .catch((error) => {
     console.log(error);
 })
    }  
    
    useEffect(async()=>{
      setLoad(false);
      loadQuiz();
      await wait(1000);
      setLoad(true)
    },[])
    
    if(load){
         return(
           <div>
               <View {...{logOutUser,quizData,endQuiz}}/>
           </div>
         );
    } else {
      return <>
        loading ...
      </>
    }
    }

export default Dashboard;