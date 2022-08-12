import React,{useState} from "react";
import View from './give-view'
import axios from "axios";
import jwt from "jsonwebtoken";

const GiveQuiz=()=>{

  var url_string = window.location.href; //window.location.href
  var url = new URL(url_string);
  var quiz_token = url.searchParams.get("token") || '';

   const [formdata,setFormData] = useState({
      qtoken:quiz_token,
      mail:''
   })

   const[response,setResponse] = useState();

   const [quizname,setQuizName] = useState('');
   
    const [textValues, setTextValues] = useState([])
    const [mcqValues, setMcqValues] = useState([])
    
   const[goto,setGoto] = useState(false);

   const {qtoken,mail} = formdata;

   const handleChange = e =>{
    setFormData({...formdata,[e.target.name]:e.target.value})
 }

   
 let handleChange1 = (i, e) => {
  let newTextValues = [...textValues];
  newTextValues[i][e.target.name] = e.target.value;
  setTextValues(newTextValues);
}

let handleChange2 = (i, e) => {
    let newMcqValues = [...mcqValues];
    newMcqValues[i]['ans'] = e.target.value;
    setMcqValues(newMcqValues);
  }

   const handleSubmit2=(e)=>{
    e.preventDefault();
    if(qtoken && mail){
      jwt.verify(qtoken,'my-32-character-ultra-secure-and-ultra-long-secret',function(err,decode){
        if(err){
          alert('Invalid quiz token or expired')
        } else {

            const userRes={
              token:qtoken,
              email:mail,
              text:textValues,
              MCQ:mcqValues
            }
          axios({
            method:"POST",
            url:"https://quiz-app-hackathon.herokuapp.com/api/quiz/submit",
            data:userRes
        })   
        .then((res) => {
          setQuizName(false)
          setResponse(res.data)
          setTextValues({});
          setMcqValues({});
        })
        .catch((error) => {
         console.log(error);

        })
        }
      });
    } else{
      alert("Failed to send data")
    }
   }

    const handleSubmit1=(e)=>{
      e.preventDefault();
       if(qtoken!='' && mail!=''){
        jwt.verify(qtoken,'my-32-character-ultra-secure-and-ultra-long-secret',function(err,decode){
          if(err){
            alert('Invalid quiz token or expired')
          } else {
            axios({
              method:"POST",
              url:"https://quiz-app-hackathon.herokuapp.com/api/quiz/check",
              data:{
                   token:qtoken,
                   email:mail,
                   Qid:decode._id,
                   start:decode.sTime,
                   end:decode.eTime,
              }
          })   
          .then((res) => {
              alert(res.data.message)
              if(res.status==200){
                setGoto(true);
                console.log(res.data.data)
                setMcqValues(res.data.data.MCQ)
                setTextValues(res.data.data.text)
                setQuizName(res.data.data.Qname)
              }
          })
          .catch((error) => {
           console.log(error);
  
          })
          }
        });
       } else{
        alert("Enter all the fields first");
       }
    }

   return(
     <View {...{qtoken,mail,handleChange,handleSubmit1,handleSubmit2,goto,quizname,response,textValues,mcqValues,handleChange1,handleChange2}}/>
   )
}

export default GiveQuiz;