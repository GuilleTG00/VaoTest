import _ from 'lodash';

import React, { useEffect, useState, useRef } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Grid } from '@mui/material';

import samplePDF from './Example_1.pdf';
import CustomNavigation from './Navigation/CustomNavigation';
 

const VIEWER_MIN_SCALE = 1;
const VIEWER_MAX_SCALE = 5;
const TestCase = () => {
    const [PDF, setPDF] = useState(samplePDF);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [scale, setScale] = useState(VIEWER_MIN_SCALE);
    const [width, setWidth] = useState(0);

    // Reference to modify the PDF width Value to its container.
    const refPDFContainer = useRef(0)

    const onDocumentLoadSuccess = ({ numPages }) => setTotalPages(numPages);

    const checkFileExist = (id) => {
        const path = `./Example_${id}.pdf`;
        try {
        setPDF(require(`${path}`))
        } catch (err) {
         return null;
        }
      };
    
      //We use useEffect after DOM mutations
    useEffect(() =>{
        checkFileExist(1);
    }, []);

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
                <div ref={refPDFContainer}>
                    <Document
                        className="canvasCss"
                        file={PDF}
                        loading=""
                        onLoadSuccess={onDocumentLoadSuccess}
                        renderMode="canvas"
                    >
                        <Page
                            className="pageContainer"
                            loading=""
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

export default TestCase;
