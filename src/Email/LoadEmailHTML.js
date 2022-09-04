import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Grid } from "@mui/material";

import DataObjectIcon from '@mui/icons-material/DataObject';
import PropTypes from 'prop-types';
import './email.css';

const LoadEmailHTML = ({ currentRow }) => {
    const elRef = useRef();
    const [HTML, setHTML] = useState(null);


    useLayoutEffect(()=>{
        if (elRef.current){
          console.log(elRef.current.firstElementChild);
          //elRef.current.firstElementChild = '12px';
        }
      });

    useEffect(() => {
        checkFileExist(currentRow)
    }, [currentRow])

    const visualizeHTML = () => {
        return {
            __html: HTML
        }
    }

    console.log("currentHTML", HTML);

    const checkFileExist = async (id) => {
        const path = `./Emails/email_example_${id}.html`;
        try {
            // We get the HTML in text (String) format and set it to the state.
            const textHTML = await fetch(path)
                .then(resp => resp.text())
            console.log("this is the text", typeof textHTML);
            const parser = new DOMParser();
            const parsedHTML = parser.parseFromString(textHTML, 'text/html');
            console.log(parsedHTML);
            setHTML(textHTML);
        } catch (err) {
            console.error(err)
            setHTML(null);
        }
      };

    return (
        <Grid
            container
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            textAlign="left"
        >
            <Grid item>
                <Grid 
                    item
                    paddingBottom={2}
                >
                    <DataObjectIcon 
                        fontSize="large"
                    />
                    <b style={{color: "blue", paddingLeft: "2%"}}>
                        Email Viewer:
                    </b>
                    {<div
                        ref={elRef}
                        className="article"
                        dangerouslySetInnerHTML={visualizeHTML()}
                    />}
                </Grid>

            </Grid>
        </Grid>
    )
}

LoadEmailHTML.propTypes = {
    currentRow: PropTypes.number.isRequired,
};

export default LoadEmailHTML;
