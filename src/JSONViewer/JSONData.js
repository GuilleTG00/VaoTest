import _ from 'lodash';

import React, { useEffect, useState } from "react";

import { JsonToTable } from "react-json-to-table";
import { Grid } from "@mui/material";

import ReactJson from '@textea/json-viewer'
import DataObjectIcon from '@mui/icons-material/DataObject';
import TableChartIcon from '@mui/icons-material/TableChart';

const JSONData = () => {
    const [JSON, setJSON] = useState({});
    useEffect(() => {
        checkFileExist(2)
    }, [])

    const checkFileExist = (id) => {
        const path = `./example_${id}.json`;
        try {
            setJSON(require(`${path}`));
            return require(`${path}`);
        } catch (err) {
            console.error(err)
            return {};
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

export default JSONData;
