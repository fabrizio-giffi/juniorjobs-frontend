import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Landing.css'

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
    <div className='flexcontainer'>
        <div className='collumn headline-box'>
            <Typography
              component="h1"
              variant="h2"
              align=''
              color="text.primary"
              gutterBottom
            >
              Junior Jobs
            </Typography>
            <Typography variant="h5" alignContent={{ md: "start", xs: 'center'}} color="text.secondary" paragraph>
              The platform that connects employees and employers for junior level positions.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent={{ md: "start", xs: 'center'}}
            >
            <div style={{width: "60%"}}>
            <Link to={"http://localhost:5173/jobs"}>
              <Button variant="contained" fullWidth sx={{ bgcolor: "#6b9080" }} size="large">Try It Out</Button>
            </Link>
            </div>
              </Stack>
        </div>
        <div className='collumn'>
            <div className='triangle'></div>
            <div className='background-image displaynone'>
              <img src='./src/assets/markus-winkler-7iSEHWsxPLw-unsplash.jpg' alt="Resume" />
            </div>
        </div>


    </div>
  );
}