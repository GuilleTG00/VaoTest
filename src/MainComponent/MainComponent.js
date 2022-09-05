import './MainComponent.css'

import _ from 'lodash';

import React, { useState, useLayoutEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


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
  const [approved, setApproved] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const handleApprove = () => {
    setApproved(true);
  } 

  const handleSkipped = () => {
    setSkipped(true);
  } 

  const onCloseSkipped = () => {
    setSkipped(false);
  }

  const onCloseApproved = () => {
    setApproved(false);
  }


  const checkIfMaximumRows = () => {
    return (currentRow === excelInfo.length)
  }

  const checkIfMinimumRows = () => {
    return (currentRow === 1)
  }

  const increaseCurrentRow = () => {
    setCurrentRow(currentRow + 1);
  }

  const decreaseCurrentRow = () => {
    setCurrentRow(currentRow - 1);
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
          <AssignmentIcon sx={{ mr: 2 }} />
            <Grid item
              className="innerElementToolbar"
            >
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
                  Record {currentRow} of {excelInfo.length}:
                  {' '}
                  {excelInfo[currentRow - 1].c_ID} - {excelInfo[currentRow - 1].c_name} 
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
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="success"
                onClick={handleApprove}
              >
                Approve
              </Button>
              <Snackbar
                open={approved}
                autoHideDuration={5000}
                onClose={onCloseApproved}
                color="inherit"
                message="Record Approved"
              />
              <Button 
                variant="contained"
                color="warning"
                onClick={handleSkipped}
              >
                Skip
              </Button>
              <Snackbar
                open={skipped}
                onClose={onCloseSkipped}
                autoHideDuration={5000}
                color="blue"
                message="Record skipped"
              />
          </Stack>
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