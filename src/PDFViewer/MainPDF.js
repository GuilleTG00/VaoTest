

import _ from 'lodash';

import { Document, Page, pdfjs } from 'react-pdf';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import LinearProgress from '@mui/material/LinearProgress';
import WarningIcon from '@mui/icons-material/Warning';

import Card from '@mui/material/Card';

import { Button, CardContent, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const ModalAyudas = () => {

  const theme = createTheme();
  const VIEWER_MIN_SCALE = 1;

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  const [pdf, setPDF] = useState(null);
  const [scale, setScale] = useState(VIEWER_MIN_SCALE);
  const [totalPages, setTotalPages] = useState(null);

  const checkFileExist = (id) => {
    const path = `../public/PDFs/Example_${id}.pdf`;
    try {
     return require(`${path}`);
    } catch (err) {
     return null;
    }
  };

  console.log("validation", checkFileExist(1))

  useEffect(() => {
    setPDF(checkFileExist(1));
  }, [])

  /*
  const getHelpById = async () => {
    const { error, data } = await getAyudaById(sectionId);

    if (error) {
      setIsLoading(false);
      setLoadingError(error);
      return;
    }

    setIsLoading(false);
    setPDF({
      base64: data.content,
    });
  };

  */
  const onDocumentLoadSuccess = ({ numPages }) => setTotalPages(numPages);

/*
  useEffect(() => {
    getHelpById()
      .then()
      .catch();
  }, []);
*/
  return (
    <ThemeProvider theme={theme}>
    <div>
      <Dialog
        fullWidth
        //classes={{paper: classes.modal}}
        //onClose={onDismiss}
        open
        tabIndex="0"
      >
        <DialogTitle>
          <InfoIcon disabled color="primary" /> Información de Ayuda {/*seccion*/}
          <IconButton
            //className={classes.buttonInfo}
            color="inherit"
            //onClick={onDismiss}
          >
            <CloseIcon style={{ fontSize: '20px' }} />
          </IconButton>
        </DialogTitle>
        <DialogContent
          classes={{
            //root: classes.border,
          }}
        >
          <Grid
            alignItems="center"
            direction="row"
          >
            <Grid 
              sm={12} md={12} xs={12}>
              {
                pdf && (
                  <Document
                    //className={classes.canvasCss}
                    file={pdf}
                    loading=""
                    onLoadSuccess={onDocumentLoadSuccess}
                    renderMode="canvas"
                  >
                    <Page
                      //className={classes.pageContainer}
                      loading=""
                      pageNumber={currentPage}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      scale={scale}
                    />
                  </Document>
                )
              }
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          classes={{
            //root: classes.containerNavbar,
          }}
        >
          {/*
            totalPages && (
              <CustomNavigation
                currentPage={currentPage}
                maxScale={VIEWER_MAX_SCALE}
                minScale={VIEWER_MIN_SCALE}
                scale={scale}
                setCurrentPage={setCurrentPage}
                setScale={setScale}
                totalPages={totalPages}
              />
            )
            */}
          <Button
            color="danger"
            //onClick={onDismiss}
            size="sm"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div >
    </ThemeProvider>
  );
};

ModalAyudas.propTypes = {
  classes: PropTypes.shape().isRequired,
  onDismiss: PropTypes.func.isRequired,
  seccion: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
};

export default (ModalAyudas);
