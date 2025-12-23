import React, {useState} from "react"

import {Autocomplete, Chip, createFilterOptions, TextField} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";




export const AutoCompleteBox=({...props})=>{


    return(
        <Autocomplete
            {...props}
            popupIcon={<ExpandMoreIcon />}
            filterOptions={createFilterOptions(props.matchOption ? props.matchOption : {})}

        />
    );
}
