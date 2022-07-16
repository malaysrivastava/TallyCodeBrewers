import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {Box,Modal} from "@material-ui/core";
import copy from 'copy-to-clipboard';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const View = ({open,urltoken,handleClose,logOutUser,handleChange1,handleChange2,handleSubmit,removeTextFields1,removeMcqFields2,addTextFields1,addMcqFields2,mcqValues,textValues,Qname,handleChange,Stime,Etime,setSTime,setETime}) => {
 
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflow:'hidden',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
   
  const theme = createTheme();

    let history = useHistory();
    return (
      <div>
      <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Create Quiz
        </Typography>
        <Button color="inherit" onClick={logOutUser}>Logout</Button>
        <Button color="inherit" onClick={()=>history.push('/panel')}>DashBoard</Button>
        <Button color="inherit" className="bg-warning m-3" onClick={()=>history.push('/give')}>GiveQuiz</Button>
      </Toolbar>
    </AppBar>
  </Box>

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
          <TextField
                  required
                  fullWidth
                  label="Quiz name"
                  value={Qname}
                  name='Qname'
                  onChange={handleChange}
                  autoFocus
                />
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}> 
              <Grid item md={6} xs={12}>
              <DateTimePicker
                  fullWidth
                  renderInput={(props) => <TextField {...props} />}
                  label="Start time"
                  value={Stime}
                  onChange={(newValue) => {
                  setSTime(newValue);
                  }}
              />
              </Grid>
             
              <Grid item md={6} xs={12}>
              <DateTimePicker
                  fullWidth
                  renderInput={(props) => <TextField {...props} />}
                  label="End time"
                  value={Etime}
                  onChange={(newValue) => {
                  setETime(newValue);
                  }}
              />
              </Grid>
              </LocalizationProvider>
              {textValues.map((element, index) => (
              <Grid className="text-form" container key={index} spacing={2} sx={{mt:1}}>
              <Grid item md={10}>
                <TextField
                  required
                  fullWidth
                  label="Question"
                  name="ques"
                  value={element.ques || ""}
                  onChange={e => handleChange1(index, e)}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  required
                  type="number"
                  fullWidth
                  label="Points"
                  name="pts"
                  value={element.pts || ""}
                  onChange={e => handleChange1(index, e)}
                />
              </Grid>
              <Grid item md={10}>
                <TextField
                  required
                  fullWidth
                  label="Short Answer"
                  name="ans"
                  value={element.ans || ""}
                  onChange={e => handleChange1(index, e)}
                />
              </Grid>
              <Grid item md={2}>
                  <Button
                  fullWidth
                  variant="contained"
                  className="bg-danger lighten-1"
                  onClick={() => removeTextFields1(index)}
                  sx={{ mt: 3, mb: 2 }}
                >
              Remove
            </Button>
              </Grid>
              </Grid>
            ))}
              {mcqValues.map((element, index) => (
              <Grid className="text-form" container key={index} spacing={2} sx={{mt:1}}>
              <Grid item md={10}>
                <TextField
                  required
                  fullWidth
                  label="Question"
                  name="ques"
                  value={element.ques || ""}
                  onChange={e => handleChange2(index, e)}
                />
              </Grid>
              <Grid item md={2}>
                <TextField
                  required
                  type="number"
                  fullWidth
                  label="Points"
                  name="pts"
                  value={element.pts || ""}
                  onChange={e => handleChange2(index, e)}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  required
                  fullWidth
                  label="Option 1"
                  name="op1"
                  value={element.op1 || ""}
                  onChange={e => handleChange2(index, e)}
                />
              </Grid>
              <Grid item md={3}>
              <TextField
                  required
                  fullWidth
                  label="Option 2"
                  name="op2"
                  value={element.op2 || ""}
                  onChange={e => handleChange2(index, e)}
                />
              </Grid>
              <Grid item md={3}>
              <TextField
                  required
                  fullWidth
                  label="Option 3"
                  name="op3"
                  value={element.op3 || ""}
                  onChange={e => handleChange2(index, e)}
                />
              </Grid>
              <Grid item md={3}>
              <TextField
                  required
                  fullWidth
                  label="Option 4"
                  name="op4"
                  value={element.op4 || ""}
                  onChange={e => handleChange2(index, e)}
                />
              </Grid>

              <Grid item md={10}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Select correct option</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="ans"
                  value={element.ans || ""}
                  onChange={e => handleChange2(index, e)}
                >
                  <FormControlLabel value={element.op1 || ""} control={<Radio />} label="Option 1" />
                  <FormControlLabel value={element.op2 || ""} control={<Radio />} label="Option 2" />
                  <FormControlLabel value={element.op3 || ""} control={<Radio />} label="Option 3" />
                  <FormControlLabel value={element.op4 || ""} control={<Radio />} label="Option 4" />
                </RadioGroup>
              </FormControl>
              </Grid>
              <Grid item md={2}>
                  <Button
                  fullWidth
                  variant="contained"
                  className="bg-danger lighten-1"
                  onClick={() => removeMcqFields2(index)}
                  sx={{ mt: 3, mb: 2 }}
                >
              Remove
            </Button>
              </Grid>
              </Grid>
            ))}
            </Grid>
         
            <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={3} sm={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => addTextFields1()}
            >
              Add Text's
            </Button>
            </Grid>
            <Grid item xs={3} sm={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => addMcqFields2()}
              sx={{ mt: 3, mb: 2 }}
            >
              Add MCQ's
            </Button>
            </Grid>
            <Grid item xs={3} sm={4}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="bg-success"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Quiz
            </Button>
            </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
        
                    <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Button className="bg-success m-1" onClick={()=>copy(urltoken, {
                                      debug: true,
                                      message: 'Press #{key} to copy',
                                    })}>Copy quiz code</Button>
                 
                  <Button className="bg-warning m-1" onClick={()=>copy('http://localhost:3000/give?token='+urltoken, {
                                      debug: true,
                                      message: 'Press #{key} to copy',
                                    })}>Copy quiz link</Button>
                </Box>
              </Modal>
           </div>
    )
}

export default View