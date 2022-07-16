import { Button, Divider } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Grid} from "@material-ui/core";

const View=({logOutUser,quizData,endQuiz})=>{
    
    let history = useHistory();

    return(
        <div>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DashBoard
          </Typography>
          <Button color="inherit" onClick={logOutUser}>Logout</Button>
          <Button color="inherit" className="bg-success" onClick={()=>history.push('/create')}>CreateQuiz</Button>
        <Button color="inherit" className="bg-warning m-3" onClick={()=>history.push('/give')}>GiveQuiz</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Grid container spacing={2} xs={12}>
        {quizData && quizData.map((quiz, index) => (
         <Grid className="quizcard" xs={4} key={index}>
            <Typography variant="h4">
                {quiz.Qname}
                <Button className="bg-danger small m-2" onClick={()=>endQuiz(quiz.Qname,quiz._id)}>End quiz</Button>
            </Typography>
            <Divider className="bg-dark"></Divider>
            <Typography variant="h6">
                ScoreBoard
            </Typography>
            {quiz.userAttempted && quiz.userAttempted.map((element, index) => (
                  <Grid container xs={12} key={index} className="d-flex flex-row justify-space-between">
                    <Grid xs={3}>
                     <b>Username : </b> {element.user}
                    </Grid>
                    <Grid xs={3}>
                     <b>Scored : </b> {element.scored}
                    </Grid>
                    <Grid xs={3}>
                     <b>Total score : </b> {element.totalScore}
                    </Grid>
                  </Grid>
            ))}
         </Grid>
        ))}
    </Grid>
        </div>
    )
}

export default View;