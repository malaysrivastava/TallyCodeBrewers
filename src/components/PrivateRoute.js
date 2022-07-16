import React,{useState,useEffect} from "react";
import { Route, Redirect} from "react-router-dom";
import jwt from 'jsonwebtoken'

export default function PrivateRoute({ children, ...rest }) {

  
  const [log,setLog] = useState(true);
  
  const token = localStorage.getItem('Token');

  
  useEffect(()=>{
      jwt.verify(token,'my-32-character-ultra-secure-and-ultra-long-secret',function(err,decode){
        console.log('hello')
        if(err){
          setLog(false);
        
        } else {
          setLog(true);
          if(decode.isAdmin){
            localStorage.setItem('Rights',decode.isAdmin)
          } else {
            localStorage.setItem('Rights',false)
          }
        }
      });
    },[log])

  return (
    <Route {...rest}>
      {log ? (
        children
      ) : (<Redirect to={`/login`}/>)}
    </Route>
  );
}