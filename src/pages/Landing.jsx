import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Landing.css'
import { padding } from '@mui/system';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();

export default function Landing() {
  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline  style={{backgroundImage: `url(${image})`}}/>

    //   <main >
    //     <Box
    //       sx={{
    //         bgcolor: 'background.paper',
    //         pt: 8,
    //         pb: 6,
    //       }}
    //     >
    //       <Container maxWidth="sm" >
    //         <Typography
    //           component="h1"
    //           variant="h2"
    //           align="center"
    //           color="text.primary"
    //           gutterBottom
    //         >
    //           Junior Jobs
    //         </Typography>
    //         <Typography variant="h5" align="center" color="text.secondary" paragraph>
    //           The Plattform that connects employees and employers for Junior Level positions.
    //         </Typography>
    //         <Stack
    //           sx={{ pt: 4 }}
    //           direction="row"
    //           spacing={2}
    //           justifyContent="center"
    //         >
    //           <Button variant="contained">Sign Up</Button>
    //           <Button variant="outlined">Log In</Button>
    //         </Stack>
    //       </Container>
    //     </Box>
    //   </main>
    // </ThemeProvider> 
    <div className='flexcontainer'>
        <div className='collumn headline-box'>
            <Typography
              component="h1"
              variant="h2"
              align=""
              color="text.primary"
              gutterBottom
            >
              Junior Jobs
            </Typography>
            <Typography variant="h5" align="" color="text.secondary" paragraph>
              The Plattform that connects employees and employers for Junior Level positions.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent=""
            >
            <div style={{width: "40%"}}>
              <Button variant="contained" fullWidth sx={{ bgcolor: "#6b9080" }} size="large">Try It Out</Button>
            </div>
              {/* <Button variant="outlined">Log In</Button> */}
              </Stack>
        </div>
        <div className='collumn'>
            <div className='triangle'></div>
            <div className='background-image'></div>
        </div>


    </div>
  );
}