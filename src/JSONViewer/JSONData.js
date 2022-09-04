import React, { useEffect, useState } from "react";
import { JsonToTable } from "react-json-to-table";
import { Grid } from "@mui/material";

import DataObjectIcon from '@mui/icons-material/DataObject';
import PropTypes from 'prop-types';
import ReactJson from '@textea/json-viewer'
import TableChartIcon from '@mui/icons-material/TableChart';

const JSONData = ({ currentRow }) => {
    const [JSON, setJSON] = useState({});

    useEffect(() => {
        checkFileExist(currentRow)
    }, [currentRow])

    const checkFileExist = async (id) => {
        const path = `./JSONs/example_${id}.json`;
        try {
            const parsedJSON = await fetch(path)
                .then(resp => resp.json())
            setJSON(parsedJSON);
        } catch (err) {
            console.error(err)
            setJSON({});
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
                        Tree Viewer for JSON:
                    </b>
                </Grid>
                <ReactJson 
                    src={JSON}
                    theme='ocean'
                    indentWidth={2}
                    sortKeys={true}
                    collapsed={2}
                />
            </Grid>
            <Grid item>
                <Grid 
                    item
                    paddingBottom={4}
                    paddingTop={4}
                    alignContent="center"
                >
                    <TableChartIcon 
                        fontSize="large"
                    />
                    <b style={{color: "blue", paddingLeft: "2%"}}>
                        Table viewer for JSON:
                    </b>
                </Grid>
                <JsonToTable json={JSON}/>
            </Grid>
        </Grid>
    )
}

JSONData.propTypes = {
    currentRow: PropTypes.number.isRequired,
};

export default JSONData;
