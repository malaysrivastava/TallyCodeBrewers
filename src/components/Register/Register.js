import React,{useState,useEffect} from 'react';
import axios from "axios";
import View from './Register-view';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken'

const Landing = () => {

  let history = useHistory()
  

  const [log,setLog] = useState(false);
  
  const token = localStorage.getItem('Token');
  
  useEffect(()=>{
      jwt.verify(token,'my-32-character-ultra-secure-and-ultra-long-secret',function(err,decode){
        if(err){
          setLog(false);
        
        } else {
          setLog(true);
        }
      });
    },[token,log])

  if(log){
    history.push('/panel')
  }

  const responseSuccessGoogle = async (response) => {
    const setData=(data)=>{
      localStorage.setItem('Token',data.data.token);
      localStorage.setItem('User',JSON.stringify(data.data.user))
    }
    
    axios({
        method:"POST",
        url:"https://quiz-app-hackathon.herokuapp.com/api/auth/googlelogin/",
        data:{tokenId:response.tokenId}
    })
    .then(response=>{
        console.log("Google login success")
        setData(response)
        history.go('/')
    })
    
  }
const responseErrorGoogle = (response)=>{
         console.log(response,'Google login failed')
} 




  return (
    
    <div>

    <View {...{responseSuccessGoogle,responseErrorGoogle}}/>
 
    </div>

 
  )
 
};

export default Landing;