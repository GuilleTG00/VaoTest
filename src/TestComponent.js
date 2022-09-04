import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import SecondTest from './PDFViewer/SecondTest';
import JSONData from './JSONViewer/JSONData';


import { createTheme, ThemeProvider } from '@mui/material/styles';

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <Link color="inherit" href="https://www.linkedin.com/in/guillermo-toloza-guzman/">
        Guillermo Toloza Guzmán
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

const TestComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="relative">
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
          <CameraIcon sx={{ mr: 2 }} />
            <Grid item>
              <Button 
                variant="contained" 
                startIcon={<ArrowBackIcon />}
              >
                Previous
              </Button>
              <Typography variant="h6" color="inherit">
              Record
              </Typography>
              <Button 
                variant="contained" 
                endIcon={<ArrowForwardIcon />}
              >
                Next
              </Button>
            </Grid>
            <Grid 
              item
            >
              <Button 
                variant="contained"
                color="success"
              >
                Approve
              </Button>
              <Button 
                variant="contained"
                color="warning"
              >
                Skip
              </Button>
          </Grid>
        </Toolbar>
      </AppBar>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Main Mockup
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              VAO.WORLD TEST
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        { /* We define a maxWidth of XL size, so it can fit the entire screen. */}
        <Container maxWidth="90%">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    backgroundColor: "grey"
                  }}
                >
                    <SecondTest />
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card
                    sx={{ 
                      padding: '0%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      justifyContent: "flex-start"
                    }}
                >
                    <JSONData/>
                </Card>
            </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                />
            </Card>
          </Grid>
            {cards.map((card) => (
             /* With the xs, sm and md, we define the responsive size of every card item 
                identified with its key. */
              <Grid item key={card} xs={12} sm={6} md={4}>
                {/* 
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
                */}
              </Grid>
            ))}
          </Grid>
        </Container>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Test Assignmnent solution for VAO.WORLD by:
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default TestComponent;