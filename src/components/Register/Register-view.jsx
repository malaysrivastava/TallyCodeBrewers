import React from 'react';
import {useEffect} from 'react';
import { GoogleLogin } from 'react-google-login';
import LinearProgress from '@mui/material/LinearProgress';
import {Grid,Paper} from '@material-ui/core'




const Lview = ({responseSuccessGoogle,responseErrorGoogle}) => {
  const [progress, setProgress] = React.useState(0);
 const paperStyle={
   padding:20,
   height:'90',
   width:300,
   margin:'200px auto',
   backgroundColor:'white'
 }


 useEffect(() => {
  const timer = setInterval(() => {
    setProgress((oldProgress) => {
      if (oldProgress === 100) {
        return 0;
      }
      const diff = Math.random() * 10;
      return Math.min(oldProgress + diff, 100);
    });
  }, 500);

  return () => {
    clearInterval(timer);
  };
}, []);
  return (
    
    <div className="">
     
   {/* <img src='https://www.juit.ac.in/front/images/banner2.jpg'/> */}
    <Grid>
    <img className='banner' alt="logo" src="https://www.juit.ac.in/front/images/banner.jpg"/>
      <Paper className='paper' elevation={10} style={paperStyle}>
        <Grid>
        { <img className='logo' alt="lgo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwDyCiDsuXDdcNBXbs1QOoWqilzbtkwXeNmQ&usqp=CAU"></img> }
        </Grid>
       
        {/* <Box sx={{ width: '100%',marginTop:'45px' }}> */}
      <LinearProgress className='progress' variant="determinate" value={progress} />
    {/* </Box> */}
    
      <div className='Gsuit'>
  
        <GoogleLogin
            clientId="122504219718-8msdl1sbvd3e03m5lt20ag04k6sg7iip.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
          
            
        />
       
      </div> 
      
      </Paper>
      
    </Grid>
    
    
 
    </div>

 
  )
};

export default Lview;