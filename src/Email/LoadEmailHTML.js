import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import DataObjectIcon from '@mui/icons-material/DataObject';
import PropTypes from 'prop-types';
import './email.css';

const LoadEmailHTML = ({ currentRow }) => {
    const [HTML, setHTML] = useState(null);



    useEffect(() => {
        checkFileExist(currentRow)
    }, [currentRow])

    const visualizeHTML = () => {
        return {
            __html: HTML
        }
    }

    const checkFileExist = async (id) => {
        const path = `./Emails/email_example_${id}.html`;
        try {
            // We get the HTML in text (String) format and set it to the state.
            const textHTML = await fetch(path)
                .then(resp => resp.text())
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
            justifyContent="center"
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
                    <b style={{
                        color: "blue", 
                        paddingLeft: "1%"
                       }}
                    >
                        Email Viewer:
                    </b>
                    {<div
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
