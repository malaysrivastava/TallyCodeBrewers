import { useHistory } from "react-router-dom";
import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import QuizIcon from '@mui/icons-material/Quiz';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const View=({qtoken,mail,handleChange,handleSubmit1,handleSubmit2,goto,quizname,response,textValues,mcqValues,handleChange1,handleChange2})=>{

    const theme = createTheme();

    let history = useHistory();

    if(!goto){
      return(
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <QuizIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Start Quiz
            </Typography>
            <Box component="form" onSubmit={handleSubmit1} noValidate sx={{ mt: 1 }}>
             
              <TextField
                margin="normal"
                required
                fullWidth
                name="qtoken"
                value={qtoken}
                onChange={handleChange}
                label="Quiz token"
                type="text"
              />
               <TextField
                margin="normal"
                required
                fullWidth
                value={mail}
                label="Username"
                name="mail"
                onChange={handleChange}
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Start
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    )
      } else if(quizname){
        return(
            <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
               {quizname}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit2} sx={{ mt: 3 }}>

            {textValues.map((element, index) => (
              <Grid className="text-form" container key={index} spacing={2} sx={{mt:1}}>
              <Grid item md={10}>
                <TextField
                  fullWidth
                  disabled
                  label="Question"
                  value={element.ques || ""}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  type="number"
                  fullWidth
                  disabled
                  label="Points"
                  value={element.pts || ""}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  required
                  fullWidth
                  label="Short Answer"
                  name="ans"
                  value={element.ans || ""}
                  onChange={e => handleChange1(index, e)}
                />
              </Grid>
              </Grid>
            ))}
            {mcqValues.map((element, index) => (
              <Grid className="text-form" container key={index} spacing={2} sx={{mt:1}}>
              <Grid item md={10}>
                <TextField
                  required
                  fullWidth
                  disabled
                  label="Question"
                  value={element.ques || ""}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  required
                  type="number"
                  fullWidth
                  disabled
                  label="Points"
                  value={element.pts || ""}
                />
              </Grid>
              <Grid item md={12}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Select correct option</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="ans"
                  value={element.ans || ""}
                  onChange={e => handleChange2(index, e)}
                >
                  <FormControlLabel value={element.op1 || ""} control={<Radio />} label={element.op1} />
                  <FormControlLabel value={element.op2 || ""} control={<Radio />} label={element.op2} />
                  <FormControlLabel value={element.op3 || ""} control={<Radio />} label={element.op3} />
                  <FormControlLabel value={element.op4 || ""} control={<Radio />} label={element.op4} />
                </RadioGroup>
              </FormControl>
              </Grid>
              </Grid>
            ))}
             
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="bg-success"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit Quiz
            </Button>
         </Box>
        </Box>
      </Container>
    </ThemeProvider>
        )
       }else if(response){
        return(
          <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Your response has been recorded. Thank you!
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
               
          <Typography component="h1" variant="h5">
          <b>Total questions</b>
          </Typography>

              </Grid>
              <Grid item xs={12} sm={6}>
            <Typography component="h1" variant="h5">
            {response.correct+response.incorrect}
            </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
               
          <Typography component="h1" variant="h5">
          <b>Correct</b>
          </Typography>

              </Grid>
              <Grid item xs={12} sm={6}>
            <Typography component="h1" variant="h5">
            {response.correct}
            </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
               
          <Typography component="h1" variant="h5">
          <b>Incorrect</b>
          </Typography>

              </Grid>
              <Grid item xs={12} sm={6}>
            <Typography component="h1" variant="h5">
            {response.incorrect}
            </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
               
          <Typography component="h1" variant="h5">
          <b>Scored</b>
          </Typography>

              </Grid>
              <Grid item xs={12} sm={6}>
            <Typography component="h1" variant="h5">
            {response.scored}
            </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
               
          <Typography component="h1" variant="h5">
          <b>Total Score</b>
          </Typography>

              </Grid>
              <Grid item xs={12} sm={6}>
            <Typography component="h1" variant="h5">
            {response.totalScore}
            </Typography>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              onClick={()=>history.push('/')}
              sx={{ mt: 3, mb: 2 }}
            >
              Home
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
        )
       } else{
        return(
            <h2>loading....</h2>
        )
       } 
}

export default View;