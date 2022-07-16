import React from "react";
import { useHistory } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const Welcome=()=>{

    let history = useHistory();
    const theme = createTheme();
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
            <QuestionAnswerIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Tally Solutions
          </Typography>
          <Box sx={{ mt: 1 }}>
           
            <Button
              fullWidth
              onClick={()=>history.push('/create')}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Quiz
            </Button>

            <Button
              fullWidth
              onClick={()=>history.push('/give')}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Give Quiz
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
   )
}

export default Welcome;