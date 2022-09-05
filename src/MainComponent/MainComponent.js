import './MainComponent.css'

import _ from 'lodash';

import React, { useState, useLayoutEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import JSONData from '../JSONViewer/JSONData';
import LoadEmailHTML from '../Email/LoadEmailHTML';
import loadFromExcel from '../Excel/loadFromExcel';
import PDFViewer from '../PDFViewer/PDFViewer';

const LinkedInURL = "https://www.linkedin.com/in/guillermo-toloza-guzman/"

const Copyright = () => {
  return (
    <Typography 
      variant="body2" 
      color="text.secondary" 
      align="center"
    >
      <Link 
        color="inherit" 
        href={LinkedInURL}
      >
        Guillermo Toloza Guzmán
      </Link>{' - '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const MainComponent = () => {
  const [excelInfo, setExcelInfo] = useState([]);
  const [currentRow, setCurrentRow] = useState(1);

  const checkIfMaximumRows = () => {
    return (currentRow === excelInfo.length)
  }

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
        <Toolbar className="toolbarStyle">
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
                <Typography 
                  variant="h6" 
                  color="inherit"
                >
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
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="black"
            >
              Main Mockup
            </Typography>
            <Typography 
              variant="h5" 
              align="center" 
              color="text.secondary" 
            >
              VAO.WORLD Assignment
            </Typography>
          </Container>
        </Box>
        { /* We define a maxWidth of XL size, so it can fit the entire screen. */}
        <Container maxWidth="90%">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
                <Card
                  className='cardStyle'
                >
                    <LoadEmailHTML 
                      currentRow={currentRow}
                    />
                    <PDFViewer 
                      currentRow={currentRow}
                      isInput
                    />
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card
                  className='cardStyle'
                >
                    <JSONData 
                      currentRow={currentRow}
                    />
                </Card>
            </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              className='cardStyle'
            >
              <PDFViewer 
                currentRow={currentRow}
                isInput={false}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* Footer */}
      <Box 
        sx={{ 
          padding: 6 
        }} 
        component="footer"
      >
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Test Assignment solution for VAO.WORLD by:
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default MainComponent;