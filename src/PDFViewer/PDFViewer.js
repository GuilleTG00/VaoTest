
import _ from 'lodash';

import React, { useEffect, useState, useRef } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Grid } from '@mui/material';

import PropTypes from 'prop-types';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CustomNavigation from './Navigation/CustomNavigation';
 
const VIEWER_MIN_SCALE = 1;
const VIEWER_MAX_SCALE = 2;

const PDFViewer = ({ currentRow, isInput }) => {
    const [PDF, setPDF] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [scale, setScale] = useState(VIEWER_MIN_SCALE);
    const [width, setWidth] = useState(0);

    const pdfMessage = () => {
        return isInput 
            ? "PDF Input Viewer:"
            : "PDF Output Viewer:";
    }

    const inputOutputFile = () => {
        return isInput
            ?   'input'
            :   'output';
    }

    // Reference to modify the PDF width Value to its container.
    const refPDFContainer = useRef(0)

    const onDocumentLoadSuccess = ({ numPages }) => setTotalPages(numPages);

    const checkFileExist = async (id) => {

        const inputOutputText = inputOutputFile();
        const path = `./PDFs/pdf_${inputOutputText}_${id}.pdf`;
        try {
            // Our response here is a BLOB, mainly for Binary Large Objects
            // Accepting media files, in this case, a PDF file.
            const parsedJSON = await fetch(path)
                .then(resp => resp.blob())
            setPDF(parsedJSON);
        } catch (err) {
         return null;
        }
      };
    
      //We use useEffect after DOM mutations
    useEffect(() =>{
        checkFileExist(currentRow);
    }, [currentRow]);

    useEffect(() => {
        const widthValue = refPDFContainer.current.offsetWidth;
        if (!_.isNil(widthValue)) {
            setWidth(widthValue);
        }
    }, [refPDFContainer.current.offsetWidth])
    
    return (
        <div>
            <Grid
                item
                className="pdfContainer"
                sm={12} md={12} xs={12}
            >
                <Grid 
                    item
                    paddingBottom={2}
                    textAlign="left"
                >
                    <PictureAsPdfIcon fontSize="large"/>
                    <b style={{
                        color: "blue", 
                        paddingLeft: "1%"
                       }}
                    >
                        {pdfMessage()}
                    </b>
                </Grid>
                <div 
                style={{
                    overflow: "auto"
                }}
                ref={refPDFContainer}>
                    <Document
                        className="canvasCss"
                        file={PDF}
                        loading="Loading PDF"
                        onLoadSuccess={onDocumentLoadSuccess}
                        renderMode="canvas"
                    >
                        <Page
                            className="pageContainer"
                            loading="Loading PDF"
                            pageNumber={currentPage}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                            scale={scale}
                            width={width}
                        />
                    </Document>
                </div>
            </Grid>
            {totalPages && (
                <Grid
                    item
                    className="containerNavbar"
                    sm={12} md={12} xs={12}
                >
                    <CustomNavigation
                        currentPage={currentPage}
                        maxScale={VIEWER_MAX_SCALE}
                        minScale={VIEWER_MIN_SCALE}
                        scale={scale}
                        setCurrentPage={setCurrentPage}
                        setScale={setScale}
                        totalPages={totalPages}
                    />
                </Grid>
            )}
        </div>
    );
}

PDFViewer.propTypes = {
    currentRow: PropTypes.number.isRequired,
};

export default PDFViewer;
