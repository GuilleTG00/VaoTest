import _ from 'lodash';

import React, { useEffect, useState, useLayoutEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import PDFViewer from './PDFViewer/PDFViewer';
import JSONData from './JSONViewer/JSONData';
import loadFromExcel from './Excel/loadFromExcel';
import LoadEmailHTML from './Email/LoadEmailHTML';

const LinkedInURL = "https://www.linkedin.com/in/guillermo-toloza-guzman/"

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <Link color="inherit" href={LinkedInURL}>
        Guillermo Toloza Guzmán
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

const MainComponent = () => {
  const [excelInfo, setExcelInfo] = useState([]);
  const [currentRow, setCurrentRow] = useState(1);

  console.log(excelInfo);
  const checkIfMaximumRows = () => {
    return (currentRow === excelInfo.length)
  }

  console.log(currentRow);
  const checkIfMinimumRows = () => {
    return (currentRow === 1)
  }

  const increaseCurrentRow = () => {
    setCurrentRow(currentRow + 1)
  }

  const decreaseCurrentRow = () => {
    setCurrentRow(currentRow - 1)
  }

  //We use the useLayoutEffect so we can get the data BEFORE rendering the DOM.
  useLayoutEffect(() => {
    loadFromExcel()
      .then(resp => setExcelInfo(resp))
      .catch(err => console.error(err));
  }, []);

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
            {/* When we are at the start or at the end of the rows, we wont show the buttons. */}
            {!checkIfMinimumRows() && (
                <Button 
                  variant="contained" 
                  startIcon={<ArrowBackIcon />}
                  onClick={decreaseCurrentRow}
                >
                  Previous
                </Button>
              )}
              {!_.isEmpty(excelInfo) && (
                <Typography variant="h6" color="inherit">
                {currentRow}: {excelInfo[currentRow - 1].c_ID} - {excelInfo[currentRow - 1].c_name} 
                </Typography>
              )}
              {!checkIfMaximumRows() && (
                <Button 
                  variant="contained" 
                  endIcon={<ArrowForwardIcon />}
                  onClick={increaseCurrentRow}
                >
                  Next
                </Button>
              )}
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
                    {/*
                    <LoadEmailHTML 
                      currentRow={currentRow}
                    />
                    */}
                    <PDFViewer 
                      currentRow={currentRow}
                    />
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
                    <JSONData 
                      currentRow={currentRow}
                    />
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

export default MainComponent;