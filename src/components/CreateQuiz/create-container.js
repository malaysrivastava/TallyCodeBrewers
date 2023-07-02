import React, { useEffect, useState } from "react";
import View from "./create-view";
import wait from 'wait'
import { useHistory } from "react-router-dom";
import axios from "axios";

const Home =()=>{

  const user_id = JSON.parse(localStorage.getItem('User'))?._id
  const user_name = JSON.parse(localStorage.getItem('User'))?.name
  const token = localStorage.getItem("Token")
  
  const [load,setLoad] = useState(false);
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [urltoken,setUrlToken] = useState('');
  let history = useHistory();

  const logOutUser = ()=>{
    localStorage.setItem("Token","dfdxfdf");
    history.push('/')
  }

  const [textValues, setTextValues] = useState([])
  const [mcqValues, setMcqValues] = useState([])
  const [Qname,setQname] = useState('');
  const [Stime,setSTime] = useState(new Date().getTime());
  let end = new Date();
  end.setDate(end.getDate()+1);
  const [Etime,setETime] = useState(end.getTime());

  let handleChange1 = (i, e) => {
      let newTextValues = [...textValues];
      newTextValues[i][e.target.name] = e.target.value;
      setTextValues(newTextValues);
    }
  
    const handleChange = e =>{
      setQname(e.target.value);
   }

    let handleChange2 = (i, e) => {
        let newMcqValues = [...mcqValues];
        newMcqValues[i][e.target.name] = e.target.value;
        setMcqValues(newMcqValues);
      }
  
  let addTextFields1 = () => {
      if(NotEmpty()==true){
        setTextValues([...textValues, { ques: "", ans: "" ,pts:2}])
      } else{
        return;
      }
    }

  let addMcqFields2 = () => {
    if(NotEmpty()==true){
      setMcqValues([...mcqValues, { ques: "", op1: "", op2: "", op3: "", op4: "", ans: "" ,pts:1}])
    } else{
      return;
    }
    }

  let removeTextFields1 = (i) => {
      let newTextValues = [...textValues];
      newTextValues.splice(i, 1);
      setTextValues(newTextValues)
  }

  let removeMcqFields2 = (i) => {
    let newMcqValues = [...mcqValues];
    newMcqValues.splice(i, 1);
    setMcqValues(newMcqValues)
}

let NotEmpty=()=>{
  if(textValues && textValues.length>=1){
    let n = textValues.length - 1;
    for (const [key, value] of Object.entries(textValues[n])) {
      if(value==''){
        alert("Fill all the fields first!")
        return false;
      }
    }
  }

if(mcqValues && mcqValues.length>=1){
let n = mcqValues.length - 1;
for (const [key, value] of Object.entries(mcqValues[n])) {
  if(value==''){
    alert("Fill all the fields first!")
    return false;
  }
}
}
return true;
}
  
  let handleSubmit = (event) => {
      event.preventDefault();
      if(textValues.length!==0 || mcqValues.length!==0){
        if(NotEmpty() && Qname!=''){
          axios({
            method:"POST",
            url:"https://tallyquiz-malay.b4a.run/api/quiz/addQ",
            headers: {
                'x-auth-token': token
            },
            data:{
                 Qname:Qname,
                 byName:user_name,
                 byId:user_id,
                 MCQ:mcqValues,
                 text:textValues,
                 start:Stime,
                 end:Etime
            }
        })   
        .then((res) => {
            setUrlToken(res.data)
            setTextValues([]);
            setMcqValues([])
            setQname('');
            handleOpen()
        })
        .catch((error) => {
         console.log(error);

        })
        } else{
            return;
        }
      } else{
        alert("Add atleast 1 question to create quiz");
      }
  }

useEffect(async()=>{
  setLoad(false);
  await wait(1000);
  setLoad(true)
},[])

if(load){
     return(
       <div>
           <View {...{open,urltoken,handleClose,logOutUser,handleChange1,handleChange2,handleSubmit,removeTextFields1,removeMcqFields2,addTextFields1,addMcqFields2,mcqValues,textValues,Qname,handleChange,Stime,Etime,setSTime,setETime}}/>
       </div>
     );
} else {
  return <>
    loading ...
  </>
}
}

export default Home;